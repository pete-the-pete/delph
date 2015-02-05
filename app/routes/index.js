import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    console.debug(chrome.history);
    if(chrome.history) {
      chrome.history.search({'text': ''}, function(historyItems) {
        controller.set('historyItems', historyItems);
      });
    }
  }
});
