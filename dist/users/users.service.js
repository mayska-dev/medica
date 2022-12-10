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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        const createUserDao = await this.prisma.user.create({
            data: {
                email: createUserDto.email,
                name: createUserDto.name
            }
        }).catch((error) => {
            console.error(error);
            throw new Error('Error UsersService create');
        });
        return new user_entity_1.User(createUserDao);
    }
    async findAll() {
        const users = [];
        const usersDao = await this.prisma.user.findMany({})
            .catch((error) => {
            console.error(error);
            throw new Error('Error UsersService findAll');
        });
        for (const userDao of usersDao) {
            users.push(new user_entity_1.User(userDao));
        }
        return users;
    }
    async findOne(id) {
        const userDao = await this.prisma.user.findFirstOrThrow({
            where: {
                id: id
            }
        }).catch((error) => {
            console.error(error);
            throw new Error(`Error UsersService findOne with id:${id}`);
        });
        return new user_entity_1.User(userDao);
    }
    async update(id, updateUserDto) {
        await this.prisma.user.update({
            where: {
                id: id
            }, data: {
                name: updateUserDto.name,
                email: updateUserDto.email
            }
        }).catch(err => {
            console.error(err);
            throw new Error(`Error UsersService update id:${id}`);
        });
        return this.findOne(+id);
    }
    async remove(id) {
        await this.prisma.user.delete({
            where: {
                id: id
            }
        }).catch(err => {
            console.error(err);
            throw new Error(`Error UsersService remove id:${id}`);
        });
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map