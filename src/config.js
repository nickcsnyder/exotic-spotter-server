'use strict';
module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'postgresql://postgres@localhost/exotic_spotter',
  JWT_SECRET: process.env.JWT_SECRET || 'e8f4ef2e-957b-4948-bc4f-ab104a64bcef'
};