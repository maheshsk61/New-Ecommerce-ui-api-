import { Button } from "@mui/material";
import { IButtons } from "../../../interface";
const Buttons: React.FC<IButtons> = ({
  value,
  onClick,
  backgroundColor,
  sx,
  isDisabled,
}): JSX.Element => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{ backgroundColor: backgroundColor, ...sx }}
      disabled={isDisabled}
    >
      {value}
    </Button>
  );
};
export default Buttons;
