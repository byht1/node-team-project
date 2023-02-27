export declare enum TypeOperation {
    IMAGE = "image",
    PETS = "pets",
    AVSTAR = "avatars",
    POSTS = "posts"
}
export declare class S3Service {
    private AWS_S3_BUCKET;
    private s3;
    uploadFile(file: any | undefined, type: TypeOperation): Promise<string>;
    deleteFile(key: string, type: TypeOperation): Promise<void>;
    private s3_upload;
    private s3_delete;
}
