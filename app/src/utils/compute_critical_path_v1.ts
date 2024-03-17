import ActivityV1 from "../interfaces/Activity";
import CriticalPath from "../interfaces/CriticalPath";
import CriticalPathNode from "../interfaces/CriticalPathNode";

function compute_critical_path_v1( activities: ActivityV1[] ) {

    //prepare connections between nodes
    var nodes: CriticalPathNode[] = prepareConnections(activities);

    //calculate values

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
            early_start: 0,
            early_finish: 0,
            late_start: 0,
            late_finish: 0,
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

    nodes.forEach( (node) => {
        console.log(node);
    })

    return nodes;

}

export default compute_critical_path_v1;