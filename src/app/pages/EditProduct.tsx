import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import ProductService from "../../services/ProductService";
import IParams from "../../types/IParams";
import IProduct from "../../types/IProduct";
import Form from "../components/Form";
import Nav from "../components/Nav";

const EditProduct = () => {

    let history = useHistory();

    const productService = new ProductService();
    const { productId } = useParams<IParams>();

    const getProducts = async () => {
        const getProducts = await productService.getProduct();
    }

    const editProduct = async (data: IProduct) => {
        try {
            const res = await productService.updateProduct(data, Number(productId));
            history.goBack()
            getProducts();
            toast.success("Quantity edited", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true
            });
        } catch (error) {
            toast.error("Error", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true
            });
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div className="l">
            <Nav />
            <div className="l__content l__content--form">
                <div className="title--secondary montserrat--semi-bold m--bot-40">Edit Quantity</div>
                <div className="title--goback m--bot-46 nunito--semi-bold"><i className="icon icon--arr-left m--bot-4 m--right-16 cur--pointer" onClick={() => history.goBack()}></i> Back</div>
                <Form onClick={editProduct} />
            </div>
        </div>
    )
}

export default EditProduct;