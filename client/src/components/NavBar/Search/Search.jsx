import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {getVideogamesByName, setVideogames,setPage,setLoading,deleteSearched,stateToSave} from '../../../redux/actions/index';
import style from './Search.module.css';
import lupa from '../../../assets/lupa3.svg';
import { useLocalStorage } from '../../../useLocalStorage';

const Search = () => {
    const dispatch = useDispatch();
    const [name, setName] = useLocalStorage('name', '');

    const handleChange = (e) => {
        setName(e.target.value);
        if (e.target.value === "") {
            setName("");
            dispatch(deleteSearched());
            dispatch(setVideogames());
            dispatch(setPage(1));
            dispatch(stateToSave());
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getVideogamesByName(name));
        dispatch(setPage(1));
        dispatch(setLoading(true))
        dispatch(stateToSave());
    }

    return (
        <form className={style.search}>
            <input type="text" value={name} onChange = {handleChange} className={style.input}/>
            <button type = "submit" onClick={handleSubmit} className={style.button} autoFocus>
                <img src={lupa} alt="lupa" width="20px" height="20px"/>
            </button>
        </form>
    );
}
export default Search;