(function() {
  'use strict'

  angular.module('leapSuiteApp', [

    'ui.router',
    'ngTouch',
    'angular-carousel',

    // features
    'leapSuiteApp.layout',
    'leapSuiteApp.leap',
    'leapSuiteApp.lighting',
    'leapSuiteApp.contacts',
    'leapSuiteApp.sms'
  ]);

})();