import DS from 'ember-data';

var s_attr = DS.attr('string');

/**
* All the parts of a domain, to group the histories.
* Names from this reference: https://www.mattcutts.com/blog/seo-glossary-url-definitions/
**/
export default DS.Model.extend({
  'protocol': s_attr,
  'hostname': s_attr,
  'subdomain': s_attr,
  'domain': s_attr,
  'tld': s_attr,
  'sld': s_attr,
  'port': s_attr,
  'path': s_attr,
  'params': s_attr,
  'fragment': s_attr,
  'histories': DS.hasMany('history', {async: true})
});
