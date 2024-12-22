const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("", "root", "Qwe@1245", {
  host: "localhost",
  dialect: "mysql",
});

async function createDatabase(dbName) {
  const queryInterface = sequelize.getQueryInterface();
  try {
    await sequelize.authenticate();
    console.log("Connected to MySQL!");

    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database '${dbName}' created successfully or already exists.`);
    
    sequelize.config.database = dbName;
    await sequelize.sync({ force: false });
    console.log("Models have been synchronized successfully.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await sequelize.close();
    console.log("Connection closed.");
  }
}

const dbName = "prdData";

createDatabase(dbName);

module.exports = { sequelize };


// Mongoose Connection

const mongoose = require("mongoose");

// MongoDB Connection URI
const mongoURI = "mongodb://localhost:27017/my_database_name"; // Replace `my_database_name` with your desired database name

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB!");

  })
  .then(() => {
    console.log("Database and collection created successfully!");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error creating database:", error);
    mongoose.connection.close();
  });

