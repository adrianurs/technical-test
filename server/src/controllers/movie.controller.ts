import { Request, Response, NextFunction } from "express";
import axios from 'axios';
import Movie from "../models/movie.model";
import IMovie from "../interfaces/movie.interface";
import IPoster from "../interfaces/poster.interface";
import Poster from '../models/poster.model';
import mongoose from "mongoose";

const fetchMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search } = req.params;
        const fetchURL = `http://www.omdbapi.com/?s=${search}&apikey=720c3666`;
        const redirectURL = `http://127.0.0.1:5050/technical-test/api/tests/database-movies/${search}`;

        await axios.get(fetchURL)
            .then(async (response) => {
                const movies: Array<IMovie> = response.data.Search;
                const moviesLength = movies.length;

                const notSavedMovies: Array<IMovie> = new Array();

                for (let index = 0; index < moviesLength; index++) {
                    const movieSaved = await Movie.findOne({imdbID: movies[index].imdbID});

                    if (!movieSaved) {
                        notSavedMovies.push(movies[index]);
                    }
                }

                const notSavedMoviesLength = notSavedMovies.length;

                for (let index = 0; index < notSavedMoviesLength; index++) {
                    if (String(notSavedMovies[index].Poster) !== 'N/A') {
                        const newPoster: IPoster = new Poster ({
                            _id: new mongoose.Types.ObjectId(),
                            Poster: notSavedMovies[index].Poster
                        })
    
                        await newPoster.save()
                            .then(async (poster: IPoster) => {
                                const newMovie: IMovie = new Movie ({
                                    _id: new mongoose.Types.ObjectId(),
                                    Title: notSavedMovies[index].Title,
                                    Year: notSavedMovies[index].Year,
                                    imdbID: notSavedMovies[index].imdbID,
                                    Type: notSavedMovies[index].Type,
                                    Poster: poster._id
                                })
    
                                await newMovie.save()
                                    .catch((err) => {
                                        return res.status(500).json({
                                            error: 'Saving movie failed. ' + err
                                        })
                                    })
                            })
                            .catch((err) => {
                                return res.status(500).json({
                                    error: 'Saving poster failed. ' + err
                                })
                            })
                    } else {
                        const newMovie: IMovie = new Movie ({
                            _id: new mongoose.Types.ObjectId(),
                            Title: notSavedMovies[index].Title,
                            Year: notSavedMovies[index].Year,
                            imdbID: notSavedMovies[index].imdbID,
                            Type: notSavedMovies[index].Type
                        })

                        await newMovie.save()
                            .catch((err) => {
                                return res.status(500).json({
                                    error: 'Saving movie failed. ' + err
                                })
                            })
                    }
                }
                return res.redirect(redirectURL);
            })
            .catch(err => {
                return res.status(500).json({
                    error: 'Axios GET failed. ' + err
                })
            })
    } catch (error) {
        return res.status(500).json({
            error: 'Fetching movies failed. ' + error
        })
    }
};

const searchDatabaseMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { search } = req.params;
        const moviesFound: Array<IMovie> = new Array();
        
        await Movie.find()
        .populate({path: 'Poster', select: 'Poster'})
        .then((databaseMovies: Array<IMovie>) => {
            databaseMovies.map((movie: IMovie) => {
                if (movie.Title.includes(search)) {
                    moviesFound.push(movie);
                }
            })
            return res.status(200).json({
                movies: moviesFound
            })
        })
        .catch((err) => {
            return res.status(500).json({
                error: 'Getting database movies failed. ' + err
            })
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Getting database movies failed. ' + error
        })
    }
};

const getDatabaseMovies = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Movie.find()
            .then((movies: Array<IMovie>) => {
                return res.status(200).json({
                    movies
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    err
                })
            })
    } catch (error) {
        return res.status(500).json({
            error: 'Getting database movies failed. ' + error
        })
    }
};

const getDatabasePosters = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Poster.find()
            .then((posters: Array<IPoster>) => {
                return res.status(200).json({
                    posters
                })
            })
            .catch((err) => {
                return res.status(500).json({
                    err
                })
            })
    } catch (error) {
        return res.status(500).json({
            error: 'Getting database posters failed. ' + error
        })
    }
};

const dropDatabase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const movies = await Movie.find();

        for (let index = 0; index < movies.length; index++) {
            await movies[index].deleteOne();
        }

        const posters = await Poster.find();

        for (let index = 0; index < posters.length; index++) {
            await posters[index].deleteOne();
        }

        return res.status(200).json({
            message: 'Database successfully dropped.'
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Database drop failed. ' + error
        })
    }
};

export default {
    fetchMovies,
    searchDatabaseMovies,
    getDatabaseMovies,
    getDatabasePosters,
    dropDatabase
};
