import { Task } from "@/types/index"
import TaskCard from "./TaskCard"


type TaskListProps = {
    tasks: Task[]
}

type GroupedTasks = {
    [key: string]: Task[]
}

const initialStatusGroups: GroupedTasks = {
    pending: [],
    onHold: [],
    inProgress: [],
    underReview: [],
    completed: [],
}

const statusStyles  : {[key: string] : string} = {
    pending: 'bg-slate-300',
    onHold: 'bg-orange-400',
    inProgress: 'bg-green-500',
    underReview: 'bg-red-500',
    completed: 'bg-blue-500'
}

const statusTranslations  : {[key: string] : string} = {
    pending: 'Pending Task',
    onHold: 'On Hold',
    inProgress: 'In Progress',
    underReview: 'Under Review',
    completed: 'Completed'
}

export default function TaskList({ tasks }: TaskListProps) {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);


    return (
        <>
            <h2 className="text-5xl font-black my-10">Tasks for the project</h2>

            <div className='flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-[300px] 2xl:min-w-0 2xl:w-1/5'>
                        <button className={`w-full rounded py-2 ${statusStyles[status]}`}>
                            <h3 className="font-bold uppercase">
                                {statusTranslations[status]}
                            </h3> 
                        </button>
                        <ul className='mt-5 space-y-5'>
                            {tasks.length === 0 ? (
                                <li className="text-gray-500 text-center pt-3">There are no tasks</li>
                            ) : (
                                tasks.map(task => <TaskCard key={task._id} task={task} />)
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    )
}
