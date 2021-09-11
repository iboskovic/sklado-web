import { useHistory } from "react-router";

const Home = () => {

    const history = useHistory();

    const handleNextPage = () => {
        history.push("/products");
    }
    return (
        <div className="landing">
            <i className="icon icon--logo landing__logo m--bot-111"></i>
            <div className="title--primary m--bot-24 montserrat--semi-bold">Welcome to Sklado!</div>
            <div className="title--terc m--bot-32">Jump right in!</div>
            <button className="btn btn--primary btn--base nunito--semi-bold cur--pointer" onClick={handleNextPage}>VIEW PRODUCTS <i className="icon icon--arr-right-long m--left-24"></i></button>
        </div>
    )
}

export default Home;