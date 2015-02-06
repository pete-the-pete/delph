import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('history');
  },
  afterModel: function(historyItems) {
    console.debug(historyItems);
  }
/*  setupController: function(controller, model) {
    if(chrome.history) {
        chrome.history.search({'text': ''}, function(historyItems) {
          controller.set('historyItems', historyItems);
        });
    }
  }*/
});
