import { Box, Typography } from "@mui/material";
import Activity from "../../interfaces/Activity";
import FormCpm from "./FormCpm";

function Cpm() {

  const handleFormSubmit = (a: Activity[]) => {
    console.log("a", a);
    // wywołanie algorytmu
    console.log('algorithm');
  }

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Typography
        sx={{ fontSize: 35, textTransform: "uppercase", fontWeight: "bold", m: 1 }}
      >
        Input data
      </Typography>

      <FormCpm handleSubmit={handleFormSubmit} />
      
    </Box>
  );
}

export default Cpm;
