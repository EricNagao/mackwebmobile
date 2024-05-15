import { Body, Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
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

    @Patch()
    async updateProfessor( @Body() professor: Professor){
        await this.professorService.updateProfessor(professor);
    }

    @Delete(':name')
    async deleteProfessor(@Param('name') name: string){
        await this.professorService.deleteProfessor(name);
        return null;
    }
}
