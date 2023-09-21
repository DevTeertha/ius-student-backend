import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { FileDTO, FileResponseDTO } from './dto/file.dto';

import { UtilService } from '../shared/services/util.service';
import { ResponseDTO } from '../shared/dto/response.dto';

@ApiTags('File Uplaod')
@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly utilService: UtilService,
  ) {}

  @Get('/delete/:key')
  async deleteImage(
    @Param('key') key: string,
  ): Promise<ResponseDTO<FileResponseDTO>> {
    try {
      return this.utilService.successReponse(
        await this.mediaService.deleteFile(key),
        'File deleted successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'File cannot be deleted',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile() file: FileDTO,
  ): Promise<ResponseDTO<FileResponseDTO>> {
    try {
      return this.utilService.successReponse(
        await this.mediaService.uploadFile(file),
        'File uploaded successfully',
      );
    } catch (error) {
      throw new HttpException(
        this.utilService.errorReponse(
          error?.message ?? 'File cannot be uploaded',
        ),
        error?.status ?? HttpStatus.BAD_REQUEST,
      );
    }
  }
}
