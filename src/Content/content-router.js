/* eslint-disable eqeqeq */
'use strict';
const express = require('express');
const path = require('path');
const ContentService = require('./content-service');
const { requireAuth } = require('../middleware/jwt-auth');

const contentRouter = express.Router();
const jsonBodyParser = express.json();

contentRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { content_id, text } = req.body;
    const newContent = { content_id, text };

    for (const [key, value] of Object.entries(newContent))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        });

    newContent.user_id = req.user.user_id;

    ContentService.AddContent(
      req.app.get('db'),
      newContent
    )
      .then(content => {
        return res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${content.id}`));
      })
      .catch(next);
  });
module.exports = contentRouter;