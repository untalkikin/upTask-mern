import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectApi"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"


export default function ProjectDetailsView() {

    const navigate = useNavigate()
    
    const params = useParams()

    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
      queryKey: ['editProject', projectId],
      queryFn: () => getProjectById(projectId),
      retry: false
    })

    if(isLoading) return 'Loading...'
    if(isError) return <Navigate to='/404' />
    console.log(data)
    if(data) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
            <nav className="my-5 flex gap-3">
                <button className="bg-blue-800 hover:bg-blue-600 px-10 text-white text-xl font-bold cursor-pointer transition-colors" 
                onClick={()=> navigate(location.pathname +'?newTask=true')}>
                    Add Task
                </button>
            </nav>
            <TaskList tasks={data.tasks}/>
            <AddTaskModal />
        </>
    )
}
