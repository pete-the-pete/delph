import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('history');
  },
  afterModel: function(model) {
    debugger;
    var self = this;
    Ember.run.next(function() {
      var x = model.get('firstObject');
      x.get('visits').then(function(v) {
        console.debug(v.toString());
        console.debug(v.toArray());
        console.debug(v.get('firstObject').get('transition'));
      });
    });
  }
});
