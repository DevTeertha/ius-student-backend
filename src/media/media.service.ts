import * as fs from 'fs/promises';

import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

import { firebaseConfig } from '../shared/constant/firebase.constant';

import { FileDTO, FileResponseDTO } from './dto/file.dto';

@Injectable()
export class MediaService {
  constructor() {
    initializeApp(firebaseConfig);
  }

  async uploadFile(file: FileDTO): Promise<FileResponseDTO> {
    const fileBuffer = await fs.readFile(file.path);
    const fileUint8Array = new Uint8Array(fileBuffer);
    const storage = getStorage();
    const key = `ius_Student_${file.originalname}_${Date.now()}`;
    const storageRef = ref(storage, key);

    const upload = await uploadBytes(storageRef, fileUint8Array, {
      contentType: 'image/jpeg',
    });
    const url = await getDownloadURL(upload.ref);
    await fs.unlink(file.path);
    return {
      key,
      url,
    };
  }
}
