export interface IMovie {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
}

export interface IFetchResponse {
    Search: IMovie[],
    totalResults: string,
    Response: "True" | "False"
}

export interface IFilter {
    title?: 'A-Z' | 'Z-A'
    year?: 'increase' | 'decrease'
    type: 'game' | 'movie' | 'all'
}