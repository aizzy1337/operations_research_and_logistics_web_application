import { Gantt, Task, ViewMode } from "gantt-task-react";
import CriticalPath from "../../interfaces/CriticalPath";
import "gantt-task-react/dist/index.css";

interface Props {
    nodes: CriticalPath;
}

function GanttCpm({nodes}: Props) {

    var tasks = nodesToTasks(nodes);

    return  (

        <div>
            <Gantt
                tasks={tasks}
                viewMode={ViewMode.Day}
                columnWidth={60}
                rowHeight={40}
                fontSize={"12"}
                arrowColor="#ff5c5c"
            />
        </div>

    )

}

function nodesToTasks(nodes:CriticalPath): Task[] {

    var tasks:Task[] = [];
    var startDate:Date = new Date();

    let task: Task = {

        start: new Date(startDate.getTime()),
        end: new Date(startDate.getTime() + (1000 * 60 * 60 * 24) * nodes.nodes[nodes.nodes.length-1].t0),
        name: 'Projekt',
        id: 'project',
        type: 'project',
        progress: 100,
        isDisabled: true,
        styles: { progressColor: '#5cff5c', progressSelectedColor: '#5cff5c' }

    }

    tasks.push(task);

    nodes.activites.forEach( (activity, activityIndex) => {
        
        let task: Task = {

            start: new Date(startDate.getTime() + (1000 * 60 * 60 * 24) * findStartOffset(activityIndex, nodes)),
            end: new Date(startDate.getTime() + (1000 * 60 * 60 * 24) * findEndOffset(activityIndex, nodes)),
            name: activity.name,
            id: activityIndex.toString(),
            type: 'task',
            progress: 100,
            isDisabled: true,
            styles: (nodes.criticalActivites.includes(activityIndex)) ? { progressColor: '#ff5c5c', progressSelectedColor: '#ff5c5c' } : { progressColor: '#5c87ff', progressSelectedColor: '#5c87ff' },
            dependencies: [(nodes.criticalActivites.includes(activityIndex)) ? (activityIndex !== 0) ? nodes.criticalActivites[nodes.criticalActivites.indexOf(activityIndex)-1].toString() : "" : ""]

        }

        tasks.push(task);

    });

    return tasks;

}

function findStartOffset(activityIndex:number, nodes:CriticalPath): number {

    var offset:number = 0;

    nodes.nodes.forEach( (node) => {

        if(node.outerActivities.includes(activityIndex)) {

            offset = node.t0;

        }

    })

    return offset;

}

function findEndOffset(activityIndex:number, nodes:CriticalPath): number {

    var offset:number = 0;

    nodes.nodes.forEach( (node) => {

        if(node.innerActivities.includes(activityIndex)) {

            offset = node.t0;

        }

    })

    return offset;

}

export default GanttCpm;