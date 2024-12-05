export interface Constants {
  shopBazaar?: string;
  searchProductsHere?: string;
  noProductsFound?: string
}
export interface IProduct {
    id?:number,
    name?:string,
    category?:string,
    imageUrl?:string
}
export interface IProductList {
    list?:IProduct[],
    length?:number
}
export interface ISearchQuery {
    query?:string;
}