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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const friend_schema_1 = require("../db-schema/friend.schema");
const friends_service_1 = require("./friends.service");
let FriendsController = class FriendsController {
    constructor(friendsService) {
        this.friendsService = friendsService;
    }
    getAll() {
        return this.friendsService.getAllFriends();
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all friends' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [friend_schema_1.Friend], description: "Friends found" }),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Server error' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "getAll", null);
FriendsController = __decorate([
    (0, swagger_1.ApiTags)('Services-Sidebar'),
    (0, common_1.Controller)('friends'),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], FriendsController);
exports.FriendsController = FriendsController;
//# sourceMappingURL=friends.controller.js.map