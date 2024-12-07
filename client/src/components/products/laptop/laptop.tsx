import { useEffect } from "react";
import { productType } from "../../../api";
import { constant } from "../../../constant";
import { setProducts } from "../../../Redux/slices/products";
import { setLoading } from "../../../Redux/slices/loading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/store";
import ProductView from "../../reuse-components/product-view";
import { ILoading, IProducts } from "../../../interface";

const Laptop: React.FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const productName: string = constant.laptop || "";
  //console.log(productName)
  const products: IProducts = useSelector((state: RootState) => state.products);
  //console.log(products);
  const loading: ILoading = useSelector((state: RootState) => state.loading);
  //console.log(`loading ${JSON.stringify(loading)}`);

  useEffect(() => {
    const getProductType = async () => {
      try {
        const response = await productType(productName);
        setTimeout(() => {
          dispatch(setLoading(true));
          dispatch(setProducts(response));
          dispatch(setLoading(false));
        }, 1000);
        return response.data;
      } catch (error) {
        return Promise.reject(error);
      } finally {
        dispatch(setLoading(true));
      }
    };
    getProductType();
  }, [dispatch]);

  return <ProductView products={products.products} loading={loading.loading} />;
};
export default Laptop;
