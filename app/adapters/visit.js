import DS from "ember-data";

export default DS.Adapter.extend({
  generateIdForRecord: function () {
    debugger;
    return Math.random().toString(32).slice(2).substr(0, 5);
  }
});

console.debug('i am the visit adapter');