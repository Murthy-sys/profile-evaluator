import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ResumeController } from '../controllers/resume.controller';
import { ResumeService } from '../services/resume.service';
import { EmailService } from '../services/email.service';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [ResumeController],
  providers: [ResumeService, EmailService],
})
export class ResumeModule {}
