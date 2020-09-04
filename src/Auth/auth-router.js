/* eslint-disable eqeqeq */
'use strict';
const express = require('express');
const jsonParser = express.json();
const AuthRouter = express.Router();
const AuthService = require('./auth-service');


AuthRouter
  .post('/login', jsonParser, (req, res, next) => {
    const { user_name, password } = req.body;
    const userLogin = { user_name, password };

    for (const [key, value] of Object.entries(userLogin))
      if (value == null)
        return res.status(400).json({ error: `Missing '${key}' in request body` });

    AuthService.getUserWithUserName(
      req.app.get('db'),
      userLogin.user_name
    )
      .then(dbUser => {
        if (!dbUser)
          return res.status(400).json({
            error: 'Incorrect user name or password'
          });
        return AuthService.comparePasswords(userLogin.password, dbUser.password)
          .then(compareMatch => {
            if (!compareMatch)
              return res.status(400).json({
                error: 'Incorrect user name or password'
              });
            const sub = dbUser.user_name;
            const payload = { user_id: dbUser.id };
            return res.send({
              authToken: AuthService.createJwt(sub, payload)
            });
          });

      })
      .catch(next);
  });

module.exports = AuthRouter;