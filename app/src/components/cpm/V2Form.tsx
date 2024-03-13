import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import ActivityV2 from "../../interfaces/ActivityV2";
import TextMask from "./TextMask";
import AddIcon from "@mui/icons-material/Add";


const V2Form = () => {
  const [activities, setActivities] = useState<ActivityV2[]>([
    { name: "", afterEffect: [0, 0], time: 0 },
  ]);

  const handleNameInputChange = (index: number, e: any) => {
    let data = [...activities];
    data[index].name = e.target.value;
    setActivities(data);
  };

  const [afterEffect, setAfterEffect] = useState<string[]>([""]);
  const handleAfterEffect = (index: number, e: any) => {
    let data = [...afterEffect];
    data[index] = e.target.value;
    
    setAfterEffect(data);

    if (e.target.value.length === 5) {
      processAfterEffect(index, e.target.value);
    }
  };

  const processAfterEffect = (index: number, s: string) => {
    let arr = s.split("-");
    let a: [number, number] = [Number(arr[0]), Number(arr[1])];

    let data = [...activities];
    data[index].afterEffect = a;

    setActivities(data);
  };

  const isAfterEffectValid = (s: string) => {
    if (s.length === 0 || s.length === 5) {
      return false;
    } else {
      return true;
    }
  };

  const handleTimeInputChange = (index: number, e: any) => {
    if (e.target.value > -1) {
      let data = [...activities];
      data[index].time = e.target.value;
      setActivities(data);
    }
  };

  const handleDeleteActivity = (index: number, e: any) => {
    e.preventDefault();

    let data = [...activities];
    data.splice(index, 1);
    setActivities(data);
  };
  
  const handleAddActivity = (e: any) => {
    e.preventDefault();
    
    let newActivity: ActivityV2 = {
      name: "",
      afterEffect: [0, 0],
      time: 0,
    };

    setActivities([...activities, newActivity]);

    let newAfterEffect = "";
    setAfterEffect([...afterEffect, newAfterEffect]);
  };

  const handleClearForm = () => {
    setActivities([
      {
        name: "",
        afterEffect: [0, 0],
        time: 0,
      },
    ]);
  };

  return (
    <Box>
      {activities.map((input, index) => {
        return (
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            key={index}
          >
            <Typography fontSize={"larger"}>{index + 1}.</Typography>

            <TextField
              variant="outlined"
              label="Name"
              value={input.name}
              autoComplete="off"
              onChange={(e) => handleNameInputChange(index, e)}
              type="text"
              sx={{ m: 1, color: "white" }}
            />

            <TextField
              label="After effects"
              value={afterEffect[index]}
              onChange={(e) => handleAfterEffect(index, e)}
              InputProps={{
                inputComponent: TextMask as any,
              }}
              error={isAfterEffectValid(afterEffect[index])}
              placeholder={"00-00"}
            />

            <TextField
              variant="outlined"
              label="Time"
              autoComplete="off"
              onChange={(e) => handleTimeInputChange(index, e)}
              value={input.time === 0 ? "" : input.time}
              type="number"
              sx={{ m: 1 }}
            />

            <Button
              sx={{ m: 1, p: 1 }}
              variant="contained"
              onClick={(e) => handleDeleteActivity(index, e)}
            >
              <DeleteOutlineIcon />
            </Button>
          </Box>
        );
      })}

      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Button
          sx={{ m: 1, p: 2 }}
          variant="contained"
          onClick={(e) => handleAddActivity(e)}
        >
          <AddIcon />
        </Button>
      </Box>

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ width: "100%" }}
      >
        <Button
          // onClick={(e) => handleOnSubmit(e)}
          variant="contained"
          sx={{ m: 2, p: 2 }}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          sx={{ m: 2, p: 2 }}
          onClick={handleClearForm}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default V2Form;
