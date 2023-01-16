import { FC } from "react";
import { IFilter, alphaSort, typeFilter, yearSort } from "../../../../utils/interfaces";
import { Box, Toolbar, Typography, useTheme } from "@mui/material";
import SelectMenu from "../../../select-menu";
import { useStyles } from "./index.styles";
import { filterOptions } from "../../../../utils/costants";

export interface IProps {
    filtersSelected: IFilter;
    setFilterSelected: (filterObject: IFilter) => void;
    numberOfItems: number;
}

const FilterBar: FC<IProps> = (props: IProps) => {
    const theme = useTheme();
    const styles = useStyles();
    const { filtersSelected, setFilterSelected, numberOfItems } = props;

    const handleSelectSortByAlpha = (el: string) => {
        const newFil = el as alphaSort;
        setFilterSelected({ type: filtersSelected?.type, titleSort: newFil });
    };

    const handleSelectSortByYear = (el: string) => {
        const newFil = el as yearSort;
        setFilterSelected({ type: filtersSelected?.type, yearSort: newFil });
    };

    const handleSelectSortByType = (el: string) => {
        const newFil = el as typeFilter;
        setFilterSelected({
            type: newFil,
            yearSort: filtersSelected?.yearSort,
            titleSort: filtersSelected?.titleSort,
        });
    };

    return (
        <>
            <Toolbar
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    boxShadow: theme.shadows[3],
                    borderRadius: theme.shape.borderRadius,
                }}
                variant="dense"
                className={styles.toolbarStyle}
            >
                <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <Typography color={theme.palette.common.white}>
                        Filter options:
                    </Typography>
                    <SelectMenu
                        name={"sort-by-alpha"}
                        label={"by alpha"}
                        current={filtersSelected?.titleSort || "----"}
                        setCurrent={handleSelectSortByAlpha}
                        menuItems={[filterOptions.az, filterOptions.za]}
                    />
                    <SelectMenu
                        name={"sort-by-year"}
                        label={"by year"}
                        current={filtersSelected?.yearSort || "----------"}
                        setCurrent={handleSelectSortByYear}
                        menuItems={[filterOptions.increase, filterOptions.decrease]}
                    />
                    <SelectMenu
                        name={"sort-by-type"}
                        label={"by type"}
                        current={filtersSelected?.type}
                        setCurrent={handleSelectSortByType}
                        menuItems={[filterOptions.all, filterOptions.movie, filterOptions.game]}
                    />
                </Box>
                <Typography color={theme.palette.common.white}>
                    {numberOfItems} items
                </Typography>
            </Toolbar>
        </>
    );
};

export default FilterBar;
