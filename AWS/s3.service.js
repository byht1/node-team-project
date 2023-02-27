"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = exports.TypeOperation = void 0;
const common_1 = require("@nestjs/common");
const uuidv4_1 = require("uuidv4");
const AWS = require("aws-sdk");
var TypeOperation;
(function (TypeOperation) {
    TypeOperation["IMAGE"] = "image";
    TypeOperation["PETS"] = "pets";
    TypeOperation["AVSTAR"] = "avatars";
    TypeOperation["POSTS"] = "posts";
})(TypeOperation = exports.TypeOperation || (exports.TypeOperation = {}));
let S3Service = class S3Service {
    constructor() {
        this.AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.AWS_S3_KEY_SECRET,
        });
    }
    async uploadFile(file, type) {
        if (!file)
            return '';
        const { originalname } = file;
        const expansionFile = originalname.split('.').pop();
        const name = `${(0, uuidv4_1.uuid)()}.${expansionFile}`;
        return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, name, file.mimetype, type);
    }
    async deleteFile(key, type) {
        return this.s3_delete(key, type);
    }
    async s3_upload(file, bucket, name, mimetype, type) {
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
        }
        catch (e) {
            console.log(e);
        }
    }
    async s3_delete(key, type) {
        const params = {
            Bucket: `${this.AWS_S3_BUCKET}/${type}`,
            Key: key,
        };
        await this.s3.deleteObject(params).promise();
        return;
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)()
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map