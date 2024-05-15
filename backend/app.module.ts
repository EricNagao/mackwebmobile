import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessorsModule } from './professors/professors.module';

@Module({
//  imports: [ProfessorsModule, MongooseModule.forRoot( 'mongodb+srv://marirfurtado:eU3iGW7Bjax5OzYo@cluster0.a81zwhq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')],
  imports: [ProfessorsModule, MongooseModule.forRoot('mongodb+srv://maedaeric:7tPxSEFC8u4scNNm@clusterteste.yudn8do.mongodb.net/?retryWrites=true&w=majority&appName=Clusterteste')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
