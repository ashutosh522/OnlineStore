import { useContext } from "react";
import { ShoppingCartContext } from "../context";
import SingleProductItem from "./singleProduct";

function ProductListPage() {
  const getContextValue = useContext(ShoppingCartContext)
  const { listOfProducts, loading } = useContext(ShoppingCartContext)
  //Destructed the values of getContextValue to get the listOfProducts
  //console.log(getContextValue);
  //console.log(listOfProducts);



  return (
    <>
      <div className="container py-5">
      {loading ?
       <h3 className="text-center">Loading your data...<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> </h3> 
    //      <button type="button" class="btn btn-success m-2" disabled>
    //      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...
    //  </button>
      : <div>
        <h1 className="text-center mb-5">Our Latest Products</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 text-center">
          {listOfProducts.map(item => <SingleProductItem item={item} key={item.id}></SingleProductItem>
          )}
        </div>
</div>}
      </div>
      
    </>
  )
}
export default ProductListPage;