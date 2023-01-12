import { FC, useMemo, useState } from "react";
import { IMovie } from "../../../utils/interfaces"
import { Box, CircularProgress, Slide, Typography } from "@mui/material";
import MovieCard from "../../cards/movie-card";
import { Masonry } from '@mui/lab';
import { IFilter } from "../../../utils/interfaces";
import FilterBar from "./filter-bar";

interface IProps {
    movies: IMovie[] | string
    loading: boolean
}

const MoviesContainer: FC<IProps> = (props: IProps) => {

    const { movies, loading } = props;

    const [filter, setFilter] = useState<IFilter>({ title: 'A-Z', type: 'all' })
    const [numberOfItems, setNumberOfItems] = useState<number>(0); 

    const moviesRendered = useMemo(() => {
        const tempMoviesArray = typeof movies === 'string'
            ? movies
            : movies.filter(el => filter.type === 'all' ? true : filter?.type === el?.Type)
                .sort((current_item, next_item) => filter.title === 'A-Z'
                    ? (current_item.Title < next_item.Title ? -1
                        : current_item.Title > next_item.Title ? 1 : 0)
                    : filter.title === 'Z-A'
                    ? (current_item.Title > next_item.Title ? -1
                        : current_item.Title < next_item.Title ? 1 : 0)
                        : filter.year === 'increase'
                    ? (+current_item.Year < +next_item.Year ? -1
                        : +current_item.Year > +next_item.Year ? 1 : 0)
                        : filter.year === 'decrease'
                    ? (+current_item.Year > +next_item.Year ? -1
                        : +current_item.Year < +next_item.Year ? 1 : 0)
                                : 0
            );
        setNumberOfItems(tempMoviesArray.length);
        return tempMoviesArray;
    }, [movies, filter])

    return (<>
        <Box display={'flex-column'} alignItems={'center'} mt={2}>
            <FilterBar filtersSelected={filter} setFilterSelected={setFilter} numberOfItems={numberOfItems} />
            {
                loading ? <CircularProgress /> : typeof moviesRendered === 'string'
                    ? <Typography>{moviesRendered}</Typography>
                    : <Slide in timeout={600} direction="up">
                        <Box style={{width: '100%', height:'100%'}}>
                            <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
                                {moviesRendered?.map(({ Title, Poster, Year, Type, imdbID }) => <MovieCard key={imdbID} title={Title} poster={Poster} year={Year} type={Type} id={imdbID} />)}
                            </Masonry>
                        </Box>
                    </Slide>
            }
        </Box>
    </>)
}

export default MoviesContainer;