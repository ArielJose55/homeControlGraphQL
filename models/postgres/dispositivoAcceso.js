'use-strict'
module.exports = (sequelize, DataTypes) => {
    var DispositivoAcceso = sequelize.define('DispositivoAcceso', {
        idDispositivoAcceso: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_dispositivo_acceso'
        }
    }, {
        tableName: 'dispositivo_acceso',
        createdAt: false,
        updatedAt: false
    });

    DispositivoAcceso.associate = (models)  => {
        models.DispositivoAcceso.hasMany(models.HistorialDeAcceso, {
            foreignKey: 'id_dispositivo_acceso_fk',
            sourceKey: 'id_dispositivo_acceso',
        });
        models.DispositivoAcceso.belongsTo(models.Dispositivo, {
            foreignKey: 'id_dispositivo_fk',
            targetKey: 'idDispositivo',
            as: 'Dispositivo'
        });
    };

    return DispositivoAcceso;
}