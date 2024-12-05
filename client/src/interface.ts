export interface Constants {
  shopBazaar?: string;
  searchProductsHere?: string;
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