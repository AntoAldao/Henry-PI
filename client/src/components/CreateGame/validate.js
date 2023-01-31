import { useSelector } from "react-redux";
function isUrl(s) {   
    var regexp = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    var regexp2 = /[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)?/gi;
    return regexp.test(s) || regexp2.test(s);
}
function isDate(s) {
    var regexp = /(\d{4})-(\d{2})-(\d{2})/g;
    return regexp.test(s);
}

const  validate = (game,allVideogames) => {
    const names = allVideogames.map((game) => game.name.toLowerCase())
    const errors = {}
    if (!game.name  ) {
        errors.name ="Name is required"
    }
    if(names.includes(game.name.toLowerCase())) {
        errors.name = "Name already exists"
    }
        
    else if (!isUrl(game.image) && game.image !== "") {
        errors.image = "image must be a valid URL"
    }
    else if (!game.description  ) {
        errors.description="Description is required"
    }
    else if ( !game.genres.length) {
        errors.genres = "Genre is required"
    }
    else if ( !game.platforms.length) {
        errors.platforms = "Platform is required"
    }
    else if (String(parseFloat(game.rating)) === "NaN" && game.rating !== ""){
        errors.rating = "Rating must be a number"
    }
    else if (parseFloat(game.rating) < 0 || parseFloat(game.rating) > 5) {
        errors.rating = "Rating must be between 0 and 5"
    }
    else if (!game.released ) {
        errors.released = "Release date is required"
    }
    else if (!isDate(game.released) && game.released !== "") {
        errors.released = "Release date must be a valid date (YYYY-MM-DD)"
    }

    
    
    return errors
}
export default validate;