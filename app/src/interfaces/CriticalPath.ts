import ActivityV1 from "./Activity";
import ActivityV2 from "./ActivityV2";
import CriticalPathNode from "./CriticalPathNode";

interface CriticalPath {

    nodes: CriticalPathNode[];
    activites: ActivityV1[] | ActivityV2[];
    criticalNodes: number[];
    criticalActivites: number[];

}

export default CriticalPath;