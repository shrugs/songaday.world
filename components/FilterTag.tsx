import { Img } from '@chakra-ui/image';
import { AspectRatio, BoxProps, Text, VStack } from '@chakra-ui/layout';
import { forwardRef } from '@chakra-ui/system';
import React, { PropsWithChildren } from 'react';

import {
  Instrument,
  MISSING_INSTRUMENTS_FOR_YEAR,
  MISSING_MOODS_FOR_YEAR,
  MISSING_TOPICS_FOR_YEAR,
  Mood,
  Topic,
  Year,
} from '../lib/utils/constants';

const uriFromKey = (year: Year, prefix: string, key: string) => {
  if (prefix === 'topic' && key === Topic.Poetic) key = 'poetic1';
  if (prefix === 'topic' && MISSING_TOPICS_FOR_YEAR[year]?.includes(key as Topic))
    return `/assets/missing_thumbnail.png`;
  if (prefix === 'instrument' && MISSING_INSTRUMENTS_FOR_YEAR[year]?.includes(key as Instrument))
    return `/assets/missing_thumbnail.png`;
  if (prefix === 'mood' && MISSING_MOODS_FOR_YEAR[year]?.includes(key as Mood))
    return `/assets/missing_thumbnail.png`;

  return `/thumbnails/${year ?? 'all'}/${prefix}_${key.toLowerCase()}.png`;
};

export const FilterTag = forwardRef<
  BoxProps &
    PropsWithChildren<{
      year?: Year;
      prefix: string;
      thumbKey: string;
      selected?: boolean;
    }>,
  'div'
>(function FilterTag({ year, prefix, thumbKey, selected = false, children, ...delegated }, ref) {
  const tile = React.Children.count(children) === 0;
  const cover = prefix === 'location';

  return (
    <VStack
      ref={ref}
      {...delegated}
      align="stretch"
      spacing="2"
      bg="gray.200"
      borderColor="black"
      borderWidth={selected && '1px'}
      borderRadius={tile ? 'sm' : 'md'}
      overflow="hidden"
      p={tile ? 0 : 2}
      _hover={{ shadow: tile ? 'sm' : 'md' }}
      transition="all 100ms linear"
    >
      <AspectRatio w="full" ratio={1} position="relative">
        <Img p={cover ? undefined : 1} h="full" w="full" src={uriFromKey(year, prefix, thumbKey)} />
      </AspectRatio>

      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize="xs"
        textTransform="uppercase"
        color="gray.800"
        isTruncated
      >
        {children}
      </Text>
    </VStack>
  );
});
