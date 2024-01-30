import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

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

const Experience = ({ data, doctor, setDoctor, jobexperience }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const [Data, setData] = useState(
    {
      degree: "",
      university: "",
      startDate: "",
      endDate: "",
    },
  );
  const [Datas, setDatas] = useState({
    position: "",
    hospital: "",
    startDate: "",
    endDate: "",
  });

  
  const handleClose = () => setOpen(false);
  const handleSaveClose = () => setOpen(false);

  const handleAction = (actionType) => {
   console.log("hellooo")
          switch (actionType) {
            case "discard":
              setData({
                Degree: "",
                University: "",
                startDate: "",
                endDate: "",
              });
              handleClose();
              return;
            case "save":
              const newExperience = { ...Data };
              setDoctor((prev) => ({...prev, qualification :[...prev.qualification,newExperience]}));
  
              setData({
                Degree: "",
                University: "",
                startDate: "",
                endDate: "",
              });
              handleSaveClose();
              break;
            default:
              setData({
                Degree: "",
                University: "",
                startDate: "",
                endDate: "",
              });
              handleClose();
          }
        
      
          
  };

  const handleSubmission = (actionType)=>{

    switch (actionType) {
      case "discard":
        setDatas({
          position: "",
          hospital: "",
          startDate: "",
          endDate: "",
        });
        handleClose();
        return;
      case "save":
        const newExperiencee = { ...Datas };
        setDoctor((prev) => ({...prev,experience:[...prev.experience,newExperiencee]}));

        setDatas({
          position: "",
          hospital: "",
          startDate: "",
          endDate: "",
        });
        handleClose();
        return;
       ;
        
      default:
        handleClose();
    }
 
  }
  
  const handleDegreeChange = (e) => {
    setData({
      ...Data,
      Degree: e.target.value,
    });
  };

  const handleUniversityChange = (e) => {
    setData({
      ...Data,
      University: e.target.value,
    });
  };

  const handleStartDateChange = (e) => {
    setData({
      ...Data,
      startDate: e.target.value,
    });
  };

  const handleEndDateChange = (e) => {
    setData({
      ...Data,
      endDate: e.target.value,
    });
  };



  return (
    <div>
      <Button onClick={handleOpen} style={{ textTransform: "none" }}>
        {data}+
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {jobexperience ? (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h4"
            ></Typography>
            <TextField
              id="outlined-basic"
              label="Enter Position"
              variant="outlined"
              fullWidth
              value={Datas.position}
              onChange={(e)=>setDatas({...Datas, position:e.target.value})}
              sx={{ mt: 2 }}
            />
            <TextField
              id="outlined-basic"
              label="Enter Hospital"
              variant="outlined"
              fullWidth
              value={Datas.hospital}
              onChange={(e)=>setDatas({...Datas,hospital:e.target.value})}
              sx={{ mt: 2 }}
            />
            <TextField
              id="start-date"
              label="Start Date"
              type="date"
              variant="outlined"
              value={Datas.startDate}
              onChange={(e)=>setDatas({...Datas,startDate:e.target.value})}
              fullWidth
              sx={{ mt: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="end-date"
              label="End Date"
              type="date"
              variant="outlined"
              fullWidth
              value={Datas.endDate}
              onChange={(e)=>setDatas({...Datas,endDate:e.target.value})}
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
                className="py-2 px-2 bg-primaryColor min-w-[80px] font-semibold rounded-md"
              >
                Save
              </button>
            </div>
          </Box>
        ) : (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h4"
            ></Typography>
            <TextField
              id="outlined-basic"
              label="Enter Degree"
              variant="outlined"
              fullWidth
              value={Data.degree}
              onChange={handleDegreeChange}
              sx={{ mt: 2 }}
            />
            <TextField
              id="outlined-basic"
              label="Enter University"
              variant="outlined"
              fullWidth
              value={Data.university}
              onChange={handleUniversityChange}
              sx={{ mt: 2 }}
            />
            <TextField
              id="start-date"
              label="Start Date"
              type="date"
              variant="outlined"
              value={Data.startDate}
              onChange={handleStartDateChange}
              fullWidth
              sx={{ mt: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="end-date"
              label="End Date"
              type="date"
              variant="outlined"
              fullWidth
              value={Data.endDate}
              onChange={handleEndDateChange}
              sx={{ mt: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <div className="flex flex-row mt-7 gap-[140px]">
              <button
                onClick={() => handleAction("discard")}
                className="py-2 px-2 max-w-[80px] bg-red-600 font-semibold rounded-md"
              >
                Discard
              </button>
              <button
                onClick={() => handleAction("save")}
                className="py-2 px-2 bg-primaryColor min-w-[80px] font-semibold rounded-md"
              >
                Save
              </button>
            </div>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default Experience;
