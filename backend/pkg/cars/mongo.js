const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  manufacturer: String,
  year: Number,
});

const Car = mongoose.model("Car", carSchema, "cars");
// const Manifacturer = mongoose.model("Manifacturer", manifacturerSchema, "manifacturers")

const addCar = async (car) => {
  const newCar = new Car(car);
  return await newCar.save();
};

//remove car
const removeCar = async (id) => {
  return await Car.deleteOne({ _id: id });
};

//update car
const updateCar = async (id, car) => {
  return await Car.updateOne({ _id: id }, car);
};

//get all cars
const getAllCars = async () => {
  return await Car.find({});
};

//get one car
const getOneCar = async (id) => {
  return await Car.find({ _id: id });
};

module.exports = {
  addCar,
  removeCar,
  updateCar,
  getAllCars,
  getOneCar,
};
