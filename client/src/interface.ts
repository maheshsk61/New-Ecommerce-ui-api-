export interface Constants {
  shopBazaar: string;
  searchProductsHere: string;
  noProductsFound: string;
  cartEmpty: string;
  addToCart: string;
  removeFromCart: string;
  laptop: string;
  headphone: string;
  rupees: string;
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
}
export interface IHandleButtons {
  count: number;
  cartItems: any[];
  isDisabled: boolean;
}
export interface ILoading {
  loading: boolean;
}
