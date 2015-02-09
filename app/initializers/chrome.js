export function initialize(container, application) {
  // application.inject('route', 'foo', 'service:foo');
  application.register('chrome:global', chrome, {instantiate: false, singleton: true});
  application.inject('adapter', 'chrome', 'chrome:global');
}

export default {
  name: 'chrome',
  initialize: initialize
};
