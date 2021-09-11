import { useHistory } from "react-router";
import ProductService from "../../services/ProductService";
import IProduct from "../../types/IProduct";
import Form from "../components/Form";
import Nav from "../components/Nav";
import { toast } from "react-toastify";

const AddProduct = () => {

    const productService = new ProductService();
    const postProduct = async (data: IProduct) => {
        try {
            const res = await productService.postProduct(data);
            history.push("/products/")
            toast.success("Product added", {
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

    const history = useHistory();
    return (
        <div className="l">
            <Nav />
            <div className="l__content l__content--form">
                <div className="title--secondary montserrat--semi-bold m--bot-40">Add Product</div>
                <div className="title--goback m--bot-46 nunito--semi-bold"><i className="icon icon--arr-left m--bot-4 m--right-16 cur--pointer" onClick={() => history.goBack()}></i> Back</div>
                <Form onClick={postProduct} />
            </div>
        </div>
    )
}

export default AddProduct;