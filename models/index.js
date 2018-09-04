'use-strict'
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var mongoose = require('mongoose');
const log4js = require('log4js');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.js')[env];
var db = {};

const log = log4js.getLogger('index.js - Connection');

log.info('conectando a la base de datos de postgres');
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    define: {
      schema: config.schema
    }
  });
}

const pathModels = __dirname.concat('\\', 'postgres');

fs
  .readdirSync(pathModels)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    log.info('importando el modelo: ',file);
    var model = sequelize['import'](path.join(pathModels, file));
    db[model.name] = model;
  });


Object.keys(db).forEach(modelName => {
  log.info('associando las relaciones de los modelos');
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

mongoose.connect(config.mongo_url, (err) => {
  log.info('conectando a la base de datos de mongo');
  if (!err) {
    log.info('Conexion exitosa a mongodb');
  } else {
    log.error('Error a conectar a la base de datos mongo', err);
    process.exit(-1);
  }
});


db.mongoose = mongoose;
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;