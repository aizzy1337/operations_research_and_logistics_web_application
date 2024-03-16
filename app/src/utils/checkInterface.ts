import ActivityV1 from "../interfaces/Activity";
import ActivityV2 from "../interfaces/ActivityV2";

function isActivityV1(activity: ActivityV1 | ActivityV2): activity is ActivityV1 {
    return (activity as ActivityV1).previousActivities !== undefined;
}

export default isActivityV1;