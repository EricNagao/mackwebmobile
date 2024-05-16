import * as mongoose from 'mongoose';

export const ProfessorSchema = new mongoose.Schema({
    name: { type: String, required: true},
    courses: { type: String, required: true},
    subject: { type: String, required: true},
    tia: { type: String, required: true },


})

export interface Professor extends mongoose.Document {
    tia: String;
    id: string;
    name: any;
    courses: string;
    subject: string;
}