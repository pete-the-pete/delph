import Ember from 'ember';
import DS from "ember-data";

export default DS.Adapter.extend({
  defaultSerializer: '-default',

  ALL_HISTORY: {'text':''},

  find: function(store, type, id) {
    this._super(store, type, id);
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
});
