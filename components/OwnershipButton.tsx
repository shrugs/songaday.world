import { Avatar, Button, Skeleton } from '@chakra-ui/react';

export function OwnershipButton({ ownership }: { ownership: any }) {
  return (
    <Button
      as="a"
      size="xs"
      href={`https://opensea.io/accounts/${ownership?.owner.id.split('@')[0]}`}
      target="_blank"
      rel="noopener noreferrer"
      leftIcon={<Avatar size="2xs" name={ownership?.owner.handle} src={ownership?.owner.image} />}
      zIndex="1"
      isDisabled={!ownership}
    >
      {!ownership ? <Skeleton h="4" w="24" /> : ownership.owner.handle ?? 'Unnamed'}
    </Button>
  );
}
