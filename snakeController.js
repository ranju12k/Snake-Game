angular.module('snakeGame').controller('snakeController', ['$scope', 'snakeService', function($scope, snakeService) {
    $scope.score = 0;

    $scope.startGame = function() {
        snakeService.startGame();
        $scope.score = snakeService.getScore();
    };

    $scope.resetGame = function() {
        snakeService.resetGame();
        $scope.score = 0;
    };

    $scope.$watch(function() {
        return snakeService.getScore();
    }, function(newScore) {
        $scope.score = newScore;
    });
}]);
