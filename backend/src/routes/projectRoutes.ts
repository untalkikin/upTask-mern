import { Router } from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/ProjectController';
import { handleInputErrors } from '../middleware/validation';
import { TaskController } from '../controllers/TaskController';
import { projectExist } from '../middleware/project';
import { taskBelongsToProject, taskExist } from '../middleware/task';


const router = Router();

//Routes

//Import the class createProjects
router.post('/',
    body('projectName')
        .notEmpty().withMessage('The project name is required'),
    body('clientName')
        .notEmpty().withMessage('The client name is required'),
    body('description')
        .notEmpty().withMessage('The description is required'),
    handleInputErrors,
    ProjectController.createProjects
);

//import the class getAllProjects
router.get('/', ProjectController.getAllProjects);

//Route for get for id project
router.get('/:id',
    param('id').isMongoId().withMessage('Ivnavlid ID'),
    handleInputErrors,
    ProjectController.getProjectById);
    
//Route for update Project and some validations
router.put('/:id',
    param('id').isMongoId().withMessage('Ivnavlid ID'),
    body('projectName')
        .notEmpty().withMessage('The project name is required'),
    body('clientName')
        .notEmpty().withMessage('The client name is required'),
    body('description')
        .notEmpty().withMessage('The description is required'),
    handleInputErrors,
    ProjectController.updateProject);

//Route for delete project
router.delete('/:id',
    param('id').isMongoId().withMessage('Ivnavlid ID'),
    handleInputErrors,
    ProjectController.deleteProject);


//Param Router
router.param('projectId', projectExist);

//Route for tasks and soeme validations
router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage('The name of task is required'),
    body('description')
        .notEmpty().withMessage('The description of task is required'),
    handleInputErrors,
    TaskController.createTask
);

//Middleware for check the task
router.param('taskId', taskExist);

//Middleware verification for check the task is assigned to the project
router.param('taskId', taskBelongsToProject);

//Route for get the task for a project
router.get('/:projectId/tasks',
    TaskController.getProjectTasks
);

//Route for get the task by id
router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Ivnavlid ID'),
    handleInputErrors,
    TaskController.getTaskById
);

//Route for update the task
router.put('/:projectId/tasks/:taskId',
    body('name')
        .notEmpty().withMessage('The name of task is required'),
    body('description')
        .notEmpty().withMessage('The description of task is required'),
    param('taskId').isMongoId().withMessage('Ivnavlid ID'),
    handleInputErrors,
    TaskController.updateTask
);

//Route for delete the task
router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Ivnavlid ID'),
    handleInputErrors,
    TaskController.deleteTask
);

//Route for update the status task
router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('Ivnavlid ID'),
    body('status')
        .notEmpty().withMessage('The status is required'),
    handleInputErrors,
    TaskController.updateStatus
)


export default router;