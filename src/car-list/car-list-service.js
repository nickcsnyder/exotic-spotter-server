'use strict';
const xss = require('xss');
const Treeize = require('treeize');

const CarListService = {
  getAllCars(db) {
    return db
      .from('exotic_spotter_content')
      .select(
        'car_list.id',
        'car_list.make',
        'car_list.model',
        'car_list.location',
        'car_list.date_created'
      );
  },
  getById(db, id) {
    return CarListService.getAllCars(db)
      .where('car_list.id', id)
      .first();
  },
  serializeCars(cars) {
    return cars.map(this.serializeCar);
  },
  serializeCar(car) {
    const carTree = new Treeize();
    const carData = carTree.grow([ car ]).getData()[0];
    return {
      id: carData.id,
      make: xss(carData.make),
      model: xss(carData.model),
      location: xss(carData.location),
      date_created: carData.date_created,
    };
  }
};

module.exports = CarListService;