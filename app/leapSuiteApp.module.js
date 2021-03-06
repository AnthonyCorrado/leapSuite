(function() {
  'use strict'

  angular.module('leapSuiteApp', [

    'ui.router',
    'ngTouch',
    'angular-carousel',
    'ngAnimate',

    // features
    'leapSuiteApp.layout',
    'leapSuiteApp.dashboard',
    'leapSuiteApp.directives',
    'leapSuiteApp.actions',
    'leapSuiteApp.leap',
    'leapSuiteApp.lighting',
    'leapSuiteApp.contacts',
    'leapSuiteApp.sms',
    'leapSuiteApp.speech',
    'leapSuiteApp.email',
    'leapSuiteApp.rtm'
  ]);

})();