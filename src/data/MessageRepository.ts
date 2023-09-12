import { Message, PrismaClient } from "@prisma/client";
import { ICreateMessageDto } from "../models/ICreateMessageDto";
import { IMessageRepository } from "./interfaces/IMessageRepository";

export class MessageRepository implements IMessageRepository {
  db: PrismaClient;

  constructor() {
    this.db = new PrismaClient();
  }

  async createMessage(params: ICreateMessageDto): Promise<Message> {
    const message = await this.db.message.create({
      data: {
        message: params.message,
        topic: params.topic,
      },
    });

    return message;
  }
}
