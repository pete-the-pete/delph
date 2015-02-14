import Ember from 'ember';
import DS from "ember-data";

export default DS.Adapter.extend({

  ALL_HISTORY: {'text':'', 'maxResults': 1},

  generateIdForRecord: function () {
    return Math.random().toString(32).slice(2).substr(0, 5);
  },

  find: function(store, type, id) {
    debugger;
  },

  findAll: function(store, type) {
    return this.findQuery(store, type, this.ALL_HISTORY);
  },
  findQuery: function(store, type, query) {
    var c = this.chrome;
    return new Ember.RSVP.Promise(function(resolve) {
      c.history.search(query, function(historyItems) {
        resolve(historyItems);
      });
    });
  },
  findHasMany: function(store, record, url, relationship) {
    var c = this.chrome;
    return new Ember.RSVP.Promise(function(resolve) {
      c.history.getVisits({'url':url}, function(history_visits) {
        console.debug(history_visits);
        Ember.run(null, resolve, history_visits);
      });
    });
  },
  findMany: function() {
    debugger;
  }

});

console.debug('i am the history adapter');