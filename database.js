const Sequelize = require('sequelize');

const sequelize = new Sequelize("company", "root", "Abhishek25%", {
    dialect: "mysql",
    host: "localhost"
});

sequelize.authenticate().then(() => {
    console.log("connected")
}).catch((err) => {
    console.log("error" + err)
})

module.exports = sequelize;