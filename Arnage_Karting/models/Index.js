const sequelize = require('../database/Index')
const Users = require('./Users')
const Races = require('./Races')

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false }); //false para no re-crear tablas cada vez
        console.log('Databse y tablas creadas');
    } catch (error) {
        console.error('Imposible crear las tablas: ', error)
    }
}

syncDatabase();

module.exports = { Users, Races };