const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/rest_api')
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.error(error))
    