const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'Arnage_Karting/database/Index.js'
});

// Comprobar la conexión a la BD
sequelize.authenticate()
  .then (() => {
    console.log('BD conectada');
  })
  .catch(err => {
    console.log('Error ' + err);
  })

  module.exports = sequelize