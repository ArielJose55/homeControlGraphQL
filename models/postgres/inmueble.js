'use-strict'
module.exports = (sequelize, DataTypes) => {
    var Inmueble = sequelize.define('Inmueble', {
        idInmueble: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_inmueble'
        },
        ubicacion: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'ubicacion'
        },
        estrato: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'estrato'
        }
    }, {
        tableName: 'inmueble',
        createdAt: false,
        updatedAt: false
    });

    Inmueble.associate = (models) => {
        models.Inmueble.hasMany(models.Dispositivo, {
            foreignKey: 'id_inmueble_fk',
            sourceKey: 'id_inmueble'
        });
        models.Inmueble.hasMany(models.Residente, {
            foreignKey: 'id_inmueble_fk',
            sourceKey: 'id_inmueble'
        });
    };

    return Inmueble;
};