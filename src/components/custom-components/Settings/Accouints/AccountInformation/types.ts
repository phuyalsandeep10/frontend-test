export interface ProfileSectionProps {
  name: string;
  email: string;
  location: string;
  phone: string;
  countryCode: string;
  profileImage: string;
}

export type FormValues = {
  fullName: string;
  email: string;
  address: string;
  country: string;
  language: string;
};
