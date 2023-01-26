import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import { getVideogames, getGenres , setVideogames} from "../../redux/actions/index";
import style from "./LandingPage.module.css"

const LandingPage = () => {
    const dispatch = useDispatch(); 
    useEffect(() => {
        dispatch(getVideogames());
        dispatch(getGenres());
        dispatch(setVideogames());
    }, [])

    return (
        <div className={style.divContainer}>
            <h1 className={style.title} >VIDEOGAMES</h1>
            <h1 className={style.start}>PRESS START</h1>
            <Link to="/home">
                <button className={style.buttonStart} autoFocus>
                    <span>›</span> START
                </button>
            </Link>
        </div>
    );
}
export default LandingPage;