import Ember from 'ember';
import DS from "ember-data";

var ALL_HISTORY = {'text':''};

export default DS.Adapter.extend({
  defaultSerializer: '-default',

  //shortcuts to the chrome functions
  c_history: chrome.history,

  find: function(store, type, id) {
    this._super(store, type, id);
  },

  findAll: function(store, type) {
    return this.findQuery(store, type, ALL_HISTORY);
  },
  findQuery: function(store, type, query) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      chrome.history.search(query, function(historyItems) {
        resolve(historyItems);    
      });
    });
  },
});
