'use-strict'
module.exports = (sequelize, DataTypes) => {
    var HistorialDeAcceso = sequelize.define('HistorialDeAcceso', {
        idHistorialDeAcceso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_historial_de_acceso'
        },
        fechaDeRegistro: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'fecha_de_registro'
        }
    }, {
        tableName: 'historial_de_acceso',
        createdAt: false,
        updatedAt: false
    });

    HistorialDeAcceso.associate = (models) => {
        models.HistorialDeAcceso.belongsTo(models.Residente, {
            foreignKey: 'id_residente_fk',
            targetKey: 'idResidente',
            as: 'Residente'
        });
        models.HistorialDeAcceso.belongsTo(models.DispositivoAcceso, {
            foreignKey: 'id_dispositivo_acceso_fk',
            targetKey: 'idDispositivoAcceso',
            as: 'DispositivoAcceso'
        });
    };

    return HistorialDeAcceso;
};