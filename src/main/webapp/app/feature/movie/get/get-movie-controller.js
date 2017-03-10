(function() {

    var GetMovieController =  function(movieDal) {
        var vm = this;

        function init() {
            movieDal.getMovies().then(function (results) {
                vm.movies  = results;
            }, function (error) {
                vm.error = true;
                vm.errorMessage = error;
            });
        }
        init();

        vm.replace = function(movie) {
            console.log("replacing modal values");
            $('#modalImg').attr('src', movie.posterUrl);
            $('#modalTitle').text(movie.title);
            $('#modalDescription').text(movie.description);
        };

    };

    angular.module('movieApp').controller('getMovieController', ['movieDal', GetMovieController]);
}());