import DS from 'ember-data';
import urlUtils from '../utils/parse-url';

export default DS.JSONSerializer.extend({
  normalize: function(type, hash) {
    hash.links = {
      'visits': hash.url,
      'domain': urlUtils.parseURL(hash.url).hostname
    };
    return this._super(type, hash);
  }
});
