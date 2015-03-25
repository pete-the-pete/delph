import Ember from 'ember';
import DS from "ember-data";

/**
* Chrome History
* https://developer.chrome.com/extensions/history
*
* Use the chrome.history API to interact with the
* browser's record of visited pages. You can add, remove,
* and query for URLs in the browser's history.
*/
export default DS.Adapter.extend({

  //default is 100 items
  ALL_HISTORY: {'text':''},

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
  },
  findBelongsTo: function(store, record, url) {
    //@TODO: this should go to the store since the domains are
    //stored in basic adapter, not a rest endpoint (or chrome api)
    store.findQuery('domain', {'hostname': record.domain});
  }

});
