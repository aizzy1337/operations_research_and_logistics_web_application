import ActivityV1 from "../interfaces/Activity";
import CriticalPath from "../interfaces/CriticalPath";
import CriticalPathNode from "../interfaces/CriticalPathNode";

function compute_critical_path_v1( activities: ActivityV1[] ) {

    let nodes: CriticalPathNode[] = [];

    // couting nodes
    let nodesCount: number = 2; // first and last
    let allPreviousActivities: number[] = [];

    activities.forEach( (activity) => {

        allPreviousActivities.push(...activity.previousActivities);

    })

    let uniqueActivities = allPreviousActivities.filter((value, index, array) => array.indexOf(value) === index);
    nodesCount += uniqueActivities.length;

    console.log(nodesCount);

    // create nodes
    let emptyNode: CriticalPathNode = {
        id: 0,
        early_start: 0,
        early_finish: 0,
        late_start: 0,
        late_finish: 0,
        reserve: 0,
        isCritical: false,
        innerActivities: [],
        outerActivities: []
    }

    for (let i = 0; i < nodesCount; i++) {
        
        emptyNode.id = i;
        nodes.push(emptyNode);
        
    }

    // create a path
    activities.forEach( (activity, index) => {

        if(activity.previousActivities.length === 0) {

            nodes[0].outerActivities.push(index);

        }
        else {

            

        }

    })

}

export default compute_critical_path_v1;