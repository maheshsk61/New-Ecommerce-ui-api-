import { Button } from "@mui/material";
import { IButtons } from "../../../interface";
const Buttons: React.FC<IButtons> = ({
  value,
  onClick,
  backgroundColor,
}): JSX.Element => {
  
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{ backgroundColor: backgroundColor }}
    >
      {value}
    </Button>
  );
};
export default Buttons;
