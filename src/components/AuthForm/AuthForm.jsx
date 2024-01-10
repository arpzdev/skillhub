import React, { useState,useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack,HStack, InputGroup, InputRightElement, Alert, AlertIcon } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import GoogleIcon from '../../assets/GoogleIcon.svg';
import { auth, onAuthStateChanged,createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword,signInWithPopup } from '../../firebase/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [user, setUser] = useState(null);



  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      // Check if the user is not authenticated and redirect to the login page
      if (user) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [navigate]);
  const toggleMode = () => {
    setIsRegisterMode((prevMode) => !prevMode);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
  };

  const handleAuthAction = async () => {
    try {
      if (isRegisterMode) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Add user information to Firestore using addDoc
        const usersCollectionRef = collection(firestore, 'users');
        await addDoc(usersCollectionRef, {
          firstName,
          lastName,
          email,
          // Add more user details if needed
        });

        // Alert when user is registered successfully
        showAlert('User registered successfully!', 'success');
        location.reload()
      } else {
        // Handle sign-in logic if needed
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const usersCollectionRef = collection(firestore, 'users');
        const userQuery = query(usersCollectionRef, where('email', '==', user.email));
        const userQuerySnapshot = await getDocs(userQuery);
        showAlert(`Welcome back, ${user.displayName}!`, 'success');
        if (userQuerySnapshot.docs.length > 0) {
          
          // Assuming there is only one user with the provided email
          const userData = userQuerySnapshot.docs[0].data();
          
          // You can now navigate to the dashboard with the user data
          navigate('/dashboard', { state: { user: userData } });
        } else {
          console.log('No user found with the given email');
        }
      }
    } catch (error) {
      alert(error)
      console.error('Error during authentication:', error.message);
      // Display a more user-friendly error message to the user
      showAlert('Error during authentication. Please check your email address and password.', 'error');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user already exists in Firestore
      const usersCollectionRef = collection(firestore, 'users');
      const userQuery = await getDocs(query(usersCollectionRef, where('email', '==', user.email)));

      if (userQuery.docs.length === 0) {
        // If the user doesn't exist, add them to Firestore
        await addDoc(usersCollectionRef, {
          firstName: user.displayName.split(' ')[0],
          lastName: user.displayName.split(' ')[1] || '',
          email: user.email,
        });
      }

      // Alert when user signs in with Google successfully
      showAlert('Signed in with Google successfully!', 'success');
    } catch (error) {
      console.error('Error during Google Sign-In:', error.message);
      // Display a more user-friendly error message to the user
      showAlert('Error during Google Sign-In. Please try again.', 'error');
    }
  };

  return (
    <VStack spacing={4} align="stretch" w="500px" mx="auto">
      <Box p={8} borderWidth={1} borderRadius={7} boxShadow="lg" w="100%" fontFamily="Karla">
        <VStack spacing={3} align="stretch">
          {alertMessage && (
            <Alert status={alertType} variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="100px">
              <AlertIcon boxSize="40px" mr={0} />
              {alertMessage}
            </Alert>
          )}

          {isRegisterMode && (
            <>
              <HStack>
                <FormControl id="firstName">
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    placeholder=" Enter your first name "
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>

                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </HStack>
            </>
          )}

          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <HStack>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" backgroundColor="#FFFFFF" onClick={togglePasswordVisibility}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {isRegisterMode && (
              <FormControl id="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormControl>
            )}
          </HStack>

          <Button
            backgroundColor="#1C50C8"
            color="#FFFFFF"
            size="lg"
            onClick={handleAuthAction}
            fontFamily="Karla"
          >
            {isRegisterMode ? 'Sign Up' : 'Sign In'}
          </Button>

          <Button variant="link" onClick={toggleMode} mt="2" fontFamily="Karla">
            {isRegisterMode ? 'Already Signed Up? Login' : 'Not Registered Yet? Sign Up Now'}
          </Button>

          <Button
            background="#FFFFF"
            color="#1A1110"
            size="lg"
            border="1px solid lightgray"
            fontWeight="regular"
            leftIcon={<img src={GoogleIcon} alt="Google Icon" style={{ height: '20px' }} />}
            onClick={handleGoogleSignIn}
            fontFamily="Karla"
          >
            Continue with Google
          </Button>
        </VStack>
      </Box>
    </VStack>
  );
};

export default AuthForm;
