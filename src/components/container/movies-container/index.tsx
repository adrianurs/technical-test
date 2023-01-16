import { FC, useMemo, useState } from "react";
import { IMovie, alphaSort, yearSort } from "../../../utils/interfaces";
import { Box, CircularProgress, Slide, Typography } from "@mui/material";
import MovieCard from "../../cards/movie-card";
import { Masonry } from "@mui/lab";
import { IFilter } from "../../../utils/interfaces";
import FilterBar from "./filter-bar";
import { filterOptions } from "../../../utils/costants";
interface IProps {
    movies: IMovie[] | string;
    loading: boolean;
}

const MoviesContainer: FC<IProps> = (props: IProps) => {
    
    const { movies, loading } = props;
    const [filter, setFilter] = useState<IFilter>({
        titleSort: filterOptions.az,
        type: filterOptions.all,
    });
    const [numberOfItems, setNumberOfItems] = useState<number>(0);
    
    const sortBy = (sortFilter: alphaSort | yearSort, current_item: IMovie, next_item: IMovie) => {
        
        const currentTitle = current_item.Title;
        const nextTitle = next_item.Title;
        const currentYear = +current_item.Year;
        const nextYear = +next_item.Year;  
        
        switch(sortFilter){
            case filterOptions.az:
                return currentTitle < nextTitle
                ? -1
                : currentTitle > nextTitle
                ? 1
                : 0
            case filterOptions.za:
                return currentTitle > nextTitle
                ? -1
                : currentTitle < nextTitle
                ? 1
                : 0
            case filterOptions.increase: 
                return currentYear < nextYear
                ? -1
                : currentYear > nextYear
                ? 1
                : 0
            case filterOptions.decrease:
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
                          filter.type === filterOptions.all
                              ? true
                              : filter?.type === el?.Type?.toUpperCase()
                      )
                      .sort((current_item, next_item) =>
                          sortBy(filter?.titleSort || filter?.yearSort || filterOptions.az, current_item, next_item)
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
