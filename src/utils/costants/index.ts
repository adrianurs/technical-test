import { IFilterOptions } from "../interfaces";

//Use the below object to access any filter option to start using it

export const filterOptions: IFilterOptions = {
    //alphaSort options
    az: 'A-Z',
    za: 'Z-A',

    //yearSort options
    increase: 'INCREASE',
    decrease: 'DECREASE',

    //type filter options
    game: 'GAME',
    movie: 'MOVIE',
    all: 'ALL',
};
