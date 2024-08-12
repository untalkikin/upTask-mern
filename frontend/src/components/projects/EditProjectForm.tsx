import ProjectForm from './ProjectForm'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { Project, ProjectFormData } from '@/types/index';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProject } from '@/api/ProjectApi';
import { toast } from 'react-toastify';


type EditProjectFormProps = {
    data: ProjectFormData
    projectId:  Project['_id']
}

export default function Edit({data, projectId}: EditProjectFormProps) {


    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues:{
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
        }
    });

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateProject,
        onError: (error) => {
           toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            toast.success(data)
            navigate('/')
        }
    })

    //Mutate only support ona varible 
    
    const handleForm = (formData: ProjectFormData) =>{
        const data ={
            formData,
            projectId
        }
        mutate(data)
    }

    return (
        <>
            <div className='max-w-3xl mx-auto'>
                <h1 className='text-5xl font-black'>Create Project</h1>
                <p className='text-2xl font-light text-gray-500 mt-5'>Edit the information for the project</p>
                <nav className='my-5'>
                    <Link
                        className='bg-blue-800 hover:bg-blue-900 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors'
                        to='/'>
                        Back to projects
                    </Link>
                </nav>
                <form className='mt-10 bg-white shadow-lg p-10 rounded-lg' onSubmit={handleSubmit(handleForm)} noValidate>

                    <ProjectForm
                        register={register}
                        errors={errors}
                    />

                    <input
                        type="submit"
                        value="Edit Project"
                        className='bg-blue-800 hover:bg-blue-900 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors'
                    ></input>
                </form>
            </div>
        </>
    )
}
