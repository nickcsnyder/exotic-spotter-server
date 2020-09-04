'use strict';
const express = require('express');
const CarListService = require('./car-list-service');
const { requireAuth } = require('../middleware/jwt-auth');
const carListRouter = express.Router();

carListRouter
  .route('/')
  .get((req, res, next) => {
    CarListService.getAllCars(req.app.get('db'))
      .then(cars => {
        res.json(CarListService.serializeCars(cars));
      })
      .catch(next);
  });

carListRouter
  .route('/:car_id')
  .all(requireAuth)
  .all(checkCarExists)
  .get((req, res) => {
    res.json(CarListService.serializeCar(res.car));
  });

async function checkCarExists(req, res, next) {
  try {
    const car = await CarListService.getById(
      req.app.get('db'),
      req.params.car_id
    )
    if (!car)
      return res.status(404).json({
        error: `Car doesn't exist.`
      })
    res.car = car
    next()
  }
  catch (error) {
    next(error)
  }
}

module.exports = carListRouter;