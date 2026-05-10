import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export default class UserRepositoryPrisma {
  async create(userData) {
    return await prisma.user.create({
      data: userData
    });
  }

  async findAll() {
    return await prisma.user.findMany();
  }

  async findById(id) {
    return await prisma.user.findUnique({
      where: { id: Number(id) }
    });
  }

  async update(id, userData) {
    return await prisma.user.update({
      where: { id: Number(id) },
      data: userData
    });
  }

  async delete(id) {
    return await prisma.user.delete({
      where: { id: Number(id) }
    });
  }

  async findByUserEmail(email) {
    return await prisma.user.findUnique({
      where: { email }
    });
  }
}