const  validate = (game) => {
    const errors = {}
    if (!game.name  ) {
        errors.name ="Name is required"
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
    else if (!game.released ) {
        errors.released = "Release date is required"
    }
    else if (String(parseInt(game.rating)) === "NaN" && game.rating !== ""){
        errors.rating = "Rating must be a number"
    }
    else if (parseInt(game.rating) < 0 || parseInt(game.rating) > 5) {
        errors.rating = "Rating must be between 0 and 5"
    }
    
    return errors
}
export default validate;