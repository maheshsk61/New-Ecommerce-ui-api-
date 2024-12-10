import { Button } from "@mui/material";
import { IButtons } from "../../../interface";
const Buttons: React.FC<IButtons> = ({
  value,
  onClick,
  backgroundColor,
  sx,
  isDisabled,
  type = "button",
}): JSX.Element => {
  
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{ backgroundColor: backgroundColor, ...sx }}
      disabled={isDisabled}
      type={type}
    >
      {value}
    </Button>
  );
};
export default Buttons;
