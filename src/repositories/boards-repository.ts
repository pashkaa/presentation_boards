import {client, dataBaseName} from "./db";
import {ObjectId} from "mongodb";

export type BoardsViewType = {
    id: string
    todoSubBoard: string[],
    inProgressSubBoard: string[],
    doneSubBoard: string[]
}

export class BoardsRepository {

  async getTaskById(taskId: string): Promise<any | null> {
    const allboards = await client.db(dataBaseName)
    .collection<any>('tasks').findOne(
      { _id: new ObjectId(taskId) })
    return allboards
    }


    async createTaskById(title: string, description:string , taskId: string, boardId: string, order: string, arrayName: string): Promise<any | null> {
      // http://localhost:3005/boards/tasks/:id
      const allboards = await client.db(dataBaseName)
      .collection<any>('tasks').insertOne(
          { _id: new ObjectId(taskId), title: title, description: description, boardId: boardId, order: order, arrayName: arrayName }
          
      );
      return allboards
    }

    async addTaskInArrayByIdAndName(taskId: string, boardId: string, arrayName: string): Promise<any | null> {
      // http://localhost:3005/boards/add/:id
      const allboards = await client.db(dataBaseName)
      .collection<any>('boards').updateOne(
          { _id: new ObjectId(boardId) },
          {
            $push: {
              [arrayName]: new ObjectId(taskId)
            }
          }
        );
      return allboards
    }

    async removeTaskFromnArrayByIdAndName(taskId: string, boardId: string, arrayName: string): Promise<any | null> {
      // http://localhost:3005/boards/remove/:id
      const allboards = await client.db(dataBaseName)
      .collection<any>('boards').updateOne(
          { _id: new ObjectId(boardId) },
          {
            $pull: {
              [arrayName]: new ObjectId(taskId)
            }
          }
        );
      return allboards
    }

    async deleteTaskById(taskId: string): Promise<any | null> {
      // http://localhost:3005/boards/tasks
      const allboards = await client.db(dataBaseName)
      .collection<any>('tasks').deleteOne(
          { _id: new ObjectId(taskId) }
      )
      return allboards
    }

    async updateTaskById(title: string, description: string, taskId: string): Promise<any | null> {
      const allboards = await client.db(dataBaseName)
      .collection<any>('tasks').updateOne(
          { _id: new ObjectId(taskId) },
          {
            $set: {
              title: title,
              description: description
            }
          }
        );
      return allboards
    }

    async getAllBoards(): Promise<any[]> {

        const allboards = await client.db(dataBaseName)
            .collection<any>('boards').aggregate([
            {
              $lookup: {
                from: 'tasks',
                localField: 'todoSubBoard',
                foreignField: '_id',
                as: 'todoSubBoard'
              }
            },
            {
              $lookup: {
                from: 'tasks',
                localField: 'inProgressSubBoard',
                foreignField: '_id',
                as: 'inProgressSubBoard'
              }
            },
            {
              $lookup: {
                from: 'tasks',
                localField: 'doneSubBoard',
                foreignField: '_id',
                as: 'doneSubBoard'
              }
            }
          ]).toArray();
        return allboards
    }

    async getBoardById(id: string): Promise<any | null> {
          const allboards = await client.db(dataBaseName)
          .collection<any>('boards').aggregate([
            {
              $match : { _id : new ObjectId(id) }
            },
            {
              $lookup: {
                from: 'tasks',
                localField: 'todoSubBoard',
                foreignField: '_id',
                as: 'todoSubBoard'
              }
            },
            {
              $lookup: {
                from: 'tasks',
                localField: 'inProgressSubBoard',
                foreignField: '_id',
                as: 'inProgressSubBoard'
              }
            },
            {
              $lookup: {
                from: 'tasks',
                localField: 'doneSubBoard',
                foreignField: '_id',
                as: 'doneSubBoard'
              }
            }
          ]).toArray();
      return allboards
    }

    async createTaskInBoardById(id: string, newId: ObjectId, title: string, description: string): Promise<any | null> {
      const allboards = await client.db(dataBaseName)
      .collection<any>('tasks').insertOne({
        _id: newId,
        title: title,
        description: description,
        boardId: new ObjectId(id)
        })
      return allboards
    }

    async addTaskInBoardById(id: string, newId: ObjectId, boardName: string): Promise<any | null> {

      const allboards = await client.db(dataBaseName)
      .collection<any>('boards').updateOne(
          { _id: new ObjectId(id) },
          {
            $push: {
              [boardName]: new ObjectId(newId)
            }
          }
        );
      return allboards
    }

    async updateTaskInBoardById(id: string, taskId: string, title: string, description: string): Promise<any | null> {
      const allboards = await client.db(dataBaseName)
      .collection<any>('tasks').updateOne(
          { _id: new ObjectId(taskId) },
          {
            $set: {
              title: title,
              description: description
            }
          }
        );
      return allboards
    }

    async deleteTaskInBoardById(id: string, taskId: string): Promise<any | null> {
      const allboards = await client.db(dataBaseName)
      .collection<any>('tasks').deleteOne(
          { _id: new ObjectId(taskId) }
        );
      return allboards
    }
    
    async updateTaskArrayInBoardById(id: string, taskId: string, title: string, description: string, boardId: string): Promise<any | null> {
      const allboards = await client.db(dataBaseName)
      .collection<any>('tasks').deleteOne(
        { _id: new ObjectId(taskId) }
      );
      
      return allboards
    }

    async deleteTaskFromArrayInBoardById(id: string, taskId: string, title: string, description: string, boardId: string): Promise<any | null> {

      const allboards = await client.db(dataBaseName)
      .collection<any>('boards').updateOne(
        { _id: new ObjectId(boardId) },
        { $pull: {todoSubBoard : new ObjectId(taskId) } })
      
      return allboards
    }

    async createTaskWithId(id: string, title: string, description: string, taskId: string): Promise<any | null> {
      const allboards = await client.db(dataBaseName)
      .collection<any>('tasks').updateOne(
          { _id: new ObjectId(taskId) },
          {
            $set: {
              title: title,
              description: description
            }
          }
        );
      return allboards
    }

    async deleteArrayById(boardId: string): Promise<any | null> {
      const allboards = await client.db(dataBaseName)
      .collection<any>('boards').deleteOne(
          { _id: new ObjectId(boardId) }
        );
      return allboards
    }

    async deleteAllTasksByBoardId(boardId: string): Promise<any | null> {
      const allboards = await client.db(dataBaseName)
      .collection<any>('tasks').deleteMany(
          { boardId: boardId }
        );
      return allboards
    }

    async createBoard(boardId: ObjectId): Promise<any | null> {
      const allboards = await client.db(dataBaseName)
      .collection<any>('boards').insertOne(
          { _id: boardId, todoSubBoard: [], inProgressSubBoard: [], doneSubBoard: [] }
        );
      return allboards
    }

    async decreaseOrderOfRest(boardId: string, arrayName: string, order: string): Promise<any | null> {

      const allboards = await client.db(dataBaseName)
      .collection<any>('tasks').updateMany(
        { boardId: boardId, arrayName : arrayName, order : {$gt : order} },
        { $inc: { order : -1 } }
      );
      return allboards
    }

    async increaseOrderOfBigger(boardId: string, arrayName: string, order: string): Promise<any | null> {
      const allboards = await client.db(dataBaseName)
      .collection<any>('tasks').updateMany(
        { boardId: boardId, arrayName : arrayName, order : {$gte : order} },
        { $inc: { order : +1 } }
      );
      return allboards
    }
}