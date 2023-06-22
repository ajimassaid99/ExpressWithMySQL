const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('eduworks', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // jika ingin menampilkan log query, ubah nilai ini menjadi true
  });
(async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
})();

module.exports = sequelize;