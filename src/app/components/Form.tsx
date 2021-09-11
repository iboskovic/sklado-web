import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import ProductService from "../../services/ProductService";
import IParams from "../../types/IParams";
import IProduct from "../../types/IProduct";

interface IProps {
    onClick: (data: IProduct) => void;
}

const Form: React.FC<IProps> = (props) => {

    const { productId } = useParams<IParams>();
    let history = useHistory();

    const [barcode, setBarcode] = useState<number>();
    const [name, setName] = useState<string>();
    const [details, setDetails] = useState<string>();
    const [quantity, setQuantity] = useState<number>();
    const [products, setProducts] = useState<IProduct[]>([]);

    const productService = new ProductService();

    const getProductById = async () => {
        const res = await productService.getProductById(Number(productId))
        setBarcode(res.data.barcode);
        setName(res.data.name);
        setDetails(res.data.details);
        setQuantity(res.data.quantity);
    }

    const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBarcode(e.target.value ? Number(e.target.value) : undefined);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDetails(e.target.value);
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(e.target.value ? Number(e.target.value) : undefined);
    }

    const getProducts = async () => {
        const getProducts = await productService.getProduct();
    }

    const deleteProduct = async (productId: number) => {
        const res = productService.deleteProduct(productId);
        if (res !== null) {
            setProducts(products.filter(product => product.id !== productId))
            getProducts();
            history.goBack();
            toast.success("Product deleted", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true
            })
        }
    }

    useEffect(() => {
        if (productId) {
            getProductById();
        }
    }, []);
    return (
        <div className="form">
            <div className="form__title m--bot-40 nunito--semi-bold">Add new product</div>

            <div className="field">
                <div className="field__label--barcode m--bot-8 nunito--semi-bold">Barcode</div>
                <input disabled={productId ? true : false} type="number" placeholder="Barcode" className={`input input--secondary input--md m--bot-16 ${productId ? 'cur--blocked' : ''} `} onChange={handleBarcodeChange} value={barcode} />
            </div>

            <div className="field">
                <div className="field__label--name m--bot-8 nunito--semi-bold">Name</div>
                <input disabled={productId ? true : false} type="text" placeholder="Name" className={`input input--secondary input--md m--bot-16 ${productId ? 'cur--blocked' : ''} `} onChange={handleNameChange} value={name} />
            </div>

            <div className="field">
                <div className="field__label--details m--bot-8 nunito--semi-bold">Details</div>
                <input disabled={productId ? true : false} type="text" placeholder="Details" className={`input input--secondary input--md m--bot-16 ${productId ? 'cur--blocked' : ''} `} onChange={handleDetailsChange} value={details} />
            </div>

            <div className="field">
                <div className="field__label--qtty m--bot-8 nunito--semi-bold">Quantity</div>
                <input type="number" placeholder="0" className="input input--secondary input--sm input--md m--bot-80" onChange={handleQuantityChange} value={quantity} />
            </div>

            <button className="btn btn--quart btn--base btn--xl nunito--semi-bold cur--pointer" onClick={() => props.onClick({ barcode: Number(barcode), name: String(name), details: String(details), quantity: Number(quantity) })}>
                {productId
                    ? 'EDIT QUANTITY'
                    : 'ADD PRODUCT'
                }
            </button>
            {productId ? (
                <button className="btn btn--secondary btn--base btn--xl nunito--semi-bold nunito--semi-bold m--top-16 cur--pointer" onClick={() => deleteProduct(Number(productId))}>DELETE PRODUCT</button>
            ) : <></>}
        </div>
    )
}

export default Form;