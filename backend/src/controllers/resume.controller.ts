import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Request,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ResumeService } from '../services/resume.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole, EmployeeStatus } from '../schemas/user.schema';

@Controller('resume')
export class ResumeController {
  constructor(private resumeService: ResumeService) {}

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('resume', {
      storage: memoryStorage(), // Use memory storage to access buffer for PDF parsing
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    }),
  )
  async uploadResume(@Request() req, @UploadedFile() file: Express.Multer.File) {
    return this.resumeService.uploadResume(req.user.userId, file);
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.HR, UserRole.PAYROLL)
  async getAllUsers() {
    return this.resumeService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.HR, UserRole.PAYROLL)
  async getUserDetails(@Param('id') id: string) {
    return this.resumeService.getUserDetails(id);
  }

  @Put(':id/status')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.HR)
  async updateEmployeeStatus(
    @Param('id') id: string,
    @Body() body: { status: EmployeeStatus; joiningDate?: string },
  ) {
    const joiningDate = body.joiningDate ? new Date(body.joiningDate) : undefined;
    return this.resumeService.updateEmployeeStatus(id, body.status, joiningDate);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.HR)
  async deleteUser(@Param('id') id: string) {
    return this.resumeService.deleteUser(id);
  }

  @Get(':id/download')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.HR, UserRole.PAYROLL)
  async downloadResume(@Param('id') id: string, @Res() res: Response) {
    return this.resumeService.downloadResume(id, res);
  }
}
