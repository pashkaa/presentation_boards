import { ObjectId } from "mongodb";
import {BoardsRepository, BoardsViewType} from "../repositories/boards-repository";

class BoardsService {
    boards: BoardsRepository;

    constructor() {
        this.boards = new BoardsRepository()
    }

    async getAllBoards(): Promise<BoardsViewType[]> {
        return await this.boards.getAllBoards()
    }

    async getBoardById(id: string): Promise<BoardsViewType | null> {
        return await this.boards.getBoardById(id)
    }

    async getTaskdById(taskId: string): Promise<BoardsViewType | null> {
        return await this.boards.getTaskById(taskId)
    }

    async createTaskById(title: string, description:string , taskId: string, boardId: string, order: string, arrayName: string): Promise<BoardsViewType | null> {
        return await this.boards.createTaskById(title, description, taskId, boardId, order, arrayName)
    }

    async addTaskInArrayByIdAndName(taskId: string, boardId: string, arrayName: string): Promise<BoardsViewType | null> {
        return await this.boards.addTaskInArrayByIdAndName(taskId, boardId, arrayName)
    }

    async removeTaskFromnArrayByIdAndName(taskId: string, boardId: string, arrayName: string): Promise<BoardsViewType | null> {
        return await this.boards.removeTaskFromnArrayByIdAndName(taskId, boardId, arrayName)
    }

    async deleteTaskById(taskId: string): Promise<BoardsViewType | null> {
        return await this.boards.deleteTaskById(taskId)
    }

    async updateTaskById(title: string, description:string, taskId: string): Promise<BoardsViewType | null> {
        return await this.boards.updateTaskById(title, description, taskId)
    }

    async deleteArrayById(boardId: string): Promise<BoardsViewType | null> {
        return await this.boards.deleteArrayById(boardId)
    }

    async deleteAllTasksByBoardId(boardId: string): Promise<BoardsViewType | null> {
        return await this.boards.deleteAllTasksByBoardId(boardId)
    }

    async createBoard(boardId: ObjectId): Promise<BoardsViewType | null> {
        return await this.boards.createBoard(boardId)
    }

    async decreaseOrderOfRest(boardId: string, arrayName: string, order: string): Promise<BoardsViewType | null> {
        return await this.boards.decreaseOrderOfRest(boardId, arrayName, order)
    }

    async increaseOrderOfBigger(boardId: string, arrayName: string, order: string): Promise<BoardsViewType | null> {
        return await this.boards.increaseOrderOfBigger(boardId, arrayName, order)
    }

}

export const boardsService = new BoardsService()