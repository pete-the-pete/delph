import DS from 'ember-data';

/**
* Chrome VisitItem.
* https://developer.chrome.com/extensions/history#type-VisitItem
*
* Part of the history API, but accessed separately from the
* history items.
*
**/
export default DS.Model.extend({
  'chromeId': DS.attr('number'),
  'visitId': DS.attr('number'),
  'visitTime': DS.attr('number'),
  'referingVisitId': DS.attr('number'),
  'transition': DS.attr('string'),
  'history': DS.belongsTo('history', {async: true})
});