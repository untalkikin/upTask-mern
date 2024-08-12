import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose"
import { ITask } from "./Task"

//This interface is used for TS
export interface IProject extends Document  {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<ITask & Document>[] 
}


//This schema is mongoose
const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true //This validation is used for cut the spaces between 
    }, 
    clientName: {
        type: String,
        required: true,
        trim: true //This validation is used for cut the spaces between 
    },
    description: {
        type: String,
        required: true,
        trim: true //This validation is used for cut the spaces between 
    },
    tasks: [
        {
            type: Types.ObjectId,
            ref: 'Task'
        }
    ]
}, {timestamps: true})

const Project = mongoose.model<IProject>('Project', ProjectSchema)

export default Project