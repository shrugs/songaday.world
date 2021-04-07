import { Box, BoxProps } from '@chakra-ui/react';

export default function TextTag(delegated: BoxProps) {
  return (
    <Box
      {...delegated}
      py="1"
      px="3"
      bg="gray.200"
      textAlign="center"
      color="gray.800"
      borderRadius="sm"
      fontSize="xs"
      fontWeight="semibold"
      isTruncated
    />
  );
}
