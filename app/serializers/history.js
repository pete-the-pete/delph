import Ember from 'ember';
import DS from 'ember-data';

//export default DS.RESTSerializer.extend({
export default DS.JSONSerializer.extend({
  normalize: function(type, hash) {
    debugger;
    hash.links = {
      'visits': hash.url
    }
    return this._super(type, hash);
  },
  serializeHasMany: function() {
    debugger;
  }
});

console.debug('i am the history serializer');