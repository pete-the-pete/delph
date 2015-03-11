import Ember from 'ember';

var extensionId = 'miebiodaenmgcmahbbinmekgigoceofc';

export default Ember.Object.extend(Ember.Evented, {

  listenToPort: function(port) {
    port.addEventListener('message', function(event) {
      chrome.extension.sendMessage(extensionId, event.data);
    });

    function onMessageListener(message) {
      if (message.from === 'devtools') {
        port.postMessage(message);
      }
    }
    chrome.extension.onMessageExternal.addListener(onMessageListener);

    port.start();
    chrome.extension.sendMessage(extensionId, {
      from: 'external',
      type: 'register',
      id: chrome.runtime.id
    });
  },

  init: function() {
    var self = this;
    window.addEventListener('message', function(event) {
      if (event.data === 'debugger-client') {
        var port = event.ports[0];
        self.listenToPort(port);
      } else if (event.data && event.data.type) {
        chrome.extension.sendMessage(extensionId, event.data);
      }
    });



    // let ember-debug know that content script has executed
    document.documentElement.dataset.emberExtension = 1;


    // clear a possible previous Ember icon
    chrome.extension.sendMessage(extensionId, { type: 'resetEmberIcon' });

    // inject JS into the page to check for an app on domready
    var libraries = window.Ember && window.Ember.libraries;
    if (libraries) {
      // Ember has changed where the array of libraries is located.
      // In older versions, `Ember.libraries` was the array itself,
      // but now it's found under _registry.
      if (libraries._registry) {
        libraries = libraries._registry;
      }

      var versions = Array.prototype.slice.call(libraries, 0);
      window.setTimeout(function() {
        window.postMessage({
          type: 'emberVersion',
          versions: versions,
          extension: 'happyhappyjoyjoy'
        }, '*');
      }, 500);
    }


    var iframes = document.getElementsByTagName('iframe');
    var urls = [];
    for (var i = 0, l = iframes.length; i < l; i ++) {
      urls.push(iframes[i].src);
    }

    // FIXME
    setTimeout(function() {
      chrome.extension.sendMessage(extensionId, {type: 'iframes', urls: urls});
    }, 500);

  }

});
