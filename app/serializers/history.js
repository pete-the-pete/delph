import Ember from 'ember';
import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  normalize: function(type, hash) {
    hash.links = {
      'visits': hash.url
    }
    return this._super(type, hash);
  }
});

console.debug('i am the history serializer');