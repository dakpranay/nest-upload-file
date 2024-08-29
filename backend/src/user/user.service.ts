import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserRequestDto } from 'src/dtos/user.dto';
import { UserSchema } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from 'src/dtos/userResponse.dto';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

@Injectable()
export class UserService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
  ) {}

  async uploadUserData(userData: UserRequestDto, file: Express.Multer.File) {
    let cloudinaryResponse: UploadApiResponse | UploadApiErrorResponse;
    let user: UserResponseDto;
    try {
      cloudinaryResponse = await this.cloudinaryService.uploadFile(file);
      user = this.userRepository.create({
        ...userData,
        file: cloudinaryResponse.secure_url,
      });
      return this.userRepository.save(user);
    } catch (err) {
      if (cloudinaryResponse && !user) {
        this.cloudinaryService.deleteFile(cloudinaryResponse.public_id);
      }
      console.log(err);
    }
  }
}
