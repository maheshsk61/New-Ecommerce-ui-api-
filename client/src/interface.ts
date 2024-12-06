export interface Constants {
  shopBazaar: string;
  searchProductsHere: string;
  noProductsFound: string;
  addToCart:string;
  laptop: string;
  headphone: string;
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
  loading: boolean;
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
  loading?:boolean;
}
export interface IButtons {
  value:string;
}
