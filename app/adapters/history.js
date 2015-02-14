import Ember from 'ember';
import DS from "ember-data";

export default DS.Adapter.extend({

  ALL_HISTORY: {'text':'', 'maxResults': 1},

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
        var data = {'histories':historyItems};
        resolve(historyItems);
      });
    });
  },
  findHasMany: function(store, record, url, relationship) {
    debugger;
    var c = this.chrome;
    return new Ember.RSVP.Promise(function(resolve) {
      c.history.getVisits({'url':url}, function(history_visits) {
        var data = {'visits':history_visits};
        resolve(history_visits);
      });
    });
  },
  findMany: function() {
    debugger;
  }

});

console.debug('i am the history adapter');