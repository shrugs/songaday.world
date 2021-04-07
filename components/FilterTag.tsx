import { Img } from '@chakra-ui/image';
import { AspectRatio, BoxProps, Text, VStack } from '@chakra-ui/layout';
import React, { PropsWithChildren } from 'react';

const uriFromKey = (prefix: string, key: string) =>
  `/thumbnails/${prefix}_${key.toLowerCase()}_cutdown.svg`;

export default function FilterTag({
  prefix,
  thumbKey,
  selected = false,
  children,
  ...delegated
}: BoxProps &
  PropsWithChildren<{
    prefix: string;
    thumbKey: string;
    selected?: boolean;
  }>) {
  const tile = React.Children.count(children) === 0;

  return (
    <VStack
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
        <Img h="full" w="full" src={uriFromKey(prefix, thumbKey)} />
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

  // return (
  //   <div
  //     onClick={onClick}
  //     className={cx(className, 'flex flex-col cursor-pointer', smol ? 'w-10' : 'w-24')}
  //   >
  //     <div
  //       className={cx(
  //         'relative rounded-lg hover:shadow overflow-hidden bg-white',
  //         smol ? 'w-10 h-10' : 'w-24 h-24',
  //         {
  //           'border-4 border-selectpurple': selected,
  //           'mb-1': hasChildren,
  //           'p-2': !shouldCover,
  //         },
  //       )}
  //     >
  //       <div
  //         className={cx('w-full h-full bg-no-repeat bg-center thumb', {
  //           'bg-contain': !shouldCover,
  //           'bg-cover': shouldCover,
  //         })}
  //       ></div>
  //       {selected && (
  //         <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
  //           <img className="w-1/2" src="/assets/check.svg"></img>
  //         </div>
  //       )}
  //     </div>
  //     {hasChildren && <p className="'text'-xs font-semibold truncate">{children}</p>}

  //     <style jsx>{`
  //       .thumb {
  //         background-image: url(${uriFromKey(prefix, thumbKey)});
  //       }
  //     `}</style>
  //   </div>
  // );
}
