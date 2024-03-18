import ActivityV1 from "../interfaces/Activity";
import ActivityV2 from "../interfaces/ActivityV2";
import CriticalPath from "../interfaces/CriticalPath";
import CriticalPathNode from "../interfaces/CriticalPathNode";

function compute_critical_path(nodes: CriticalPathNode[], activities: ActivityV1[] | ActivityV2[]): CriticalPath {

    var criticalPath: CriticalPath = {
        nodes: [],
        activites: [],
        criticalActivites: [],
        criticalNodes: []
    };

    //forward
    nodes.forEach( (node, nodeIndex) => {

        if(nodeIndex !== 0) {

            var max:number = 0;

            node.innerActivities.forEach( (inner) => {

                nodes.forEach(connectedNode => {
                    if(connectedNode.outerActivities.includes(inner)) {
                        if(max < +connectedNode.t0 + +activities[inner].time) {
                            max = +connectedNode.t0 + +activities[inner].time;
                        }
                    }
                });

            })

            node.t0 = max;

        }

    })

    nodes[nodes.length-1].t1 = nodes[nodes.length-1].t0;

    //backward
    for(let i=nodes.length-2; i >= 0; i--) {

        nodes[i].outerActivities.forEach( (outer) => {

            nodes.forEach( (node) => {

                if(node.innerActivities.includes(outer)) {

                    if(node.t1 - activities[outer].time < nodes[i].t1) {
                        nodes[i].t1 = node.t1 - activities[outer].time;
                    }

                }

            })

        })

    }

    //reserve
    nodes.forEach( (node, nodeIndex) => {

        node.reserve = node.t1 - node.t0;

        if(node.reserve === 0) {
            criticalPath.criticalNodes.push(nodeIndex);
            node.isCritical = true;
        }

    })

    //final result
    criticalPath.activites = activities;
    criticalPath.nodes = nodes;

    criticalPath.criticalNodes.forEach ( (node, index) => {

        if(nodes[node].outerActivities.length === 1) {
            criticalPath.criticalActivites.push(nodes[node].outerActivities[0]);
        }
        else {
            nodes[node].outerActivities.forEach( (outer) => {
                if(nodes[criticalPath.criticalNodes[index+1]].innerActivities.includes(outer)) {
                    criticalPath.criticalActivites.push(outer);
                }
            })
        }

    })

    console.log(criticalPath);

    return criticalPath;

}

export default compute_critical_path;