angular.module('starter.controllers', [])

.controller('AdviserCtrl', function($scope) {})

.controller('CalculatorCtrl', function($scope) {
  $scope.post = {
    age: '',
    salary: '',
    retirement: ''
  };

  var age = $scope.age;
  var salary = $scope.salary;
  var retirement = $scope.retirement;
  var goalAge = 35;
  var timeToGoal = 17;
  var retirementGoal;
  var retirementDiff;
  var percentAge;
  var percent;
  var post = $scope.post;



  $scope.calculate = function($scope) {
   percentAge = timeToGoal - (goalAge - age);
   percent = Math.round(percentAge/timeToGoal);
   retirementGoal = Math.round(percent * salary);
   post = {
      age: '',
      salary: '',
      retirement: ''
    };
    goalIsMet();
  };

  var goalIsMet = function() {
    if (retirementGoal >= retirement) {
      $state.go(calculator-congratsDetail);
      // sysout - you are retirementDiff over your goal! Great Job!
    } else {
      $state.go(calculator-screwUpDetail);
      // sysout - you are retirementDiff under your goal! Great Job!
    }
  };



})

.controller('CongratsCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ScrewUpCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('TermsCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ResourcesCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
