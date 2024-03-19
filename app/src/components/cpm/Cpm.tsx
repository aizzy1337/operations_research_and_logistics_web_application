import { Box, Typography } from "@mui/material";
import ActivityV1 from "../../interfaces/Activity";
import FormCpm from "./FormCpm";
import ActivityV2 from "../../interfaces/ActivityV2";
import isActivityV1 from "../../utils/checkInterface";
import compute_critical_path_v1 from "../../utils/compute_critical_path_v1";
import compute_critical_path_v2 from "../../utils/compute_critical_path_v2";
import { SigmaContainer } from "@react-sigma/core";
import LoadGraph from "./Graph";
import CriticalPath from "../../interfaces/CriticalPath";
import "@react-sigma/core/lib/react-sigma.min.css";

function Cpm() {

  const handleFormSubmit = (a: ActivityV1[] | ActivityV2[]) => {
    // wywołanie algorytmu

    let nodes:CriticalPath;

    if (isActivityV1(a[0])) {
      nodes = compute_critical_path_v1(a as ActivityV1[]);
    } else {
      nodes = compute_critical_path_v2(a as ActivityV2[]);
    }

    console.log("nodes", nodes)
  }

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Typography
        sx={{
          fontSize: 35,
          textTransform: "uppercase",
          fontWeight: "bold",
          m: 1,
        }}
      >
        Input data
      </Typography>

      <FormCpm handleSubmit={handleFormSubmit} />

      <SigmaContainer style={{ height: "600px", width: "1000px" }}>
        <LoadGraph />
      </SigmaContainer>
    </Box>
  );
}

export default Cpm;
