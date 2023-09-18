export class FileDTO {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: any;
}

export class FileResponseDTO {
  key: string;
  url: string;
}
