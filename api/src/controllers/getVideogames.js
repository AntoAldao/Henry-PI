const axios = require('axios');
const {Videogame, Genre } = require('../db.js');

const {API_KEY} = process.env;
console.log(API_KEY)
const getVideogames = async (req, res) => {
    //pedir a la bd todos los videojuegos
    //pedir a la api los primeros 100 videojuegos
    //unir los dos
    //devolver imagen, nombre y genero de cada videojuego

    //si hay query devolver los 15 primeros videojuegos que contengan la query en el nombre
    //si no hay resultado devolver un mensaje 
    //https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=1
    try {
        const { name } = req.query;
        let api =[]
        let allVideoGames = []
        let dbVideoGames = []
        
        for (let i = 1; i <= 5; i++) {
            api.push(await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`));
        }
        Promise.all(api)
        .then((response) => {
            let apiVideoGames = response.map((r) => r.data.results); // guardo solo los juegos de cada pagina
            apiVideoGames = apiVideoGames.flat(); // como devuelve un array de arrays, lo paso a un array plano
            apiVideoGames = apiVideoGames.map((game) => { // mapeo para obtener solo los datos que necesito
                return {
                    name: game.name,
                    image: game.background_image,
                    genres: game.genres.map((genre) => genre.name),
                    id: game.id,
                    created: false,
                    rating: game.rating,
                };
            });
            allVideoGames.push(apiVideoGames); // guardo los juegos de la api en un array
        })
        .then(async () => {
            dbVideoGames.push(await Videogame.findAll({ include: Genre })); // guardo los juegos de la bd en el mismo array
            dbVideoGames = dbVideoGames.flat(); // como devuelve un array de arrays, lo paso a un array plano
            dbVideoGames = dbVideoGames.map((game) => { // mapeo para obtener solo los datos que necesito
                return {
                    name: game.name,
                    image: game.image,
                    genres: game.genres.map((genre) => genre.name),
                    id: game.id,
                    created: true,
                    rating: game.rating,
                };
            });
            allVideoGames.push(dbVideoGames); // guardo los juegos de la bd en el mismo array
            allVideoGames = allVideoGames.flat(); // como devuelve un array de arrays, lo paso a un array plano
            if (name) { // si hay query, filtro los juegos por nombre
                allVideoGames = allVideoGames.filter((game) => 
                    game.name.toLowerCase().includes(name.toLowerCase())
                );
                if (allVideoGames.length > 0) { 
                    if (allVideoGames.length > 15) { // si hay juegos que coincidan con la query, devuelvo los 15 primeros
                        allVideoGames = allVideoGames.slice(0, 15);
                    }
                    res.status(200).send(allVideoGames);
                } else {
                    res.status(404).send('No se encontraron videojuegos'); // si no hay juegos que coincidan con la query, devuelvo un mensaje
                }
            }else{
                res.status(200).send(allVideoGames); // si no hay query, devuelvo todos los juegos
            }
        })

    } catch (error) {
        {res.status(400).send(error.message);}
    }    


};
module.exports = getVideogames;