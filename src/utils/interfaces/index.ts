export interface IPoster {
    Poster: string
    _id: string
}
export interface IMovie {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster?: IPoster
}

export interface IFetchResponse {
    movies: IMovie[],
}

export interface IFilter {
    title?: 'A-Z' | 'Z-A'
    year?: 'increase' | 'decrease'
    type: 'game' | 'movie' | 'all'
}