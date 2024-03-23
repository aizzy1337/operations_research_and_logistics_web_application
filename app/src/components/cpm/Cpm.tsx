import { Box, Typography, AppBar, Tabs, Tab } from "@mui/material";
import { SigmaContainer } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph } from "graphology";
import { useState } from "react";
import ActivityV1 from "../../interfaces/Activity";
import ActivityV2 from "../../interfaces/ActivityV2";
import CriticalPath from "../../interfaces/CriticalPath";
import isActivityV1 from "../../utils/checkInterface";
import compute_critical_path_v1 from "../../utils/compute_critical_path_v1";
import compute_critical_path_v2 from "../../utils/compute_critical_path_v2";
import FormCpm from "./FormCpm";
import GraphEvents from "./GraphEvents";
import LoadGraph from "./LoadGraph";
import { theme } from "../../theme";
import CustomTabPanel from "./CustomTabPanel";
import CpmTable from "./CpmTable";

function Cpm() {
  const [nodes, setNodes] = useState<CriticalPath>({
    nodes: [],
    activites: [],
    criticalNodes: [],
    criticalActivites: [],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [value, setValue] = useState(0);
  const handleChage = (e: unknown, newValue: number) => {
    setValue(newValue);
  };

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

  const handleFormClear = () => {
    setIsSubmitted(false);
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

      <FormCpm handleSubmit={handleFormSubmit} handleClear={handleFormClear} />

      {isSubmitted && (
        <Box sx={{ width: "90vw" }}>
          <AppBar
            position="static"
            color="transparent"
            sx={{ backgroundColor: theme.palette.grey[900], borderRadius: 2 }}
          >
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
              onChange={handleChage}
            >
              <Tab label="Tabela" {...a11yProps(0)} />
              <Tab label="Graf" {...a11yProps(1)} />
              <Tab label="Graf Gantta" {...a11yProps(2)} />
            </Tabs>
          </AppBar>

          <CustomTabPanel value={value} index={0}>
            <CpmTable nodes={nodes} />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <SigmaContainer
              graph={MultiDirectedGraph}
              style={{ height: "600px", width: "100%" }}
              settings={{
                defaultEdgeType: "arrow",
                edgeLabelSize: 16,
                renderEdgeLabels: true,
              }}
            >
              <LoadGraph nodes={nodes} />
              <GraphEvents />
            </SigmaContainer>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            {"gantt"}
          </CustomTabPanel>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default Cpm;
