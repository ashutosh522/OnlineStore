import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../context";
function SingleProductItem({ item }) {
  const navigate = useNavigate()
  const { productsDetails, setProductsDetails, handleAddToCartBtn } = useContext(ShoppingCartContext)
  function handleDetailsBtn(getCurrentID) {

    navigate(`/details/${getCurrentID}`)

  }


  return (

    <>
      <div className="col">
        <div className="card h-100">
          <img src={item.thumbnail} className="card-img-top" alt="Product 1" />
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <div className="fw-bold">Price: ${item.price}</div>

            <div className="d-grid gap-2 col-6 mx-auto"><p><a className="link-opacity-100" style={{ cursor: 'pointer' }} onClick={() => handleDetailsBtn(item.id)}>Show Details</a></p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
export default SingleProductItem;
