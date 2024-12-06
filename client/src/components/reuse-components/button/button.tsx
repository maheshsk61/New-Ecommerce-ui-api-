import { Button } from "@mui/material";
import { IButtons } from "../../../interface";
const Buttons: React.FC<IButtons> = ({ value }): JSX.Element => {
  return <Button variant="contained">{value}</Button>;
};
export default Buttons;
