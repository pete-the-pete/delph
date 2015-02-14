import DS from 'ember-data';

export default DS.Model.extend({
  'chromeId': DS.attr('number'),
  'lastVisitTime': DS.attr('number'),
  'title': DS.attr('string'),
  'typedCount': DS.attr('number'),
  'url': DS.attr('string'),
  'visitCount': DS.attr('number'),
  'visits': DS.hasMany('visit', {async: true})
});
