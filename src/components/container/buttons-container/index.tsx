import { FC } from 'react';
import { Stack } from '@mui/material';
import MyButton from '../../button';
import { data } from './data';
import { fetchURL } from '../../../utils/api';
import { IFetchResponse, IMovie } from '../../../utils/interfaces';


interface IProps {
    loading: boolean
    setMovies: (movies: IMovie[] | string) => void,
    setLoading: (isLoading: boolean) => void,
}

const ButtonsContainer: FC<IProps> = (props: IProps) => {

    const { loading, setLoading, setMovies } = props;

    const fetchMovies = async (api: string) => {
        setLoading(true);
        const fetchData = await fetchURL(api) as IFetchResponse;
        const moviesData = typeof fetchData === 'string' ? fetchData : fetchData?.Search;
        setMovies(moviesData);
        setLoading(false);
    }

    return (<>
        <Stack id={'fetch-buttons-container'} spacing={5} my={2} direction={{sm: 'column', md: 'row'}} justifyContent={'center'}>
            {data?.map(({ api, ...props }) => <MyButton {...props} key={props.name} handleClick={() => fetchMovies(api)} disabled={loading} />)}
        </Stack>
    </>);
};

export default ButtonsContainer;
