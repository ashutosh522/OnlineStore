import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartContext } from "../context";


function Details() {
    const params = useParams();
    const { id } = useParams(); //Destructured the value of params to get the value of id.
    const { productsDetails, setProductsDetails, handleAddToCartBtn } = useContext(ShoppingCartContext)
    //console.log(params);





    async function fetchProductDetails() {
        const apiResponse = await fetch(`https://dummyjson.com/products/${id}`)
        const result = await apiResponse.json()
        console.log(result)
        setProductsDetails(result)


    }

    useEffect(() => {
        fetchProductDetails()
    }, [id])
    return (
        <>
            {productsDetails ?
                <div className="container py-5">
                    <div className="row">
                        {/* <Product Images */}
                        <div className="col-md-6 mb-4">
                            <div className="card">
                                {!productsDetails?.images ? <p>Loading Images...</p> : null}

                                <img src={productsDetails.images[0]} className="card-img-top" alt="Product Image" />
                                <div className="card-body">
                                    <div className="d-flex justify-content-center">
                                        {/* Map through the images and display them horizontally */}
                                        {productsDetails?.images?.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                className="img-thumbnail mx-2" // Adds space between images
                                                alt={`Thumbnail ${index + 1}`}
                                                style={{ maxWidth: '80px', cursor: 'pointer' }} // Optional: Resize and add hover effect
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}

                        <div className="col-md-6">
                            <h1 className="h2 mb-3">{productsDetails.title}</h1>
                            <div className="mb-3">
                                <span className="h4 me-2">{productsDetails.price}</span>
                                <span className="text-muted text-decoration-line-through">${(productsDetails.price + (productsDetails.discountPercentage * productsDetails.price / 100)).toFixed(2)}
                                </span>
                                <span className="badge bg-danger ms-2">{productsDetails.discountPercentage}% OFF</span>
                            </div>

                            <div className="mb-3">
                                <div className="d-flex align-items-center">
                                    <div className="text-warning me-2">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                    </div>
                                    <span className="text-muted">
                                    {/* Rating: {(productsDetails.rating).toFixed(1)}⭐ */}
                                        ({productsDetails?.reviews?.length} reviews)</span>
                                </div>
                            </div>

                            <p className="mb-4">{productsDetails.description}</p>

                    

                            {/* Actions */}
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary" type="button" onClick={()=> handleAddToCartBtn(productsDetails)}>Add to Cart</button>
                                <button className="btn btn-outline-secondary" type="button" onClick={()=> alert(`${productsDetails.title} has been added to your wishlist!`)}>
                                    <i className="far fa-heart me-2"></i>Add to Wishlist
                                </button>
                            </div>

                            {/* Additional Info  */}
                            <div className="mt-4">
                                <div className="d-flex align-items-center mb-2">
                                    <i className="fas fa-truck text-primary me-2"></i>
                                    <span>{productsDetails.shippingInformation}</span>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <i className="fas fa-undo text-primary me-2"></i>
                                    <span>{productsDetails.returnPolicy}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="fas fa-shield-alt text-primary me-2"></i>
                                    <span>{productsDetails.warrantyInformation}</span>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                : null}
        </>
    )
}
export default Details;