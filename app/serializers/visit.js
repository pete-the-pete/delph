import DS from 'ember-data';

export default DS.JSONSerializer.extend({
  serializeHasMany: function() {
    debugger;
  }
});

console.debug('i am the visit serializer');