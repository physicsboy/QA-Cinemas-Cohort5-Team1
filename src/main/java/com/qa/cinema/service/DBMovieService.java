package com.qa.cinema.service;

import java.util.Collection;

import javax.ejb.Stateless;
import javax.enterprise.inject.Default;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.qa.cinema.persistence.Movie;
import com.qa.cinema.util.JSONUtil;

@Stateless
@Default
public class DBMovieService implements MovieService {

	@PersistenceContext(unitName = "primary")
	private EntityManager em;

	@Inject
	private JSONUtil util;

	@Override
	public String listAllMovies() {
		Query query = em.createQuery("SELECT m FROM Movie m");
		Collection<Movie> movies = (Collection<Movie>) query.getResultList();
		return util.getJSONForObject(movies);
	}

	@Override
	public String createNewMovie(String movie) {
		Movie newMovie = util.getObjectForJSON(movie, Movie.class);
		em.persist(newMovie);
		return "{\"message\": \"Movie successfully added\"}";
	}

	
	@Override
	public String updateMovie(Long movieId, String movie) {
		Movie updateMovie = util.getObjectForJSON(movie, Movie.class);
		Movie movieInDB = findMovie(movieId);
		if (movieInDB != null) {
			movieInDB = updateMovie;
			em.merge(movieInDB);
			return "{\"message\": \"Movie successfully updated\"}";
		}
		else {
			return "{\"message\": \"Updating movie failed\"}";
		}
		
	}


	@Override
	public String deleteMovie(Long movieId) {
		Movie movieInDB = findMovie(movieId);
		if (movieInDB != null) {
			em.remove(movieInDB);
			return "{\"message\": \"Movie successfully deleted\"}";
		}
		else {
			return "{\"message\": \"Deleting movie failed\"}";
		}
		
	}

	private Movie findMovie(Long id) {
		return em.find(Movie.class, id);
	}

	@Override
	public String searchByTitle(String searchedTitle) {
		Query query = em.createQuery("SELECT m FROM Movie m WHERE m.title = :title").setParameter("title" , searchedTitle);
		Collection<Movie> movies = (Collection<Movie>) query.getResultList();
		return util.getJSONForObject(movies);
	}

}