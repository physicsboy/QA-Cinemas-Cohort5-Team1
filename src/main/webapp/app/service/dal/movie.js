"use strict";

(function () {

    angular.module("movieApp").service("movieDal", ["dal", MovieDal]);

    function MovieDal (dal) {

        this.getMovies = function () {
            return dal.http.GET("rest/movie/json");
        };

        this.getCurrentMovies = function () {
            return dal.http.GET("rest/movie/json/current");
        };

        this.getComingSoonMovies = function () {
            return dal.http.GET("rest/movie/json/soon");
        };

        this.getMoviesByTitle = function(title){
            return dal.http.GET("rest/movie/json/searchByTitle/"+title);
        };

        this.getMoviesByGenre = function(genre) {
            return dal.http.GET("rest/movie/json/searchByGenre/" + genre)
        };

        this.searchMovie = function(title){
            return dal.http.GET("rest/movie/json/searchMovies/"+title);
        };

        this.saveMovie = function (movieToSave) {
            return dal.http.POST("rest/movie/json", movieToSave);
        };

        this.saveMoviePoster = function (movieToSave) {
            return dal.http.POST_IMAGE("rest/movie/upload", movieToSave);
        };

        this.updateMovie = function (movieToUpdateId, movieToUpdate) {
            return dal.http.PUT("rest/movie/json/" + movieToUpdateId, movieToUpdate);
        };

        this.updateRating = function (movieToUpdateId, movieToUpdate) {
            return dal.http.PUT("rest/movie/json/rating/" + movieToUpdateId, movieToUpdate);
        };

        this.deleteMovie = function (movieToDeleteId) {
            return dal.http.DELETE("rest/movie/json/" + movieToDeleteId);
        };

        this.movieId = "Default"
        this.movieTitle = "Default";

    }
}());
