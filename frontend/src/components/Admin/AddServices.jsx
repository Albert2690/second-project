import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useAddServiceMutation } from "../../slices/adminApislice";
import { toast } from "react-toastify";

function AddServices() {
  const [AddServiceApi, { isLoading }] = useAddServiceMutation();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };
  const [data, setData] = useState({
    service: "",
    description: "",
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSaveClose = () => setOpen(false);

  const handleSubmission = async (actionType) => {
    switch (actionType) {
      case "discard":
        setData({
          service: "",
          description: "",
        });
        handleClose();
        return;
      case "save":
        if (data.description === "") {
          return toast.error("Enter Description");
        } else if (data.service == "") {
          return toast.error("Enter Services name");
        }

        try {
          const response = await AddServiceApi({ data });
          if (response.data.success) {
            window.location.reload();
          } else {
            return toast.error("erorr Occured");
          }
        } catch (error) {
          toast.error("Server Error");
        }

        handleClose();
        setData({
          service: "",
          description: "",
        });
        return;

      default:
        handleClose();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Services +</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h4"
          ></Typography>
          <TextField
            id="outlined-basic"
            label="Enter Service"
            variant="outlined"
            fullWidth
            value={data.service}
            onChange={(e) => setData({ ...data, service: e.target.value })}
            sx={{ mt: 2 }}
          />

          <TextField
            id="end-date"
            label="Description"
            type="text"
            variant="outlined"
            multiline
            rows={4}
            placeholder="Enter Service Description"
            fullWidth
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            sx={{ mt: 2 }}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <div className="flex flex-row mt-7 gap-[140px]">
            <button
              onClick={() => handleSubmission("discard")}
              className="py-2 px-2 max-w-[80px] bg-red-600 font-semibold rounded-md"
            >
              Discard
            </button>
            <button
              onClick={() => handleSubmission("save")}
              className="py-2 px-2 bg-primaryColor min-w-[80px] text-white font-semibold rounded-md"
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AddServices;
