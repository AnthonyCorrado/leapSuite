(function() {
    'use strict';

  angular
    .module('leapSuiteApp.leap')
    .factory('LeapService', LeapService);

    LeapService.$inject = ['$rootScope'];

    function LeapService($rootScope) {
      var rotationCounter = 24;
      var isLocked = false;
      var closedHandTimer = 0;
      var sendIsPrimed = false;
      $rootScope.rotationIndex = 1;
        

      var service = {
          startLeapFrames: startLeapFrames
      };
      return service;

      // fires up leap's tracking loop
      function startLeapFrames() {
        Leap.loop({enableGestures: true}, function(frame) {
          // throttle function calls
          if (frame.id % 3 === 0) {
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
          if (isLocked) {
            closedHandGesture(hand);
          }
        });
      }

      function closedHandGesture(hand) {
        // hand closed counter. After roughly 1/2 second the open hand to send gesture will be enabled
        if (hand.grabStrength == 1 && closedHandTimer < 25) {
          closedHandTimer++;
          $rootScope.$broadcast('primerCountChanged', {
              primerCounter: closedHandTimer
            });
          if (closedHandTimer >= 25) {
            sendIsPrimed = true;
          }
          // hand is open if grabStrength is 0
        } else if (hand.grabStrength === 0) {
          // if sendIsPrimed is active -> sends message. Otherwise, timer is reset.
          if (sendIsPrimed) {
            $rootScope.$broadcast('sendMessageTriggered', {
            });
            sendIsPrimed = false;
            isLocked = false;
          }
          closedHandTimer = 0;
          $rootScope.$broadcast('primerCountChanged', {
              primerCounter: closedHandTimer
            });
        }
      }

      function determineGesture (frame) {
        frame.gestures.forEach(function(gesture) {
          if (gesture.type == "circle") {
            circleGesture(frame, gesture);
          } else if (gesture.type == 'keyTap') {
            keyTapGesture(frame, gesture);
          } else if (gesture.type == 'swipe') {
            swipeGesture(frame, gesture);
          }
        });
      }

      // preconfigured leap gestures get accessed here
      function circleGesture (frame, gesture) {
        if (!isLocked) {
          determineCircleRotation(frame, gesture);
        }
      }

      function keyTapGesture (frame, gesture) {
      }

      function swipeGesture (frame, gesture) {
        var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
        if (isHorizontal) {
          if (gesture.direction[0] > 0) {
            swipedRight();
          } else {
            swipedLeft();
          }
        } else {
          if (gesture.direction[1] > 0) {
            swipedUp();
          } else {
            swipedDown(frame.id);
          }
        }
        console.log('Swipe has been triggered');
      }

      function swipedRight() {
        console.log('swiped right');
      }
      function swipedLeft() {
        console.log('swiped left');
      }
      function swipedUp() {
        console.log('swiped up');
      }
      function swipedDown(id) {
        $rootScope.$broadcast('swipeDownTriggered', {
        });
        isLocked = true;
      }
      // tracks X, Y, Z position of the hand/palm
      function palmPosition(hand, index) {
        if (!isLocked) {
          lateralTracking(hand.palmPosition[0]);
        }
        // console.log(hand);
      };
      
      // selects message action by hand position along the x axis
      function lateralTracking(xPosition) {
        var actionItem = '';

        if (xPosition > 100) {
          // console.log('OTHER');
          actionItem = 3;
        } else if (xPosition > 0 && xPosition < 100) {
          // console.log('SLACK');
          actionItem = 2;
        } else if (xPosition > -100 && xPosition < 0) {
          // console.log('EMAIL');
          actionItem = 1;
        } else if (xPosition < -100) {
          // console.log('TEXT');
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
          console.log('rotationalIndex', $rootScope.rotationIndex);
          $rootScope.$apply();
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