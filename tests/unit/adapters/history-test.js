import {
  moduleFor,
  test
} from 'ember-qunit';
import Ember from "ember";

var HistoryItem, env, store, adapter;

moduleFor('adapter:history', 'HistoryAdapter', {
});

// Replace this with your real tests.
test('it exists', function() {
  var adapter = this.subject();
  ok(adapter);
});

test('findAll should use the default query', function() {
  var adapter = this.subject();
  adapter.findQuery = function(store, type, query) {
    equal(query, adapter.ALL_HISTORY);
    return Ember.RSVP.resolve();
  };

  adapter.findAll();
});