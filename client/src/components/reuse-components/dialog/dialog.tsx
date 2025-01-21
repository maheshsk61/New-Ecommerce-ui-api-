import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { IDialogbox } from "../../../interface";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Dialogs: React.FC<IDialogbox> = ({
  isOpen,
  isClose,
  image,
  orderText,
  text,
}): JSX.Element => {
  return (
    <Dialog open={isOpen} onClose={isClose}>
      <DialogTitle>
        {orderText && (
          <Avatar sx={{ margin: "0 auto" }}>
            <CheckCircleIcon
              sx={{ fontSize: "2em", bgcolor: "var(--green-color)" }}
            />
          </Avatar>
        )}
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {orderText}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <img src={image} alt={image} width={500} />
        <Typography variant="body1" component="p" sx={{ textAlign: "center" }}>
          {text}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};
export default Dialogs;
