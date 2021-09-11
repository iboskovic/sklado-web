import { useHistory } from "react-router";
import IProduct from "../../types/IProduct";

interface IProps {
    products: IProduct;
    onDelete: (productId: number) => void;
}

const TableData: React.FC<IProps> = (props) => {

    let history = useHistory();

    const editProduct = (id: number) => {
        history.push("/products/edit-product/" + id)
    }

    return (
        <>
            <tr className="table__row table__row--body" key={props.products.id}>
                <th className="table__row__data nunito--light">{props.products.barcode}</th>
                <th className="table__row__data nunito--light">{props.products.name}</th>
                <th className="table__row__data nunito--regular">{props.products.quantity}</th>
                <th className="table__row__data nunito--regular">{props.products.details}</th>
                <th><i className="icon icon--edit cur--pointer" onClick={() => editProduct(Number(props.products.id))}></i></th>
                <th><i className="icon icon--trash cur--pointer" onClick={() => props.onDelete(Number(props.products.id))}></i></th>
            </tr>
        </>
    )
}

export default TableData;