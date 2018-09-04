'use-strict'
module.exports = (sequelize, DataTypes) => {
    var Sensor = sequelize.define('Sensor', {
        idSensor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_sensor'
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'tipo'
        },
        metrica: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'metrica'
        },
        seudonimo:{
            type: DataTypes.STRING,
            allowNull: false,
            field: 'seudonimo'
        }
    }, {
        tableName: 'sensor',
        createdAt: false,
        updatedAt: false
    });

    Sensor.associate = (models) => {
        models.Sensor.belongsTo(models.Dispositivo, {
            foreignKey: 'id_dispositivo_fk',
            targetKey: 'idDispositivo',
            as: 'Dispositivo'
        });
    };

    return Sensor;
};