export class FileDTO {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export class FileResponseDTO {
  key: string;
  url: string;
}
