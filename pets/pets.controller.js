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
exports.PetsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const pets_schema_1 = require("../db-schema/pets.schema");
const dto_1 = require("./dto");
const create_pet_schema_1 = require("./schema-swagger/create-pet.schema");
const pets_service_1 = require("./pets.service");
const validate_pipe_1 = require("../global/pipe/validate.pipe");
const validateIsNotVoid_pipe_1 = require("../global/pipe/validateIsNotVoid.pipe");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
let PetsController = class PetsController {
    constructor(petsService) {
        this.petsService = petsService;
    }
    create(req, dto, { image }) {
        return this.petsService.createPet(dto, image[0], req.user._id);
    }
    remove(id, req) {
        return this.petsService.removePet(id, req.user._id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Add pet' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, swagger_1.ApiBody)({ type: create_pet_schema_1.CreatePetSchema }),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Pet created', type: pets_schema_1.Pet }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UsePipes)(validate_pipe_1.ValidatePipe),
    (0, common_1.UsePipes)(validateIsNotVoid_pipe_1.ValidateIsNotVoid),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'image', maxCount: 1 }])),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreatePetDto, dto_1.UploadFileDto]),
    __metadata("design:returntype", void 0)
], PetsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Delete pet' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Pet deleted', type: pets_schema_1.Pet }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Invalid token' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Not Found' }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Pet ID' }),
    (0, swagger_1.ApiHeaders)([
        {
            name: 'Authorization',
            required: true,
            description: 'User access token',
        },
    ]),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PetsController.prototype, "remove", null);
PetsController = __decorate([
    (0, swagger_1.ApiTags)('Pets'),
    (0, common_1.Controller)('pets'),
    __metadata("design:paramtypes", [pets_service_1.PetsService])
], PetsController);
exports.PetsController = PetsController;
//# sourceMappingURL=pets.controller.js.map