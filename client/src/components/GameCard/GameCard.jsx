import { Link } from "react-router-dom";
import style from "./GameCard.module.css";
import { useDispatch } from "react-redux";
import {getVideogames,setLoading} from "../../redux/actions/index.js"
import axios from "axios";
const GameCard = (props) => {
    const dispatch = useDispatch();
    const deleteGame = () => {
        axios.delete(`http://localhost:3001/api/videogames/${props.id}`)
        .then(response => alert(response.data))
        dispatch(getVideogames())
        dispatch(setLoading(true))
    }

    return (
        <div className={style.card}> 
            <img src={props.image} alt={props.name} className = {style.image}/>
            <div className={style.cardinfo}>
                <h1 className={style.name}>{props.name}</h1>
                <div className={style.genres}>
                    <ul className={style.list}>
                        {props.genres?.map((genre, index) => {
                            return <p key={index}>{genre}</p>
                        })}
                    </ul>
                    <Link to={`/videogame/${props.id}`}>
                        <button className={style.buttonname}>
                        +
                        </button>
                    </Link>
                </div>   
            </div> 
            {props.created?
            <div className={style.divdelete}>
                <button onClick={deleteGame}>X</button>
            </div> : null}
        </div>  
    )
};

export default GameCard;