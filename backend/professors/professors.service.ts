import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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


    

    async updateProfessor(tia: string, professorData: Professor): Promise<Professor> {
        try {
          const updatedProfessor = await this.professorModel.findOneAndUpdate(
            { tia }, 
            professorData,
            { new: true } // Retorna o documento atualizado
          ).exec();
    
          if (!updatedProfessor) {
            throw new NotFoundException('Professor não encontrado');
          }
    
          return updatedProfessor; 
        } catch (error) {
          // Log do erro para facilitar a depuração
          console.error('Erro ao atualizar professor:', error);
          throw new InternalServerErrorException('Erro ao atualizar professor'); 
        }
    }

  /* 
    async deleteProfessor(name: string){
        const result = await this.professorModel.deleteOne({name: name}).exec();
        if (result.deletedCount === 0){
            throw new NotFoundException('Could not delete the professor');
        }
    }
*/


    async deleteProfessor(tia: string ){
     const result = await this.professorModel.deleteOne({ tia: tia }).exec();
        if (result.deletedCount === 0){
            throw new NotFoundException('Could not delete the professor');
        }

    }
}