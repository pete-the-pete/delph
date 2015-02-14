import Ember from 'ember';
import DS from "ember-data";

export default DS.Adapter.extend({

  ALL_HISTORY: {'text':'', 'maxResults': 1},

  mungeChromeIds: function(collection) {
    var adapter = this;
    collection = Ember.isArray(collection) ? collection : collection.toArray();
    collection.forEach(function(item) {
      item.chromeId = item.id;
      item.id = adapter.generateIdForRecord();
    });
    return collection;
  },

  generateIdForRecord: function () {
    return Math.random().toString(32).slice(2).substr(0, 5);
  },

  findAll: function(store, type) {
    return this.findQuery(store, type, this.ALL_HISTORY);
  },
  findQuery: function(store, type, query) {
    var adapter = this,
      c = adapter.chrome;
    return new Ember.RSVP.Promise(function(resolve) {
      c.history.search(query, function(historyItems) {
        resolve(adapter.mungeChromeIds(historyItems));
      });
    });
  },
  findHasMany: function(store, record, url /*, relationship*/) {
    var adapter = this,
      c = adapter.chrome;
    return new Ember.RSVP.Promise(function(resolve) {
      c.history.getVisits({'url':url}, function(history_visits) {
        resolve(adapter.mungeChromeIds(history_visits));
      });
    });
  }

});