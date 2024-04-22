const http = require('http')
const fs = require('fs')          // Los 2 modulos necesarios



const fetchPokemon = () => {
    return new Promise((resolve, reject) => {    // Con promesa indicamos que cosas le vamos a devolver, error y datos
        fs.readFile('./pokedex.json', 'utf-8', 'utf-16', (err, data) => {      //utf-16 para letras japos
            if(err) {
                reject(err)
            }else{
                resolve(JSON.parse(data));  // Devuelve datos en formato JSON
            }
        });
    });
};

const handleRequest = async (req, res) => {
    const pokemon = await fetchPokemon()
    const pokemonName = decodeURI(req.url.substring(1))
    const pokemonId = decodeURI(req.url.substring(1))

    const lista_pokemon = pokemon.find(name => name.name == pokemonName);
    const id_pokemon = pokemon.find(id => id.id == pokemonId);

    if (pokemonName || pokemonId) {      // Este if es para que muestre si se encuentra el dato
        const response = {
            'Tipo': lista_pokemon.type,
            'HP': lista_pokemon.HP,
            'Attack': lista_pokemon.Attack,
            'Defense': lista_pokemon.Defense,
            'Sp. Attack': lista_pokemon.Sp. Attack,
            'Sp. Defense': lista_pokemon.Sp. Defense,
            'Speed': lista_pokemon.Speed

        }
        res.writeHead(200, {'Content-type': 'application/json'})  //Error 200, que está bien y respuesta 
        res.end(JSON.stringify(response, null, 4))
    }else{  // Else para cuando no se encuentra el dato
        res.writeHead(404, {'Content-type': 'text/plain'})
        res.end('El nombre o ID del Pokemon no existe')
    }
}


const server = http.createServer(handleRequest)

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000')
})