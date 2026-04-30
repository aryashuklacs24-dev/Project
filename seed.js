const mongoose = require('mongoose');
const Car = require('./models/car');
const User = require('./models/user');

mongoose.connect('mongodb://127.0.0.1:27017/carDB')
.then(() => console.log("DB Connected for Seeding"))
.catch(err => console.log(err));

const seedData = async () => {
  try {
    // Clear old data
    await Car.deleteMany({});
    await User.deleteMany({});

    // Create Users
    const users = await User.insertMany([
      {
        owner: "Arya",
        licence: "1234",
        age: 20
      },
      {
        owner: "Rahul",
        licence: "5678",
        age: 25
      }
    ]);

    // Create Cars linked to users
    await Car.insertMany([
      {
        carName: "Swift",
        price: 600000,
        seater: 5,
        owner: users[0]._id   // Arya
      },
      {
        carName: "Creta",
        price: 1200000,
        seater: 5,
        owner: users[1]._id   // Rahul
      },
      {
        carName: "Innova",
        price: 1800000,
        seater: 7,
        owner: users[0]._id   // Arya
      }
    ]);

    console.log("🌱 Seed Data Inserted Successfully");
    process.exit();

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedData();