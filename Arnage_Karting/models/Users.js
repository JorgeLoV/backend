const DataTypes = require('sequelize')
const sequelize = require('../database/Index')

// Definición de las tablas
const Users = sequelize.define('Users', {
    user_name: {type: DataTypes.STRING, allowNull: false
    },
    user_lastname: {type: DataTypes.STRING, allowNull: false
    },
    user_mail: {type: DataTypes.STRING, allowNull: false, unique: true
    },
})

module.exports = Users  