import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

interface BuySongModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionStarted: boolean;
}

export function BuySongModal({
  isOpen,
  onClose,
  transactionStarted,
}: BuySongModalProps): JSX.Element {
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <AlertDialogOverlay>
        <AlertDialogContent textAlign="center">
          <AlertDialogHeader mt="3" fontSize="lg" fontWeight="bold">
            {transactionStarted ? 'Your transaction has started' : 'Completing the trade...'}
          </AlertDialogHeader>
          <AlertDialogBody>
            {transactionStarted ? (
              <>
                <Spinner color="blue.500" size="lg" />{' '}
                <Text my="6" lineHeight="7">
                  The Ethereum network is processing your transaction, which can take a little
                  while.
                </Text>
              </>
            ) : (
              <Text mb="4">Please confirm the transaction from your Wallet.</Text>
            )}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
