import { useLoadGraph } from "@react-sigma/core";
import CriticalPath from "../../interfaces/CriticalPath";
import { useEffect } from "react";
import Graph from "graphology";
import isActivityV1 from "../../utils/checkInterface";

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
        label: `id: ${input.id + 1} | t0: ${input.t0} | t1: ${input.t1} | r: ${
          input.reserve
        }`,
        size: 20,
        color: nodes.criticalNodes.includes(index) ? "#bd090c" : "#0328fc",
      });
    });

    nodes.activites.map((input, index) => {
      if (isActivityV1(input)) {
      } else {
        graph.addEdgeWithKey(
          `name: ${input.name} | time: ${input.time}`,
          input.afterEffect[0] - 1,
          input.afterEffect[1] - 1,
          {
            label: `${input.name} | time: ${input.time}`,
            color: nodes.criticalActivites.includes(index)
              ? "#bd090c"
              : "#0328fc",
            size: 3,
          }
        );
      }
    });

    loadGraph(graph);
  }, [loadGraph]);

  return null;
};

export default LoadGraph;
