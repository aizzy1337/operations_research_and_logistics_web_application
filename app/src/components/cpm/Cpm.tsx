import { Box, Typography } from "@mui/material";
import ActivityV1 from "../../interfaces/Activity";
import FormCpm from "./FormCpm";
import ActivityV2 from "../../interfaces/ActivityV2";
import isActivityV1 from "../../interfaces/checkInterface";

function Cpm() {

  const handleFormSubmit = (a: ActivityV1[] | ActivityV2[]) => {
    console.log("a", a);
    // wywołanie algorytmu
    if (isActivityV1(a[0])) {
      console.log('algorithmV1');
    } else {
      console.log("algorithmV2");
    }
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
