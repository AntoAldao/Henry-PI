import {
    GET_VIDEOGAMES,
    SET_VIDEOGAMES,
    GET_VIDEOGAMES_BY_NAME,
    GET_GENRES,
    FILTER_BY_GENRE,
    FILTER_BY_CREATED_OR_API,
    ORDER,
    SETPAGE,
    LOADING,
    DELETE_SEARCHED
} from '../actions/index.js';
import { LocalStorageRedux } from '../../useLocalStorage.js';


let initialState = {
    allVideogames : [],
    videogames : [],
    genres : [],
    OrderBy : "",
    FilteredByGenre : "", 
    FilteredByCreatedOrApi : "",
    platforms : ["PC","PlayStation 5","Xbox One","PlayStation 4","Xbox Series S/X",
                            "Nintendo Switch","iOS","Android","Nintendo 3DS","Nintendo DS",
                            "Nintendo DSi","macOS","Linux","Xbox 360","Xbox","PlayStation 3",
                            "PlayStation 2","PlayStation","PS Vita","PSP","Wii U","Wii","GameCube",
                            "Nintendo 64", "Game Boy Advance","Game Boy Color","Game Boy","SNES","NES",
                            "Classic Macintosh","Apple II","Commodore / Amiga","Atari 7800","Atari 5200",
                            "Atari 2600","Atari Flashback","Atari 8-bit","Atari ST","Atari Lynx","Atari XEGS",
                            "Genesis","SEGA Saturn","SEGA CD","SEGA 32X","SEGA Master System","Dreamcast",
                            "3DO","Jaguar","Game Gear","Neo Geo"],
    page: 1,
    loading: true,
    searchedgames: [],
    isSearched: false
};

initialState = LocalStorageRedux(initialState)[0]()
// console.log(LocalStorageRedux(initialState)[0]())
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_VIDEOGAMES:
            return {
                ...state,
                allVideogames : action.payload,
            } 
        case SET_VIDEOGAMES:
            let videogames = [...state.allVideogames];
            if (state.searchedgames.length)  {
                videogames = [...state.searchedgames];
            }
            if (!state.searchedgames.length && state.isSearched){
                videogames = ["No results found"];
                return {
                    ...state,
                    videogames : videogames
                }
        
            }

            if (state.OrderBy === "Name A-Z") {
                videogames = videogames.sort((a, b) => { 
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1;
                    }
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                })
            }
            else if (state.OrderBy === "Name Z-A") {
                videogames = videogames.sort((a, b) => { 
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return 1;
                    }
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return -1;
                    }
                    return 0;
                })
            }
            else if (state.OrderBy === "Rating 0-5") {
                videogames = videogames.sort((a, b) => {
                    if (a.rating === "Not rated" && b.rating !== "Not rated") {
                        return 1;
                    }
                    if (a.rating !== "Not rated" && b.rating === "Not rated") {
                        return -1;
                    }
                    if (a.rating === "Not rated" && b.rating === "Not rated") {
                        return 0;
                    }
                    return parseFloat(a.rating) - parseFloat(b.rating)
                    });
                }
            else if (state.OrderBy === "Rating 5-0") {
                videogames = videogames.sort((a, b) => {
                    if (a.rating === "Not rated" && b.rating !== "Not rated") {
                        return 1;
                    }
                    if (a.rating !== "Not rated" && b.rating === "Not rated") {
                        return -1;
                    }
                    if (a.rating === "Not rated" && b.rating === "Not rated") {
                        return 0;
                    }
                    return parseFloat(b.rating) - parseFloat(a.rating)
                    });
            }

            if (state.FilteredByCreatedOrApi === "Created") {
                videogames = videogames.filter((game) => {
                    return game.created === true})
                }

            else if (state.FilteredByCreatedOrApi === "Existing") {
                videogames = videogames.filter((game) => {
                    return game.created === false})
            }
            if (state.FilteredByGenre !== "") {
                videogames = videogames.filter((game) => {
                    return game.genres.some((genre) => {
                       return genre === state.FilteredByGenre
                    })

                })
            }
            if(!videogames.length && (state.FilteredByGenre !== "" || state.FilteredByCreatedOrApi !== "" || state.OrderBy !== "")) {
                videogames = ["No results found"];
            }


            return {
                ...state,
                videogames : videogames
            }
        case GET_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                searchedgames: action.payload,
                isSearched: true
            }
        case GET_GENRES:
            return {
                ...state,
                genres : action.payload
            }
        case FILTER_BY_GENRE:
            return {
                ...state,
                FilteredByGenre : action.payload
            }
        case FILTER_BY_CREATED_OR_API:
            return {
                ...state,
                FilteredByCreatedOrApi: action.payload
            }
        case ORDER:
            return {
                ...state,
                OrderBy : action.payload
            }
        case SETPAGE:
            return {
                ...state,
                page : action.payload
            }
        case LOADING:
            return {
                ...state,
                loading : action.payload
            }
        case DELETE_SEARCHED:
            return {
                ...state,
                searchedgames: [],
                isSearched: false
            }
        
        default:
            LocalStorageRedux(initialState)[1](state)
            return {...state};

    }

};

// const setLocalStorage = (state = initialState) => {

//     let stateToSave = {
//         allVideogames : state.allVideogames,
//         videogames : state.videogames,
//         genres : state.genres,
//         FilteredByGenre : state.FilteredByGenre,
//         FilteredByCreatedOrApi : state.FilteredByCreatedOrApi,
//         OrderBy : state.OrderBy,
//         page : state.page,
//         loading : state.loading,
//         searchedgames : state.searchedgames,
//         isSearched : state.isSearched
//     }
//     LocalStorageRedux[1](stateToSave)

//     return stateToSave
// }


export default rootReducer;