import { Container, Divider, Typography } from "@mui/material";
import { FC, useState } from "react"
import ButtonsContainer from "../../components/container/buttons-container";
import { IMovie } from "../../utils/interfaces";
import MoviesContainer from "../../components/container/movies-container";

const Main: FC = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<IMovie[] | string>([]);

    return (<>
        <Container fixed>
            <Typography variant="h4" my={2}>Matrix series</Typography>
            <Divider/>
            <ButtonsContainer loading={loading} setLoading={setLoading} setMovies={setMovies} />
            <MoviesContainer movies={movies} loading={loading} />
        </Container>
    </>);
}

export default Main;
