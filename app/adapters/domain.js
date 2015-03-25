import Ember from 'ember';
import DS from "ember-data";
import urlUtils from '../utils/parse-url';

/**
* Domains
*
* Not part of the chrome api, but gives a way to group
* different histories
**/
export default DS.FixtureAdapter.extend({
  simulateRemoteResponse: false,

  queryFixtures: function(fixtures, query, type) {
    var key = Object.keys(query)[0];
    return fixtures.findBy(key, query[key]);
  },

  findAll: function(store, type, sinceToken) {
    //return a promise with an array of the domains
    //keep getting more histories until the domains is ufll
    var self = this,
      all_domains = [],
      fixtures = self.fixturesForType(type) || [];

    return new Ember.RSVP.Promise(function(resolve) {
      store.findAll('history').then(function(histories) {
        histories.content.forEach(function(h, index) {
          var history_id = h.get('id'),
            existing_domain = null,
            domain_data = urlUtils.parseURL(h.get('url'));

          existing_domain = self.queryFixtures(fixtures, {'hostname':domain_data.hostname});

          if(!existing_domain) {
            //create the new fixture and association
            domain_data.id = self.generateIdForRecord();
            domain_data.histories = [history_id];
            all_domains.push(domain_data);
            fixtures.push(domain_data);
          } else {
            existing_domain.histories.push(history_id);
          }
        });
        resolve(all_domains);
      });
    });
  }
});
