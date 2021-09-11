import { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import ProductService from "../../services/ProductService";
import IProduct from "../../types/IProduct";
import Nav from "../components/Nav";
import TableData from "../components/TableData";
import _, { filter } from "lodash";

enum SortDirection {
    None = "",
    Asc = "asc",
    Desc = "desc"
}

const Products = () => {

    const [products, setProducts] = useState<IProduct[]>([]);
    const [active, setActive] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>('');
    const [sortByBarcode, setSortByBarcode] = useState<SortDirection>(SortDirection.None);
    const [sortByName, setSortByName] = useState<SortDirection>(SortDirection.None);
    const [sortByDetails, setSortByDetails] = useState<SortDirection>(SortDirection.None);
    const [sortByQuantity, setSortByQuantity] = useState<SortDirection>(SortDirection.None);

    const productService = new ProductService();
    const history = useHistory();

    const getProducts = async () => {
        const res = await productService.getProduct();
        setProducts(res);
    }

    const handleNext = () => {
        history.push("/products/add-product")
    }

    const deleteProduct = async (productId: number) => {
        const res = productService.deleteProduct(productId);
        if (res !== null) {
            setProducts(products.filter(x => x.id !== productId))
            toast.success("Product deleted", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true
            })
        } else {
            toast.error("Error", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true
            })
        }
    }

    //sorting

    // by barcode
    useEffect(() => {
        let currentData: IProduct[] = _.cloneDeep(products);
        let sortedByBarcode = currentData.sort((a, b) => a.barcode - b.barcode);

        if (sortByBarcode === SortDirection.Desc) {
            sortedByBarcode.reverse();
        }

        setProducts(sortedByBarcode);
    }, [sortByBarcode]);

    // by name
    useEffect(() => {
        let currentData: IProduct[] = _.cloneDeep(products);
        let sortedByName = currentData.sort((a: any, b: any) => a.name.localeCompare(b.name));

        if (sortByName === SortDirection.Desc) {
            sortedByName.reverse();
        }

        setProducts(sortedByName);
    }, [sortByName]);

    // by details
    useEffect(() => {
        let currentData: IProduct[] = _.cloneDeep(products);
        let sortedByDetails = currentData.sort((a: any, b: any) => a.details.localeCompare(b.details));

        if (sortByDetails === SortDirection.Desc) {
            sortedByDetails.reverse();
        }

        setProducts(sortedByDetails);
    }, [sortByDetails]);

    // by details
    useEffect(() => {
        let currentData: IProduct[] = _.cloneDeep(products);
        let sortedByQuantity = currentData.sort((a, b) => a.quantity - b.quantity);

        if (sortByQuantity === SortDirection.Desc) {
            sortedByQuantity.reverse();
        }
        setProducts(sortedByQuantity);

    }, [sortByQuantity]);


    // toggling sorting
    const toggleSortBarcode = () => {
        const val = sortByBarcode === SortDirection.None || sortByBarcode === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc;
        setSortByBarcode(val);
        setSortBy('barcode');
    }

    const toggleSortName = () => {
        const val = sortByName === SortDirection.None || sortByName === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc;
        setSortByName(val);
        setSortBy('name');
    }

    const toggleSortDetails = () => {
        const val = sortByDetails === SortDirection.None || sortByDetails === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc;
        setSortByDetails(val);
        setSortBy('details');
    }

    const toggleSortQuantity = () => {
        const val = sortByQuantity === SortDirection.None || sortByQuantity === SortDirection.Desc ? SortDirection.Asc : SortDirection.Desc;
        setSortByQuantity(val);
        setSortBy('quantity');
    }

    // filtering
    const handleSearch = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearch(event.target.value);
    }

    const filterBy = (val: any) => {
        if (search === '') {
            return val;
        } else if (val.name.toLowerCase().includes(search) || val.details.toLowerCase().includes(search) || val.name.includes(search) || val.details.includes(search) || val.name.toUpperCase().includes(search) || val.details.toUpperCase().includes(search)) {
            return val;
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div className="l">
            <Nav />
            <div className="l__content">
                <div className="flex flex--justify--spc-between padd--20">
                    <div className="title--secondary montserrat--semi-bold">Start adding new products!</div>
                    <div className="flex">
                        <div className="input__icon pos--rel m--right-8 m--top-1">
                            <i className="icon icon--search input__icon--left pos--absolute cur--pointer" onClick={() => setActive(!active)}></i>
                            <input disabled={active ? false : true} type="text" className={active ? "input input--primary input--base--active" : "input input--primary input--base"} onChange={handleSearch} />
                        </div>
                        <button className="btn btn--terc w--230-px cur--pointer nunito--semi-bold" onClick={handleNext}><span className="m--left-16 m--right-40">ADD PRODUCT</span> <i className="icon icon--plus m--bot-4"></i></button>
                    </div>
                </div>

                <table className="table m--top-123">
                    <tr className="table__row table__row--head">
                        <th className="table__row--header nunito--extra-bold">Barcode <i className={`icon icon--sort cur--pointer ${sortBy === 'barcode' ? 'active' : ''}`} onClick={toggleSortBarcode}></i></th>
                        <th className="table__row--header nunito--extra-bold">Name <i className={`icon icon--sort cur--pointer ${sortBy === 'name' ? 'active' : ''}`} onClick={toggleSortName}></i></th>
                        <th className="table__row--header nunito--extra-bold">Quantity <i className={`icon icon--sort cur--pointer ${sortBy === 'quantity' ? 'active' : ''}`} onClick={toggleSortQuantity}></i></th>
                        <th className="table__row--header nunito--extra-bold">Details <i className={`icon icon--sort cur--pointer ${sortBy === 'details' ? 'active' : ''}`} onClick={toggleSortDetails}></i></th>
                    </tr>
                    {products.filter(filterBy).map(x => (
                        <TableData onDelete={deleteProduct} products={x} />
                    ))}
                </table>

            </div>
        </div>
    )
}

export default Products;