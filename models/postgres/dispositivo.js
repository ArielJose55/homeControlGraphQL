'use-strict'
module.exports = (sequelize, DataTypes) => {
    var Dispositivo = sequelize.define('Dispositivo', {
        idDispositivo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id_dispositivo'
        },
        numeroSerial: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isUnique: (value, next) => {
                    let self = this;
                    Dispositivo.find({
                        where: {
                            numeroSerial: value
                        }
                    }).then((dispositivo) => {
                        console.log(self);
                        if (dispositivo && self.numeroSerial == dispositivo.numeroSerial) {                            
                            return next('El serial de este dispositivo ya esta en uso');
                        }
                        return next();
                    }).catch((err) => {
                        return next(err);
                    });
                }
            },
            field: 'numero_serial'
        },
        estado: {
            type: DataTypes.ENUM,
            values: ['ACTIVO', 'MANTENIMIENTO', 'INACTIVO'],
            defaultValue: 'ACTIVO',
            allowNull: false,
            field: 'estado'
        },
        ubicacion: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'ubicacion'
        },
        fechaDeFuncionamiento :{
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
            field: 'fecha_de_funcionamiento'
        },
        createdAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'createdAt'
        }
    }, {
        tableName: 'dispositivo',
        updatedAt: false
    });

    Dispositivo.associate = (models) => {
        models.Dispositivo.belongsTo(models.Inmueble, {
            foreignKey: 'id_inmueble_fk',
            targetKey: 'idInmueble',
            as: 'Inmueble'
        });
        models.Dispositivo.belongsTo(models.Tipo, {
            foreignKey: 'id_tipo_fk',
            targetKey: 'idTipo',
            as: 'Tipo'
        });
    };

    return Dispositivo;
};