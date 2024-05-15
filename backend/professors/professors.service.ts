import { Injectable, NotFoundException } from '@nestjs/common';
import { Professor } from './professors.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProfessorsService {

    constructor( @InjectModel('Professor') private readonly professorModel: Model<Professor> ){}

    async createProfessor(professor: Professor){
        const professorModel = new this.professorModel(
            {
                name: professor.name,
                courses: professor.courses,
                tia: professor.tia,
                subject: professor.subject
            }
        );
        const result = await professorModel.save();
        return result.id as string;
    }

    async readProfessors(){
        const professors = await this.professorModel.find().exec();
        return professors;
    }

    async updateProfessor(professor:Professor){
        const updateProfessor = await this.professorModel.findOne({name: professor.name});
        if (!updateProfessor){
            throw new NotFoundException('Could not find the professor.');
        }
        if (professor.courses){
            updateProfessor.courses = professor.courses
        }
        if (professor.subject){
            updateProfessor.subject = professor.subject
        }
        updateProfessor.save()
    }

    async deleteProfessor(name: string){
        const result = await this.professorModel.deleteOne({name: name}).exec();
        if (result.deletedCount === 0){
            throw new NotFoundException('Could not delete the professor');
        }
    }
}