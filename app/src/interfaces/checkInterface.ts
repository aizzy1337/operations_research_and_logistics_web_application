import ActivityV1 from "./Activity";
import ActivityV2 from "./ActivityV2";

function isActivityV1(activity: ActivityV1 | ActivityV2): activity is ActivityV1 {
    return (activity as ActivityV1).previousActivities !== undefined;
}

export default isActivityV1;