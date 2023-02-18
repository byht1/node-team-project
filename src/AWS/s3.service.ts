import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import * as AWS from 'aws-sdk';

export enum TypeOperation {
  IMAGE = 'image',
  FRIENDS = 'friend',
  AVSTAR = 'avatars',
}

@Injectable()
export class S3Service {
  private AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;

  private s3 = new AWS.S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_KEY_SECRET,
  });

  async uploadFile(file: any | undefined, type: TypeOperation) {
    console.log('🚀  S3Service  file', file);
    if (!file) return '';
    const { originalname } = file;
    const expansionFile = originalname.split('.').pop();
    const name = `${uuid()}.${expansionFile}`;

    return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, name, file.mimetype, type);
  }

  private async s3_upload(file: Buffer, bucket: string, name: string, mimetype: string, type: TypeOperation) {
    const params = {
      Bucket: `${bucket}/${type}`,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();

      return s3Response.Location;
    } catch (e) {
      console.log(e);
    }
  }
}
