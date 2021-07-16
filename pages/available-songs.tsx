import { Box, Heading } from '@chakra-ui/react';
import { FeaturedSongs } from '../components/FeaturedSongs';

function AvailableSongsIndex() {
  return (
    <Box py={10} px={6}>
      <Heading as="h1" mb="8">
        Available Songs
      </Heading>
      <FeaturedSongs showAllSongs />
    </Box>
  );
}

export default AvailableSongsIndex;
