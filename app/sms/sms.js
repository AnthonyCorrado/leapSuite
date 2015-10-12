(function() {
    'use strict';

  angular
    .module('leapSuiteApp.sms')
    .controller('Sms', Sms);

    Sms.$inject = ['SmsService'];

    function Sms() {
      var vm = this;
    }
})();