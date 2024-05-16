const express = require('express')
const axios = require('axios')
const mongoose = require('mongoose')

const app = express();
app.use(express.json());

// Llamada a API
async function fetchDrivers(){
    try{
        const response = await axios.get('https://api.openf1.org/v1/drivers?driver_number=1&session_key=9158', {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.data

    }catch(error){
        console.error(error);
        return { error:error.message };
    }
}

//GET
app.get('/drivers', async (req, res) => { 
    try {
        const data = await fetchDrivers();
        res.json(data)
    } catch(error){
        res.status(500).send({error: error.message})
    }});


require('./databse') // Llama a conexión con BD

//Modelo - Esquema
const driversSchema = new mongoose.Schema({
    broadcast_name: {type: String, required: true},
    country_code: String,
    driver_number: String,
    first_name: String,
    full_name: String,    
    headshot_url: String,
    last_name: String,
    meeting_key: String,
    name_acronym: String,
    session_key: String,
    team_name: String
})

const Driver = mongoose.model('Driver', driversSchema) // crea el esquema en la BD 

//POST
app.post('/driver', async (req, res) => {
    try {
        const driver = new Driver(req.body)         
        await driver.save()                         
        res.status(201).json(driver);               
    } catch(error){
        res.status(400).json({error: error.message}) 
    }});

//DELETE
app.delete('/driver/:broadcast_name', async (req, res) => {
    try {
        const driver = await Driver.findByIdAndDelete(req.params.broadcast_name)
        if (!driver) {                                      
            return res.status(404).send()       
        }
    } catch(error) {
        res.status(500).send({error: error.message})
    }});

//PUT
app.put('/driver/:broadcast_name', async (req, res) => {
    try {           //req.params.b_n es el parametro por el que buscar  - req.body es el nuevo valor
        const example = await Driver.findByIdAndUpdate(req.params.broadcast_name, req.body);
        if (!Driver) {
            return res.status(404).send()
        }
        res.send(Driver)

    } catch (error) {
        res.status(500).send({ error: error.message });
    }});

//Errores para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
  });

//Puerto en el que escucha el servidor
    app.listen(3000, () => {    
        console.log('Servidor escuchando en http://localhost:3000')
    })