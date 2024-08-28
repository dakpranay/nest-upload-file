import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserRequestDto } from 'src/dtos/user.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadUserData(
    @Body() userData: UserRequestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = await this.userService.uploadUserData(userData, file);
    return user;
    // const uploadedFile = await this.cloudinaryService.uploadFile(file);
    // console.log(userData);
    // console.log(file);
  }
}
