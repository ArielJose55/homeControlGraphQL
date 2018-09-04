'use-strict'
module.exports = (sequelize, DataTypes) => {

    var Residente = sequelize.define('Residente', {
        idResidente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_residente'
        },
        identificacion: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'identificacion'
        },
        tipoDeIdentificacion: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'tipo_de_identificacion'
        },
        nombres: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'nombres'
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'apellidos'
        },
        image: {
            type: DataTypes.STRING,
            field: 'image'
        }
    }, {
        tableName: 'residente',
        createdAt: false,
        updatedAt: false
    });

    Residente.associate = (models) => {
        models.Residente.belongsTo(models.Inmueble, {
            foreignKey: 'id_inmueble_fk',
            targetKey: 'idInmueble',
            as: 'Inmueble'
        });
        models.Residente.hasMany(models.HistorialDeAcceso, {
            foreignKey: 'id_residente_fk',
            sourceKey: 'id_residente',
        });
    };
    return Residente;
};
