import { useLoadGraph } from "@react-sigma/core";
import CriticalPath from "../../interfaces/CriticalPath";
import { useEffect } from "react";
import Graph from "graphology";

interface Props {
  nodes: CriticalPath;
}

const LoadGraph = ({ nodes }: Props) => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph: Graph = new Graph();

    nodes.nodes.map((input, index) => {
      graph.addNode(index, {
        x: Math.random(),
        y: Math.random(),
        label: input.id + 1,
        size: 20,
        color: nodes.criticalNodes.includes(index) ? "#bd090c" : "#0328fc",
      });
    });

    loadGraph(graph);
  }, [loadGraph]);

  return null;
};

export default LoadGraph;
