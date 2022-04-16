import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import React from "react";
import { SlotPicker } from "./components/SlotPicker";
import { seletedDate } from "./components/types";
import CloseIcon from '@mui/icons-material/Close';
import "./components/styles.css"

const slots= ["04:30", "09:30", "10:15", "10:45", "11:00", "11:30", "11:45" ,"12:00", "12:15", "12:30", "12:45", "13:00", "14:00", "14:30", "14:45", "15:45" ,"16:30", "16:45", "19:00", "20:00", "21:30", "23:45"];

function App() {
  const [isOpened, setIsOpened] = React.useState<boolean>(false);
  const [fetchedDate, setFetchedDate] = React.useState<seletedDate>();

  const handleFetach = (date: seletedDate) => {
    setFetchedDate(date);
    setIsOpened(false);
  };

  return (
    <div className="App">
      <p style={{wordBreak: "break-all"}}>Assume data arrives as strings in this form: {JSON.stringify(slots)}</p>
      <Button className="select-date-button" onClick={() => setIsOpened(true)} > Select Day </Button>
      <Modal
        open={isOpened}
        onClose={() => setIsOpened(false)}
      >
         <Box display="flex" alignItems="center" justifyContent="center" height="-webkit-fill-available">
                <Box bgcolor="white" padding="10px">
                    <Box display="inline-flex" width="100%" justifyContent="space-between">
                      <p style={{fontWeight: 'bold'}}>Pick date and time</p>
                      <IconButton onClick={() => setIsOpened(false)}>
                            <CloseIcon style={{color: "grey", fontSize: "1.6rem"}}/>
                      </IconButton>
                    </Box>
                    {slots && <SlotPicker slots={slots} fetchDate={handleFetach}/> }
                </Box>
          </Box>
      
      </Modal>
      {fetchedDate && <>
        <p>Date Selected: {fetchedDate.day} </p>
        <p>Time Selected: {fetchedDate.time} </p>
        </>
      }
    </div>
  );
}

export default App;
