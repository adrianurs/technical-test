interface IDataItem {
    name: string,
    label: string,
    api: string
}

export const data: IDataItem[] = [
    {
        name: 'matrix',
        label: 'Matrix',
        api: 'http://www.omdbapi.com/?s=Matrix&apikey=720c3666'
    },
    {
        name: 'matrix-reloaded',
        label: 'Reloaded',
        api: 'http://www.omdbapi.com/?s=Matrix%20Reloaded&apikey=720c3666'
    },
    {
        name: 'matrix-revolution',
        label: 'Revolution',
        api: 'http://www.omdbapi.com/?s=Matrix%20Revolutions&apikey=720c3666' 
    }
] 