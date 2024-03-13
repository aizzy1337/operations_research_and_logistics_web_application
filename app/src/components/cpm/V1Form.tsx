import { useState } from "react";
import ActivityV1 from "../../interfaces/Activity";
import {
  Box,
  InputLabel,
  Select,
  TextField,
  FormControl,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface props {
  handleSubmit: (a: ActivityV1[]) => void;
}
const V1Form = ({ handleSubmit }: props) => {
  const [activities, setActivities] = useState<ActivityV1[]>([
    { name: "", previousActivities: [], time: 0 },
  ]);

  const handleNameInputChange = (index: number, e: any) => {
    let data = [...activities];
    data[index].name = e.target.value;
    setActivities(data);
  };

  const handlePrevActivityChange = (index: number, e: any) => {
    let data = [...activities];
    data[index].previousActivities = e.target.value;

    setActivities(data);
  };

  const handleTimeInputChange = (index: number, e: any) => {
    if (e.target.value > -1) {
      let data = [...activities];
      data[index].time = e.target.value;
      setActivities(data);
    }
  };

  const handleAddActivity = (e: any) => {
    e.preventDefault();

    let newActivity: ActivityV1 = {
      name: "",
      previousActivities: [],
      time: 0,
    };

    setActivities([...activities, newActivity]);
  };

  const handleDeleteActivity = (index: number, e: any) => {
    e.preventDefault();

    let data = [...activities];
    data.splice(index, 1);
    setActivities(data);
  };

  const handleClearForm = () => {
    setActivities([
      {
        name: "",
        previousActivities: [],
        time: 0,
      },
    ]);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    handleClearForm();
    handleSubmit(activities);
  };

  return (
    <>
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

            <FormControl sx={{ width: "30%" }}>
              <InputLabel id="select-label" sx={{ m: 1 }}>
                Previous activity
              </InputLabel>
              <Select
                labelId="select-label"
                label="Previous activity"
                multiple
                value={activities[index].previousActivities}
                sx={{ m: 1 }}
                onChange={(e) => handlePrevActivityChange(index, e)}
              >
                {activities
                  .filter((i) => {
                    return i.name !== input.name;
                  })
                  .map((input, index) => {
                    return (
                      <MenuItem value={index} key={index}>
                        {input.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              label="Time"
              autoComplete="off"
              value={input.time === 0 ? "" : input.time}
              onChange={(e) => handleTimeInputChange(index, e)}
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
          onClick={(e) => handleOnSubmit(e)}
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
    </>
  );
};

export default V1Form;
