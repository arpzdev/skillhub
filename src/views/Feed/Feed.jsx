import React, { useEffect, useState } from 'react';
import { VStack, Heading, Text, Box, Flex } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import Navbar from '../../components/Navbar/Navbar';

const Feed = () => {
  const [businessProfiles, setBusinessProfiles] = useState([]);

  useEffect(() => {
    const fetchBusinessProfiles = async () => {
      try {
        const businessProfilesCollection = collection(firestore, 'businessProfiles');
        const businessProfilesQuery = query(
          businessProfilesCollection,
          orderBy('createdAt', 'desc')
        );
        const businessProfilesSnapshot = await getDocs(businessProfilesQuery);

        const profilesData = businessProfilesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBusinessProfiles(profilesData);
      } catch (error) {
        console.error('Error fetching business profiles:', error.message);
      }
    };

    fetchBusinessProfiles();
  }, []);

  return (
    <div>
      <Navbar/>
    <VStack align="center" mt="8">
      <Heading mb="4" fontFamily="Karla" fontSize="xl" fontWeight="bold" color="blue.500">
        Business Profiles Feed
      </Heading>
      <Box maxW="800px" w="100%">
        {businessProfiles.map((profile, index) => (
          // Check if it's the start of a new row (every 3rd profile)
          index % 3 === 0 ? (
            <Flex key={index} justifyContent="space-between" mb="4">
              {businessProfiles.slice(index, index + 3).map((rowProfile) => (
                <Box
                  key={rowProfile.id}
                  p="4"
                  borderWidth="1px"
                  borderRadius="md"
                  w="30%"
                  backgroundColor="gray.100"
                >
                  <Heading fontSize="lg" fontWeight="bold" mb="2" color="blue.600">
                    {rowProfile.businessName}
                  </Heading>
                  <Text fontFamily="Karla">{rowProfile.businessDescription}</Text>
                  <Text fontFamily="Karla" color="green.500">
                    Ebitda: {rowProfile.ebitda}
                  </Text>
               
                </Box>
              ))}
            </Flex>
          ) : null
        ))}
      </Box>
    </VStack>
    </div>
  );
};

export default Feed;
