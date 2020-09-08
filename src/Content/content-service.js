'use strict';

const ContentService = {
  getById(db, id) {
    return db
      .from('exotic_spotter_content')
      .select()
      .where('content.id', id)
      .first();
  },
  AddContent(db, newContent) {
    return db
      .insert(newContent)
      .into('exotic_spotter_content')
      .returning('*')
      .then(([content]) => content)
      .then(content =>
        ContentService.getById(db, content.id)
      );

  },
  serializeContent(content) {
    return {
      id: content.id,
      date_created: content.date_created
    };
  }
};
module.exports = ContentService;