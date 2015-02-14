import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('history');
  },
  afterModel: function(model) {
    var self = this;
    Ember.run.next(function() {
      console.debug(self.store.find('history', "1679").then(function(r) {
        console.debug(r);
        /*debugger;*/
        r.get('visits').then(function(v) {
          /*debugger;*/
          console.debug(v.toString());
          console.debug(v.toArray());
          console.debug(v.get('firstObject').get('transition'));
        });
      }));
    });
  }
});
