import ActivityV1 from "../interfaces/Activity";
import CriticalPath from "../interfaces/CriticalPath";
import CriticalPathNode from "../interfaces/CriticalPathNode";
import compute_critical_path from "./compute_critical_path";

function compute_critical_path_v1( activities: ActivityV1[] ): CriticalPath {

    //prepare connections between nodes
    var nodes: CriticalPathNode[] = prepareConnections(activities);

    //compute critical path
    var criticalPath: CriticalPath = compute_critical_path(nodes, activities);

    return criticalPath;

}

function prepareConnections( activities: ActivityV1[] ): CriticalPathNode[] {

    let nodes: CriticalPathNode[] = [];

    // couting nodes
    let allPreviousActivities: number[] = [];

    activities.forEach( (activity) => {

        allPreviousActivities.push(...activity.previousActivities);

    })

    let uniqueActivities = allPreviousActivities.filter((value, index, array) => array.indexOf(value) === index);
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

        nodes.push(emptyNode);
        
    }

    //first node
    var toPop:number = 0;
    activities.forEach( (activity, activityIndex) => {

        if(activity.previousActivities.length === 0) {
            nodes[0].outerActivities.push(activityIndex);
            toPop++;
        }

    })

    //last node
    activities.forEach( (activity, activityIndex) => {

        if(!uniqueActivities.includes(activityIndex)) {
            nodes[nodes.length-1].innerActivities.push(activityIndex);
        }

    })

    //inner activities
    var nodeIndex = nodes.length-2;
    var reserveActivities = [];
    reserveActivities.push(...activities);
    reserveActivities.reverse();

    for(let i=0; i<toPop; i++) {
        reserveActivities.pop();
    }

    reserveActivities.forEach( (activity, activityIndex) => {
        
        //check if exist
        var existingNode = nodes.findIndex( (node, nodeIndex) => {
            
            if(node.innerActivities.sort().join(',') === activity.previousActivities.sort().join(',')){
                return nodeIndex;
            }

        })

        if(existingNode === -1) {
            nodes[nodeIndex].innerActivities = activity.previousActivities;
            nodeIndex--;
        }

    })

    //outer activities
    activities.forEach( (activity, activityIndex) => {

        if(activity.previousActivities.length !== 0) {

            //find node
            nodes.forEach( (node) => {

                if(node.innerActivities.sort().join(',') === activity.previousActivities.sort().join(',')){

                    node.outerActivities.push(activityIndex);

                }

            })

        }

    })

    return nodes;

}

export default compute_critical_path_v1;