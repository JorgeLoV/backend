const DataTypes = require('sequelize')
const Sequelize = require('../database/Index')

const Races = Sequelize.define('Races',{
    event_name: {type: DataTypes.STRING, allowNull: false,
    },
    date: {type: DataTypes.DATE, allowNull: false,
    },
    time: {type: DataTypes.TIME, allowNull: false,
    },
    availability: {type: DataTypes.STRING, allowNull: false,
    },
})

module.exports = Races