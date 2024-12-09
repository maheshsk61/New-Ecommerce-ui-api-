import { Dialog, DialogContent } from "@mui/material";
import { IDialogbox } from "../../../interface";
const Dialogs: React.FC<IDialogbox> = ({
  isOpen,
  isClose,
  image,
}): JSX.Element => {
  return (
    <Dialog open={isOpen} onClose={isClose}>
      <DialogContent>
        <img src={image} alt={image} width={500} />
      </DialogContent>
    </Dialog>
  );
};
export default Dialogs;
