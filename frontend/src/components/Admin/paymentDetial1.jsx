import React, { useState,useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Box, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300, // Adjust the width as needed
  bgcolor: '#fff', // Set the background color to white
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
};

function PaymentDetial1(booking,doctor) {
    const { doctorInfo } = useSelector((state) => state.doctor);
    const { doctorJwt, doctorId,name } = doctorInfo.result;
  const [open, setOpen] = useState(false);
  const [value,setValue] = useState('')
 const navigate = useNavigate()
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDiscard = () => {
    // Implement discard logic
    handleClose();
  };

  const handleJoinRoom = useCallback(() => {
    // Implement save logic
    navigate(`/room/${value}/${doctorId}/${name}`)
    handleClose();
  },[navigate,value]);
  console.log(booking.timeSlot)
  console.log(doctor)


  return (
    <div>
        <div className='px-2 bg-cyan-400 rounded-sm'>
        <Button onClick={handleOpen} style={{ textTransform: 'none' }}>
        <div className='text-md text-white font-semibold'>
        get Detials

        </div>
      </Button>
        </div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...modalStyle }}>
          <Typography id="modal-modal-title" variant="h6" component="h4">
            <span className='font-semibold mb-5'>
           To   dr.{doctor.name}

            </span>
          </Typography>

          <Typography id="modal-modal-title" variant="h6" component="h4">
            <span className='font-semibold mb-5'>
          Amount paid :  {doctor.fee}

            </span>
          </Typography>

          <Typography id="modal-modal-title" variant="h6" component="h4"> 
          TimeSlot :

            <span className='font-semibold mb-5'>
           {booking.timeSlot?.date}

            </span>
            <span className='font-semibold mb-5'>
           {booking.timeSlot?.slot}

            </span>
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h4"> 
           Payment Status :

            <span className='font-semibold mb-5'>
           {booking.status}

            </span>
          
          </Typography>
          {/* Your form fields go here */}

          <div className="flex justify-center mt-5 ">
          
          <Link to={'/admin'} >
            <button
              
              className="py-2 px-2 bg-primaryColor text-white min-w-[80px] font-semibold rounded-md"
            >
              Submit
            </button>
          </Link>

          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default PaymentDetial1;
