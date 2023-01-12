import express from 'express';
import movieController from '../controllers/movie.controller';
import { Params, validateParams } from '../functions/validateParams';

const testRoutes = express.Router();

testRoutes.get('/movies/:search', validateParams(Params.movies.fetchMovies), movieController.fetchMovies);
testRoutes.get('/database-movies/:search', movieController.searchDatabaseMovies);
testRoutes.get('/database-movies', movieController.getDatabaseMovies);
testRoutes.get('/database-posters', movieController.getDatabasePosters);
testRoutes.delete('/database', movieController.dropDatabase);

export default testRoutes;
