import ActivityV2 from "../interfaces/ActivityV2";
import CriticalPath from "../interfaces/CriticalPath";
import CriticalPathNode from "../interfaces/CriticalPathNode";
import compute_critical_path from "./compute_critical_path";

function compute_critical_path_v2( activities: ActivityV2[] ): CriticalPath {

    //prepare connections between nodes
    var nodes: CriticalPathNode[] = prepareConnections(activities);

    //compute critical path
    var criticalPath: CriticalPath = compute_critical_path(nodes, activities);

    return criticalPath;

}

function prepareConnections( activities: ActivityV2[] ): CriticalPathNode[] {

    let nodes: CriticalPathNode[] = [];

    // couting nodes
    let allNodes: number[] = [];

    activities.forEach( (activity) => {

        allNodes.push(...activity.afterEffect);

    })

    let uniqueActivities = allNodes.filter((value, index, array) => array.indexOf(value) === index);
    let nodesCount = uniqueActivities.length;

    console.log(nodesCount);

    // create a path
    for (let i = 0; i < nodesCount; i++) {
        
        let emptyNode: CriticalPathNode = {
            id: i,
            t0: 0,
            t1: Number.MAX_VALUE,
            reserve: 0,
            isCritical: false,
            innerActivities: [],
            outerActivities: []
        }

        activities.forEach( (activity, activityIndex) => {

            if(activity.afterEffect[0] == i) {
                emptyNode.outerActivities.push(activityIndex);
            }

            if(activity.afterEffect[1] == i) {
                emptyNode.innerActivities.push(activityIndex);
            }

        })

        nodes.push(emptyNode);
        
    }

    return nodes;

}

export default compute_critical_path_v2;