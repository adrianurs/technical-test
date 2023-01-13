import { Button } from "@mui/material";
import { FC, MouseEvent } from "react";
import { useStyles } from "./index.styles";
interface IProps {
    name: string
    label: string
    handleClick: (e: MouseEvent<HTMLElement>) => void
    variant?: 'contained' | 'outlined'
    disabled?: boolean
}

const MyButton: FC<IProps> = (props: IProps) => {

    const { name, label, variant = 'contained', handleClick, disabled = false } = props;
    const styles = useStyles();

    return (<>
        <Button id={name} variant={variant} onClick={handleClick} disabled={disabled} className={styles.buttonStyle}>
                {label}
        </Button>
    </>);
}

export default MyButton;