export interface Constants {
  shopBazaar: string;
  searchProductsHere: string;
  noProductsFound: string;
  cartEmpty: string;
  customerDetails: string;
  addToCart: string;
  deliveryAddress: string;
  buyNow: string;
  removeFromCart: string;
  laptop: string;
  headphone: string;
  rupees: string;
  totalPrice: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  mobileNumber: string;
  male: string;
  female: string;
  other: string;
  register: string;
  password: string;
  clickToLogin: string;
  clickToRegister: string;
  login: string;
  logout: string;
  address: string;
}
export interface IProduct {
  id?: number;
  name?: string;
  category?: string;
  imageUrl?: string;
}
export interface IProductList {
  list: IProduct[];
  length: number;
}
export interface ISearchQuery {
  query?: string;
}
export interface IProductsData {
  id?: number;
  img?: string;
  name?: string;
  price?: number;
  details?: any;
}
export interface IProducts {
  products?: IProductsData[];
  loading?: boolean;
  clickedProduct?: IProductsData[];
  cartProducts?: any[];
}
export interface IButtons {
  value: string;
  onClick: () => void;
  backgroundColor?: string;
  sx?: object;
  isDisabled?: boolean;
  type?: "button" | "submit";
}
export interface IHandleButtons {
  count: number;
  cartItems: any[];
  isDisabled: boolean;
}
export interface ILoading {
  loading: boolean;
}
export interface IDialogbox {
  isOpen: boolean;
  isClose: () => void;
  image?: string;
}
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  countryCode: string;
  mobileNumber: string;
  address: string;
  password: string;
  error: string | null;
  success: string | null;
  user: {
    firstName: string;
    lastName: string;
    address: string;
    mobileNumber: string;
    countryCode: string;
    email: string;
  };
}
