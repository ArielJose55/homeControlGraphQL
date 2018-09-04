'use-strict'
module.exports = (sequelize, DataTypes) => {
    var Tipo = sequelize.define('Tipo', {
        idTipo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_tipo'
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'tipo'
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'descripcion'
        }
    }, {
        tableName: 'tipo',
        createdAt: false,
        updatedAt: false
    });

    Tipo.associate = (models) => {
        models.Tipo.hasMany(models.Dispositivo, {
            foreignKey: 'id_tipo_fk',
            sourceKey: 'id_tipo'
        });
    };

    return Tipo;
}