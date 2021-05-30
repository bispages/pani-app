import { Image } from 'react-native-image-crop-picker';

export type Settings = {
  dark: boolean;
};

export type ItemList = {
  id: string;
  name: string;
  selected?: boolean;
};

export type User = {
  phone: string;
  name?: string;
  pincode?: string;
  userType?: string;
  image?: Image | null;
  category?: ItemList[];
};
