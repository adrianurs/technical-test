import { FC } from 'react';
import { Stack } from '@mui/material';
import { data } from './data';
import { fetchURL } from '../../../utils/api';
import { IFetchResponse, IMovie } from '../../../utils/interfaces';
import CustomButton from '../../button';


interface IProps {
    loading: boolean
    setMovies: (movies: IMovie[] | string) => void
    setLoading: (isLoading: boolean) => void
}

const ButtonsContainer: FC<IProps> = (props: IProps) => {

    const { loading, setLoading, setMovies } = props;

    const fetchMovies = async (urlPath: string) => {
        setLoading(true);
        const fetchData = await fetchURL(urlPath) as IFetchResponse;
        const moviesData = typeof fetchData === 'string' ? fetchData : fetchData?.movies;
        setMovies(moviesData);
        setLoading(false);
    };

    return (<>
        <Stack id={'fetch-buttons-container'} spacing={5} my={2} direction={{sm: 'column', md: 'row'}} justifyContent={'center'}>
            {data?.map(({ urlPath, ...props }) => <CustomButton {...props} key={props.name} variant={'contained'} onClick={() => fetchMovies(urlPath)} disabled={loading} />)}
        </Stack>
    </>);
};

export default ButtonsContainer;
