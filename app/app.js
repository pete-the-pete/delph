import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

import ChromeBridge from "./chrome_bridge";

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver
});

App.initializer({
  name: 'chrome-bridge',

  initialize: function() {
    new ChromeBridge();
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
