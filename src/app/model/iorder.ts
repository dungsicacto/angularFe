export interface Iorder {
  _id: string;
  name: string;
  email: string;
  address: string;
  status: number;
  CTHD: { _id: string; name: string; price: number; quantity: number }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  statusText?: string;
  totalPrice?: number;
}
