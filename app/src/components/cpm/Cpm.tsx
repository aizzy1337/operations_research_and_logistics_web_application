import { Box, Typography } from "@mui/material";
import ActivityV1 from "../../interfaces/Activity";
import FormCpm from "./FormCpm";
import ActivityV2 from "../../interfaces/ActivityV2";
import isActivityV1 from "../../utils/checkInterface";
import compute_critical_path_v1 from "../../utils/compute_critical_path_v1";
import compute_critical_path_v2 from "../../utils/compute_critical_path_v2";
import { SigmaContainer } from "@react-sigma/core";
import LoadGraph from "./LoadGraph";
import CriticalPath from "../../interfaces/CriticalPath";
import "@react-sigma/core/lib/react-sigma.min.css";
import { useEffect, useState } from "react";
import GraphEvents from "./GraphEvents";

function Cpm() {
  const [nodes, setNodes] = useState<CriticalPath>({
    nodes: [],
    activites: [],
    criticalNodes: [],
    criticalActivites: [],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = (a: ActivityV1[] | ActivityV2[]) => {
    // wywołanie algorytmu

    if (isActivityV1(a[0])) {
      setNodes(compute_critical_path_v1(a as ActivityV1[]));
    } else {
      setNodes(compute_critical_path_v2(a as ActivityV2[]));
    }

    setIsSubmitted(true);
    console.log("nodes", nodes);
  };

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

      {isSubmitted && (
        <SigmaContainer
          style={{ height: "600px", width: "1000px" }}
          settings={{
            defaultEdgeType: "arrow",
            edgeLabelSize: 16,
            renderEdgeLabels: true,
          }}
        >
          <LoadGraph nodes={nodes} />
          <GraphEvents />
        </SigmaContainer>
      )}
    </Box>
  );
}

export default Cpm;
