import mongoose, { Schema, Document, Types } from "mongoose"

//status of tasks
const taskStatus = {
    PENDING : 'pending',
    ON_HOLD: 'onHold',
    IN_PROGRESS: 'inProgress',
    UNDER_REVIEW: 'underReview',
    COMPLETED: 'completed'
} as const

//Keyof takes an object type and produces a string or numeric literal
export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

//This interface is used for TS
export interface ITask extends Document  {
    name: string
    description: string
    project: Types.ObjectId
    status : TaskStatus
}

export const TaskSchema : Schema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    project:{
        type: Types.ObjectId,
        ref: 'Project'
    },
    status:{
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    }
}, {timestamps: true})

const Task = mongoose.model<ITask>('Task', TaskSchema)

export default Task