import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {

    private readonly directoryPath = path.join(__dirname, '..', '..', 'public', 'documentos');
    getFile(filename: string): { stream: NodeJS.ReadableStream; path: string } | null {

        const filePath = path.join(this.directoryPath, filename);
    
        if (fs.existsSync(filePath)) {
          const stream = fs.createReadStream(filePath);
          return { stream, path: filePath };
        }
    
        return null;
      }
}
