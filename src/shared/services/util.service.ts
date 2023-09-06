import { Injectable } from '@nestjs/common';
import { ResponseDTO } from '../dto/response.dto';

@Injectable()
export class UtilService {
  public successReponse(data: any, message: string): ResponseDTO {
    return {
      status: true,
      message,
      data,
    };
  }

  public errorReponse(message: string): ResponseDTO {
    return {
      status: false,
      message,
      data: null,
    };
  }
}
