(function() {
  'use strict'

  angular.module('leapSuiteApp', [

    'ui.router',

    // features
    'leapSuiteApp.layout',
    'leapSuiteApp.leap',
    'leapSuiteApp.lighting',
    'leapSuiteApp.contacts',
    'leapSuiteApp.sms'
  ]);

})();