(function() {

    var UpdateMovieController =  function($state, movieDal) {
        var vm = this;

        vm.updateMovie = function(movieToUpdateId, movieToUpdate) {

            movieDal.updateMovie(movieToUpdateId, movieToUpdate).then(function (results) {
                vm.movieAddMessage  = results;

                $state.go('getmovie');
            }, function (error) {
                vm.error = true;
                vm.errorMessage = error;
            });
        };
    };

    angular.module('movieApp').controller('updateMovieController', ['$state','movieDal',UpdateMovieController]);
}());