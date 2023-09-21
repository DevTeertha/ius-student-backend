import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

import { firebaseConfig } from '../shared/constant/firebase.constant';

import { FileDTO, FileResponseDTO } from './dto/file.dto';

@Injectable()
export class MediaService {
  constructor() {
    initializeApp(firebaseConfig);
  }

  async uploadFile(file: FileDTO): Promise<FileResponseDTO> {
    const fileUint8Array = new Uint8Array(file.buffer);
    const storage = getStorage();
    const key = `ius_Student_${file.originalname}_${Date.now()}`;
    const storageRef = ref(storage, key);

    const upload = await uploadBytes(storageRef, fileUint8Array, {
      contentType: 'image/jpeg',
    });
    const url = await getDownloadURL(upload.ref);
    return {
      key,
      url,
    };
  }

  async deleteFile(key: string) {
    const storage = getStorage();
    const desertRef = ref(storage, key);
    return await deleteObject(desertRef);
  }
}
