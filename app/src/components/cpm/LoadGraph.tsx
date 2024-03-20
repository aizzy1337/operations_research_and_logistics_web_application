import { useLoadGraph } from "@react-sigma/core";
import CriticalPath from "../../interfaces/CriticalPath";
import { useEffect } from "react";
import Graph, { MultiDirectedGraph } from "graphology";
import isActivityV1 from "../../utils/checkInterface";

interface Props {
  nodes: CriticalPath;
}

const LoadGraph = ({ nodes }: Props) => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph: Graph = new MultiDirectedGraph();

    // draw nodes
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

    // draw edges

    // for ActivityV1
    if (isActivityV1(nodes.activites[0])) {
      let connecions = getEdgesForV1(nodes);
      // console.log("connections", connecions);

      connecions.map((value, i) => {
        let activity = nodes.activites[i];
        graph.addEdgeWithKey(i, value[1], value[2], {
          label: `${activity.name} | time: ${activity.time}`,
          color: nodes.criticalActivites.includes(i) ? "#bd090c" : "#0328fc",
          size: 3,
        });
      });
    } else {
      // for ActivityV2
      nodes.activites.map((input, index) => {
        if (!isActivityV1(input)) {
          graph.addEdgeWithKey(
            index,
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
    }

    loadGraph(graph);
  }, [loadGraph]);

  return null;
};

export default LoadGraph;

function getEdgesForV1(nodes: CriticalPath) {
  let connections: [[Number, Number, Number]] = [[0, 0, 0]]; // [Activity index, target, destination]

  connections.pop();
  nodes.activites.map((activity, index) => {
    connections.push([index, 0, 0]);
  });

  nodes.nodes.map((node, index) => {
    node.innerActivities.map((value, i) => {
      connections[value][2] = index;
    });

    node.outerActivities.map((value, i) => {
      connections[value][1] = index;
    });
  });

  return connections;
}
