import { Button } from "@mui/material";
import { FC, MouseEvent } from "react";

interface IProps {
    name: string,
    label: string,
    handleClick: (e: MouseEvent<HTMLElement>) => void,
    variant?: 'contained' | 'outlined',
    disabled?: boolean
}

const MyButton: FC<IProps> = (props: IProps) => {

    const { name, label, variant = 'contained', handleClick, disabled = false } = props;

    return (<>
        <Button id={name} variant={variant} onClick={handleClick} sx={{minWidth: 170}} disabled={disabled}>
                {label}
        </Button>
    </>);
}

export default MyButton;