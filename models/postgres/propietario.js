'use-strict'
module.exports = (sequelize, DataTypes) => {
    var Propietario = sequelize.define('Propietario', {
        idPropietario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_propietario'
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'username'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password'
        }
    }, {
        tableName: 'propietario',
        createdAt: false,
        updatedAt: false
    });

    Propietario.associate = (models) => {
        models.Propietario.belongsTo(models.Inmueble,{
            foreignKey: 'id_inmueble_fk',
            targetKey: 'idInmueble',
            as: 'Inmueble'
        });
        models.Propietario.belongsTo(models.Residente, {
            foreignKey: 'id_residente_fk',
            targetKey: 'idResidente',
            as: 'Residente'
        });
    };

    return Propietario;
}