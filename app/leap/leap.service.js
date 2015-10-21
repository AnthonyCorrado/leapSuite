(function() {
    'use strict';

  angular
    .module('leapSuiteApp.leap')
    .factory('LeapService', LeapService);

    LeapService.$inject = ['$rootScope'];

    function LeapService($rootScope) {

      var service = {
          startLeapFrames: startLeapFrames
      };
      return service;

      function startLeapFrames() {
        Leap.loop({enableGestures: true}, function(frame) {
          var circle,
            pointable,
            direction,
            normal;
          frame.hands.forEach(function(hand, index) {   
            console.log(hand.palmPosition[0]); 
            var actionItem = '';
            // $scope.coordX = colorChange(hand.palmPosition[0]);
            // $scope.coordY = hand.palmPosition[1];
            // $scope.coordZ = opacity(hand.palmPosition[2]);
            if (hand.palmPosition[0] > 100) {
              console.log('OTHER');
              actionItem = 3;
            } else if (hand.palmPosition[0] > 0 && hand.palmPosition[0] < 100) {
              console.log('SLACK');
              actionItem = 2;
            } else if (hand.palmPosition[0] > -100 && hand.palmPosition[0] < 0) {
              console.log('EMAIL');
              actionItem = 1;
            } else if (hand.palmPosition[0] < -100) {
              console.log('TEXT');
              actionItem = 0;
            }
            $rootScope.actionItem = actionItem;
            $rootScope.leapCoordsX = hand.palmPosition[0];
            $rootScope.$apply();
          });
          if (frame.valid && frame.gestures.length > 0) {
            frame.gestures.forEach(function(gesture) {
              console.log('gesture type', gesture.type);
              $rootScope.leapGesture = gesture.type;
              $rootScope.$apply();
              if(gesture.type == "circle"){

                var circleProgress = gesture.progress;
                var completeCircles = Math.floor(circleProgress);
                console.log('circleProg', completeCircles);
              }
            })
          }
        });
        function completedCircle() {
          console.log();
        }
      };
    }
})();