import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div>
            <h1>VIDEOGAMES</h1>
            <Link to="/home">
                <button>Home</button>
            </Link>
        </div>
    );
}
export default LandingPage;