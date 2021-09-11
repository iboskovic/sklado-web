import { Route, Switch } from "react-router"
import AddProduct from "./app/pages/AddProduct";
import EditProduct from "./app/pages/EditProduct";
import Home from "./app/pages/Home";
import Products from "./app/pages/Products";

const MainRouter = () => {
    return (
        <Switch>
            {/* <Route> */}
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/add-product" component={AddProduct} />
            <Route exact path="/products/edit-product/:productId" component={EditProduct} />
            {/* </Route> */}
        </Switch>
    )
}

export default MainRouter;