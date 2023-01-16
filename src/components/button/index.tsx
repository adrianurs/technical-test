import { Button, ButtonProps } from "@mui/material";
import { FC } from "react";

interface IProps {
    name: string
    label: string
    width?: number
}

const CustomButton: FC<IProps & ButtonProps>  = (props: IProps & ButtonProps) => {

    const { name, label, width = 170, ...otherProps } = props;

    return (<>
        <Button id={name} sx={{ width: width }} {...otherProps}>
                {label}
        </Button>
    </>);
}

export default CustomButton;