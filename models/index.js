var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack');

var Page = sequelize.define('page', {
  title: Sequelize.STRING,
  urlTitle: Sequelize.TEXT,
  content: Sequelize.TEXT,
  status: Sequelize.BOOL
})

var User = sequelize.define('user', {
  name: Sequelize.STRING,
  email: {type: Sequelize.STRING, unique: true}
})

http://docs.sequelizejs.com/en/v3/docs/models-definition/#data-types
