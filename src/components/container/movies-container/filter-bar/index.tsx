import { FC } from 'react';
import { IFilter } from '../../../../utils/interfaces';
import {  Box, Toolbar, Typography, useTheme } from '@mui/material';
import SelectMenu from '../../../select-menu';

export interface IProps {
    filtersSelected: IFilter
    setFilterSelected: (filterObject: IFilter) => void
    numberOfItems: number
}

const FilterBar: FC<IProps> = (props: IProps) => {

    const theme = useTheme();

    const { filtersSelected, setFilterSelected, numberOfItems } = props;

    const handleSelectSortByAlpha = (el: string) => {
        const newFil = el as 'A-Z' | 'Z-A'
        setFilterSelected({ type: filtersSelected?.type, title: newFil })
    }

    const handleSelectSortByYear = (el: string) => {
        const newFil = el as 'increase' | 'decrease'
        setFilterSelected({ type: filtersSelected?.type, year: newFil })
    }
    
    const handleSelectSortByType = (el: string) => {
        const newFil = el as 'all' | 'movie' | 'game'
        setFilterSelected({ type: newFil, year: filtersSelected?.year, title: filtersSelected?.title })
    }
    
    return (<>
        <Toolbar sx={{
            backgroundColor: theme.palette.primary.main,
            boxShadow: theme.shadows[3],
            borderRadius: theme.shape.borderRadius,
            marginBottom: 3,
            justifyContent: 'space-between'
        }} variant='dense'>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography color={theme.palette.common.white}>
                    Filter options:
                </Typography>
                <SelectMenu name={'sort-by-alpha'} label={'by alpha'}
                    current={filtersSelected?.title || '----'}
                    setCurrent={handleSelectSortByAlpha}
                    menuItems={['A-Z', 'Z-A']}
                />
                <SelectMenu name={'sort-by-year'} label={'by year'}
                    current={filtersSelected?.year || '----------'}
                    setCurrent={handleSelectSortByYear}
                    menuItems={['increase', 'decrease']}
                />
                <SelectMenu name={'sort-by-type'} label={'by type'}
                    current={filtersSelected?.type}
                    setCurrent={handleSelectSortByType}
                    menuItems={['all', 'movie', 'game']}
                />
            </Box>
            <Typography color={theme.palette.common.white}>{numberOfItems} items</Typography>
        </Toolbar>
    </>)
};

export default FilterBar;
