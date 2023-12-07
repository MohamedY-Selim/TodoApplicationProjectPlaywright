import { faker } from "@faker-js/faker";

export default class Todo {
  private todo: string;
  private isCompleted: boolean;
  constructor() {
    this.todo = faker.lorem.word();
    this.isCompleted = false;
  }

  getTodo() {
    return this.todo;
  }
  getIsComplete() {
    return this.isCompleted;
  }
}
