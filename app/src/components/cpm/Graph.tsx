import { useLoadGraph } from "@react-sigma/core";
import CriticalPath from "../../interfaces/CriticalPath";
import { useEffect } from "react";
import Graph from "graphology";

interface props {
  nodes: CriticalPath;
}

const LoadGraph = () => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph: Graph = new Graph();
    

    loadGraph(graph);
  }, [loadGraph]);

  return null;
};

export default LoadGraph;
