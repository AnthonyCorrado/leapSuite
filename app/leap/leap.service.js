(function() {
    'use strict';

  angular
    .module('leapSuiteApp.leap')
    .factory('LeapService', LeapService);

    LeapService.$inject = ['$rootScope'];

    function LeapService($rootScope) {
      var rotationCounter = 0;
      $rootScope.rotationIndex = 0;

      var service = {
          startLeapFrames: startLeapFrames
      };
      return service;

      // fires up leap's tracking loop
      function startLeapFrames() {
        // $rootScope.rotationIndex = 0;

        Leap.loop({enableGestures: true}, function(frame) {
          // throttle function calls
          if (frame.id % 2 === 0) {
            allCoordTracking(frame);
            if (frame.valid && frame.gestures.length > 0) {
              determineGesture(frame) ;
            }
          }
        });
      };

      // palm, hand, and finger tracking needs go here
      function allCoordTracking (frame) {
        frame.hands.forEach(function(hand, index) {
          palmPosition(hand, index);
        });
      }

      function determineGesture (frame) {
        frame.gestures.forEach(function(gesture) {
          if (gesture.type == "circle") {
            circleGesture(frame, gesture);
          }
          if (gesture.type == 'keyTap') {
            keyTapGesture(frame, gesture);
          }
        });
      }

      // preconfigured leap gestures get accessed here
      function circleGesture (frame, gesture) {
        determineCircleRotation(frame, gesture);
      }

      function keyTapGesture (frame, gesture) {
        determineCircleRotation(frame, gesture);
      }


      // tracks X, Y, Z position of the hand/palm
      function palmPosition(hand, index) {
        lateralTracking(hand.palmPosition[0]);
      };
      
      // selects message action by hand position along the x axis
      function lateralTracking(xPosition) {
        var actionItem = '';

        if (xPosition > 100) {
          console.log('OTHER');
          actionItem = 3;
        } else if (xPosition > 0 && xPosition < 100) {
          console.log('SLACK');
          actionItem = 2;
        } else if (xPosition > -100 && xPosition < 0) {
          console.log('EMAIL');
          actionItem = 1;
        } else if (xPosition < -100) {
          console.log('TEXT');
          actionItem = 0;
        }
        $rootScope.actionItem = actionItem;
        $rootScope.$apply();
      }

      function determineCircleRotation(frame, gesture) {
        var clockwise = true,
          circle = gesture,
          pointable,
          direction,
          normal;

        circle.pointable = frame.pointable(circle.pointableIds[0]);

        if(circle.state == 'start') {
          console.log('circle has started');
        } else if (circle.state == 'update') {
          direction = circle.pointable.direction;
          // Check if pointable exists
          if(direction) {
            normal = circle.normal;
            clockwise = Leap.vec3.dot(direction, normal) > 0;
            if(clockwise) {
              incrementRotationCount();
            } else {
              decrementRotationCount();
            }
          // adjust integer to set sensitivity of rotational selection
          $rootScope.rotationIndex = (Math.floor($rootScope.rotationIndex / 12));
          $rootScope.$apply();
          console.log('this is rootScope', $rootScope.rotationIndex);
          }
        }
      }

      function incrementRotationCount () {
        if (rotationCounter < 400) {
          rotationCounter++;
          $rootScope.rotationIndex = rotationCounter;
        }
      }

      function decrementRotationCount () {
        if (rotationCounter > 0) {
          rotationCounter--;
          $rootScope.rotationIndex = rotationCounter;
        }
      }

    };
})();