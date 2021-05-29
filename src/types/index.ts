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
  category?: ItemList[];
};
