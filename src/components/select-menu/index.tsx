import { Button, Menu, MenuItem, Typography, useTheme } from "@mui/material"
import { FC, useState } from "react"
import { ExpandMore } from "@mui/icons-material"

interface IProps {
    name: string
    label?: string
    current: string
    setCurrent: (item: string) => void
    menuItems: string[]
}

const SelectMenu: FC<IProps> = (props: IProps) => {
    
    const theme = useTheme();
    const { name, current, setCurrent, menuItems, label } = props;
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

    const handleClickSortByAlphaItem = (item: string) => {
        setCurrent(item);
        setMenuAnchor(null);
    };
    
    return (<>
        {!!label && <Typography mx={2} color={theme.palette.common.white}>
            {label}
        </Typography>}
        <Button id={`${name}-button`}
            onClick={(e) => setMenuAnchor(e.currentTarget)}
            variant='contained'
        >{current || '----'} <ExpandMore /></Button>
        <Menu id={`${name}-menu`}
            anchorEl={menuAnchor}
            open={!!menuAnchor}
            onClose={() => setMenuAnchor(null)}
        >
            {menuItems.map(el => <MenuItem key={el} onClick={() => handleClickSortByAlphaItem(el)}>
                {el}
            </MenuItem>
            )}
        </Menu>
    </>);
}

export default SelectMenu;