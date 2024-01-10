import React,{ useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box,Button, Image, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, List, ListItem, Icon, chakra } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Logo from '../../assets/logo.svg';
import { getAuth,signOut } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { auth, onAuthStateChanged, firestore } from '../../firebase/firebase';


const AuthNavbar = () => {
  const [user, setUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = getAuth();
  const navigate = useNavigate();
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
  const handleSignOut = async () => {
      try {
        await signOut(auth);
        navigate('/auth');
        // Redirect or perform additional actions after successful sign-out
      } catch (error) {
        console.error('Error signing out:', error.message);
      }
    };

  return (
    <Flex
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="#FFFFFF"
      color="#333333"
    >
      <Box>
        <Link to="/">
          <Image src={Logo} alt="Logo" height="24px" />
        </Link>
      </Box>
      <Box display={{ base: 'none', md: 'block' }}>
        <List display="flex" alignItems="center" listStyleType="none">
          <ListItem fontSize="20px" marginRight="65px" fontFamily="Karla">
            <chakra.div _hover={{ color: '#606060' }}>
              <Link to="/feed">Invest</Link>
            </chakra.div>
          </ListItem>
          <ListItem fontSize="20px" marginRight="65px" fontFamily="Karla">
            <chakra.div _hover={{ color: '#606060' }}>
              <Link to="/create-business-profile">Add Business </Link>
            </chakra.div>
          </ListItem>
          <ListItem fontSize="20px" marginRight="65px" fontFamily="Karla">
            <chakra.div _hover={{ color: '#606060' }}>
              <Link to="/investors">Newsroom</Link>
            </chakra.div>
          </ListItem>
          <ListItem fontSize="20px" marginRight="65px" fontFamily="Karla">
          <Button fontSize="18px"  onClick={handleSignOut} fontFamily="Karla">
          Logout
      </Button>
          </ListItem>
        </List>
      </Box>
      <Box display={{ base: 'block', md: 'none' }}>
        <IconButton
          icon={<HamburgerIcon />}
          variant="ghost"
          onClick={onOpen}
          aria-label="Open navigation menu"
        />
        <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <List>
                  <ListItem fontSize="20px" fontFamily="Karla">
                    <chakra.div _hover={{ color: 'blue.500' }}>
                      <Link to="/" onClick={onClose}>Investors</Link>
                    </chakra.div>
                  </ListItem>
                  <ListItem fontSize="20px" fontFamily="Karla">
                    <chakra.div _hover={{ color: 'blue.500' }}>
                      <Link to="/create-business-profile" onClick={onClose}>Create Business Profile</Link>
                    </chakra.div>
                  </ListItem>
                  <ListItem fontSize="20px" fontFamily="Karla">
                    <chakra.div _hover={{ color: 'blue.500' }}>
                      <Link to="/investors" onClick={onClose}>Newsroom</Link>
                    </chakra.div>
                  </ListItem>
                  <ListItem fontSize="20px" fontFamily="Karla">
                    <chakra.div _hover={{ color: 'gray.500' }}>
                    <Button fontSize="18px"  onClick={handleSignOut} fontFamily="Karla">
          Logout
      </Button>
                    </chakra.div>
                  </ListItem>
                </List>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </Flex>
  );
};

export default AuthNavbar;
