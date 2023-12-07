import { APIRequestContext } from "@playwright/test";
import User from "../models/User";
import Todo from "../models/Todo";

export default class TodoApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async addTodo(user: User, todo: Todo) {
    return await this.request.post("api/v1/tasks", {
      data: {
        isCompleted: todo.getIsComplete(),
        item: todo.getTodo(),
      },
      headers: {
        Authorization: `Bearer ${user.getAccessToken()}`,
      },
    });
  }
}
