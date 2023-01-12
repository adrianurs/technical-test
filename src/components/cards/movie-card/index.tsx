import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { FC } from "react";
import placeholder from '../../../assets/images/film-poster-placeholder.png';

interface IProps {
    poster: string
    title: string
    type: string
    year: string
    id: string
}

const MovieCard: FC<IProps> = (props: IProps) => {

    const { poster, title, type, year, id } = props;

    return (<>
        <Card>
            <CardMedia image={poster !== 'N/A' ? poster : placeholder} title={title} sx={{ minHeight: 350 }} />
            <CardContent>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="subtitle1">{type}</Typography>
                <Typography variant="subtitle1">{year}</Typography>
            </CardContent>
            <CardActions>
                <Button target={'_blank'} href={`https://www.imdb.com/title/${id}`}>
                    Show in IMDB
                </Button>
            </CardActions>
        </Card>
    </>)
}

export default MovieCard