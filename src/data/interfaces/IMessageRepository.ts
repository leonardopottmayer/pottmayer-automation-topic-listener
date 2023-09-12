import { Message, PrismaClient } from "@prisma/client";
import { ICreateMessageDto } from "../../models/ICreateMessageDto";

export interface IMessageRepository {
  db: PrismaClient;

  createMessage(params: ICreateMessageDto): Promise<Message>;
}
