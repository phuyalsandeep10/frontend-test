import { StaticImageData } from 'next/image';

export type CreditCardProps = {
  cardLabel: string;
  cardNumber: string;
  cardholderName: string;
  cardholderAddress: string;
  expiryDate: string;
};

export type CreditCardDetailsProps = {
  expiryYear: string;
  expiryDate: string;
  cardImage: StaticImageData;
  buttonText: string;
};
