import { Module } from '@nestjs/common';
import { ProfessorsController } from './professors.controller';
import { ProfessorsService } from './professors.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfessorSchema } from './professors.model';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Professor', schema: ProfessorSchema}]) ],
  controllers: [ProfessorsController],
  providers: [ProfessorsService]
})
export class ProfessorsModule {}
