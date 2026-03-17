import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { extname } from 'path';

@Injectable()
export class UploadsService {
  private readonly s3Client = new S3Client({
    region: 'us-east-1',
    endpoint: process.env.STORAGE_ENDPOINT!,
    credentials: {
      accessKeyId: process.env.STORAGE_ACCESS_KEY!,
      secretAccessKey: process.env.STORAGE_SECRET_KEY!,
    },
    forcePathStyle: true,
  });

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const bucketName = process.env.STORAGE_BUCKET_NAME!;

      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extname(file.originalname)}`;

      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: uniqueName,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);

      const publicUrl =
        process.env.STORAGE_PUBLIC_URL ||
        `${process.env.STORAGE_ENDPOINT}/${bucketName}`;

      return `${publicUrl}/${uniqueName}`;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'Erro ao enviar a imagem para o servidor',
      );
    }
  }
}
