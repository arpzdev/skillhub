import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Textarea,
} from '@chakra-ui/react';
import { addBusinessProfile } from '../../redux/businessProfilesSlice';
import { collection, addDoc } from 'firebase/firestore';
import { firestore, auth } from '../../firebase/firebase';
import AuthNavbar from '../../components/Navbar/AuthNavbar';

const CreateBusinessProfile = () => {
  const [businessName, setBusinessName] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [ebitda, setEbitda] = useState('');

  const handleCreateProfile = async () => {
    try {
      const userId = auth.currentUser.uid;

      // Dispatch an action to add the business profile to Redux store


      // Add the form values to the Firestore collection with user ID
      const businessProfilesCollection = collection(firestore, 'businessProfiles');
      await addDoc(businessProfilesCollection, {
        userId,
        businessName,
        businessDescription,
        ebitda,
        createdAt: new Date(),
      });

      // Redirect to the feed page after successful profile creation
      // Example: history.push('/feed');
    } catch (error) {
      console.error('Error adding business profile to Firestore:', error.message);
      // Handle error, show a message, or perform other actions as needed
    }
  };

  return (
    <div>
      <AuthNavbar />
      <VStack align="center" mt="8">
        <Heading fontFamily="Karla" mb="4">Create Business Profile</Heading>
        <Box maxW="500px" w="100%" p="4" borderWidth="1px" borderRadius="lg">
          <FormControl mb="4">
            <FormLabel fontFamily="Karla">Business Name</FormLabel>
            <Input
              fontFamily="Karla"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontFamily="Karla">Business Description</FormLabel>
            <Textarea
            fontFamily="Karla"
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
            />
          </FormControl>
          <FormControl mb="4">
            <FormLabel fontFamily="Karla">EBITDA</FormLabel>
            <Input
            fontFamily="Karla"
              type="text"
              value={ebitda}
              onChange={(e) => setEbitda(e.target.value)}
            />
          </FormControl>
          
          
          <Button colorScheme="blue" onClick={handleCreateProfile}>
            Create Profile
          </Button>
        </Box>
      </VStack>
    </div>
  );
};

export default CreateBusinessProfile;
