import ActivityV1 from "./Activity";
import ActivityV2 from "./ActivityV2";

interface CriticalPathNode {

    id: number;
    t0: number;
    t1: number;
    reserve: number;
    isCritical: boolean;
    innerActivities: number[];
    outerActivities: number[];

}

export default CriticalPathNode;