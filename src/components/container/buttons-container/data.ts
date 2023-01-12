interface IDataItem {
    name: string,
    label: string,
    api: string
}

export const data: IDataItem[] = [
    {
        name: 'matrix',
        label: 'Matrix',
        api: 'Matrix'
    },
    {
        name: 'matrix-reloaded',
        label: 'Reloaded',
        api: 'Matrix%20Reloaded'
    },
    {
        name: 'matrix-revolution',
        label: 'Revolution',
        api: 'Matrix%20Revolutions' 
    }
] 