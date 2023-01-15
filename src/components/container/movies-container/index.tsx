import { FC, useMemo, useState } from "react";
import { IMovie } from "../../../utils/interfaces";
import { Box, CircularProgress, Slide, Typography } from "@mui/material";
import MovieCard from "../../cards/movie-card";
import { Masonry } from "@mui/lab";
import { IFilter } from "../../../utils/interfaces";
import FilterBar from "./filter-bar";

interface IProps {
    movies: IMovie[] | string;
    loading: boolean;
}

const MoviesContainer: FC<IProps> = (props: IProps) => {
    const { movies, loading } = props;

    const [filter, setFilter] = useState<IFilter>({
        title: "A-Z",
        type: "all",
    });
    const [numberOfItems, setNumberOfItems] = useState<number>(0);
    
    const sortBy = (sortFilter: string, current_item: IMovie, next_item: IMovie) => {
        
        const currentTitle = current_item.Title;
        const nextTitle = next_item.Title;
        const currentYear = +current_item.Year;
        const nextYear = +next_item.Year;  
        
        switch(sortFilter){
            case 'A-Z':
                return currentTitle < nextTitle
                ? -1
                : currentTitle > nextTitle
                ? 1
                : 0
            case 'Z-A':
                return currentTitle > nextTitle
                ? -1
                : currentTitle < nextTitle
                ? 1
                : 0
            case 'increase': 
                return currentYear < nextYear
                ? -1
                : currentYear > nextYear
                ? 1
                : 0
            case 'decrease':
                return currentYear > nextYear
                ? -1
                : currentYear < nextYear
                ? 1
                : 0
            default: 
                return 0;
        }
    }

    const moviesRendered = useMemo(() => {
        const tempMoviesArray =
            typeof movies === "string"
                ? movies
                : movies
                      .filter((el) =>
                          filter.type === "all"
                              ? true
                              : filter?.type === el?.Type
                      )
                      .sort((current_item, next_item) =>
                          filter.title === "A-Z"
                              ? sortBy('A-Z', current_item, next_item)
                              : filter.title === "Z-A"
                              ? sortBy('Z-A', current_item, next_item)
                              : filter.year === "increase"
                              ? sortBy('increase', current_item, next_item)
                              : filter.year === "decrease"
                              ? sortBy('decrease', current_item, next_item)
                              : 0
                      );
        setNumberOfItems(tempMoviesArray.length);
        return tempMoviesArray;
    }, [movies, filter]);

    return (
        <>
            <Box display={"flex-column"} alignItems={"center"} mt={2}>
                <FilterBar
                    filtersSelected={filter}
                    setFilterSelected={setFilter}
                    numberOfItems={numberOfItems}
                />
                {loading ? (
                    <CircularProgress />
                ) : typeof moviesRendered === "string" ? (
                    <Typography color={"red"}>{moviesRendered}</Typography>
                ) : !moviesRendered?.length ? (
                    "No movies fetched, please click one of the buttons above to fetch some"
                ) : (
                    <Slide in timeout={600} direction="up">
                        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
                            {moviesRendered?.map(
                                ({ Title, Poster, Year, Type, imdbID }) => (
                                    <MovieCard
                                        key={imdbID}
                                        title={Title}
                                        poster={Poster?.Poster || ""}
                                        year={Year}
                                        type={Type}
                                        id={imdbID}
                                    />
                                )
                            )}
                        </Masonry>
                    </Slide>
                )}
            </Box>
        </>
    );
};

export default MoviesContainer;
