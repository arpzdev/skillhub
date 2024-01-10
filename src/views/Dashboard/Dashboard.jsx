import React, { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, firestore } from '../../firebase/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthNavbar from '../../components/Navbar/AuthNavbar';
import { Flex, Box, Heading, Text, Avatar, VStack } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      // Check if the user is not authenticated and redirect to the login page
      if (!user) {
        navigate('/auth');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    // Check if there is user data passed from AuthForm
    if (location.state && location.state.user) {
      setUserData(location.state.user);
    } else {
      // Fetch user data from Firestore using the same logic you had before
      const fetchUserData = async () => {
        if (user) {
          try {
            const userDocRef = doc(firestore, 'users', user.uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
              setUserData(userDocSnapshot.data());
            } else {
              console.log('No such document!');
            }
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        }
      };

      fetchUserData();
    }
  }, [user, firestore, location.state]);

  // Render the dashboard content for authenticated users
  return (
    <Flex>
      {/* Sidebar */}
      <Box w="250px" p="4" bg="gray.800" color="white" minH="100vh" boxShadow="2xl">
        <Avatar name={userData ? `${userData.firstName} ${userData.lastName}` : ''} />
        <VStack align="start" mt="4" spacing="2">
          <Text fontSize="lg">
            {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}
          </Text>
          <Text>{user ? user.email : ''}</Text>
        </VStack>
      </Box>

      {/* Main Content */}
      <Flex direction="column" w="100%" p="4">
        <AuthNavbar />
        {/* Your main dashboard content here */}
        <Heading mb="4">Welcome to the Dashboard!</Heading>
        {/* Add your additional content here */}
      </Flex>
    </Flex>
  );
};

export default Dashboard;
