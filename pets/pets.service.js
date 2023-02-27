"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const s3_service_1 = require("../AWS/s3.service");
const pets_schema_1 = require("../db-schema/pets.schema");
const user_service_1 = require("../user/user.service");
let PetsService = class PetsService {
    constructor(petModel, fileService, userService) {
        this.petModel = petModel;
        this.fileService = fileService;
        this.userService = userService;
    }
    async createPet(createPetDto, image, userId) {
        const fileName = await this.fileService.uploadFile(image, s3_service_1.TypeOperation.PETS);
        const pet = await this.petModel.create(Object.assign(Object.assign({}, createPetDto), { image: fileName, owner: userId }));
        await this.userService.addPet(userId, pet);
        return pet;
    }
    async removePet(petId, userId) {
        const petFind = await this.petModel.findById(petId);
        if (!petFind) {
            throw new common_1.HttpException('Pet not found', common_1.HttpStatus.NOT_FOUND);
        }
        const string = petFind.image.split('/').pop();
        await this.fileService.deleteFile(string, s3_service_1.TypeOperation.PETS);
        const pet = await this.petModel.findByIdAndRemove(petId).select({ createdAt: 0, updatedAt: 0 });
        await this.userService.removePet(userId, pet);
        return pet;
    }
};
PetsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(pets_schema_1.Pet.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        s3_service_1.S3Service,
        user_service_1.UserService])
], PetsService);
exports.PetsService = PetsService;
//# sourceMappingURL=pets.service.js.map