import { Body, Controller, Get, Post, Patch, Delete, Param, HttpCode } from '@nestjs/common';
import { Professor } from './professors.model';
import { ProfessorsService } from './professors.service';

@Controller('professors')
export class ProfessorsController {
    constructor(private readonly professorService:ProfessorsService) {}

    @Get()
    async readAllProfessors(): Promise<any>{
        const professors = await this.professorService.readProfessors();
        return professors.map(professor => ({
            id: professor.id,
            name: professor.name,        
            tia: professor.tia,
            courses: professor.courses,
            subject: professor.subject
            }));
    }

    @Post()
    async createProfessor(@Body() professor: Professor): Promise<any>{
        var response = await this.professorService.createProfessor(professor);
        return {id: response};
    }
    

    @Patch(':tia')
    @HttpCode(200) 
    async updateProfessor(@Param('tia') tia: string, @Body() professorData: Professor): Promise<Professor> {
      const updatedProfessor = await this.professorService.updateProfessor(tia, professorData);
      return updatedProfessor; 
    }



/*
    @Delete(':name')
    async deleteProfessor(@Param('name') name: string){
        await this.professorService.deleteProfessor(name);
        return "deletado";
    }
  */  
    @Delete(':tia')
    async deleteProfessor(@Param('tia') tia: string){
        await this.professorService.deleteProfessor(tia);
        return null;
    }

}
