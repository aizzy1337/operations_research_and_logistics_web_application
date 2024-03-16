import ActivityV1 from "./Activity";
import ActivityV2 from "./ActivityV2";

interface CriticalPathNode {

    id: number;
    early_start: number;
    early_finish: number;
    late_start: number;
    late_finish: number;
    reserve: number;
    isCritical: boolean;
    innerActivities: number[];
    outerActivities: number[];

}

export default CriticalPathNode;