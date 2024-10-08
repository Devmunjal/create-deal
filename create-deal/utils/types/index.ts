export interface AppContextType {
  title: string;
  setTitle: (newState: string) => void;
  customers: Customer[];
  setCustomers: (newState: Customer[]) => void;
  deals: Deal[];
  setDeals: (newState: Deal[]) => void;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: string;
  status: string;
  customer: Customer;
  street: string;
  city: string;
  state: string;
  zip: string;
  images: string[];
  roomAreaInMeters: number;
  peopleRequired: number;
  customerId: string;
  createdAt: string;
  updatedAt: string;
}
