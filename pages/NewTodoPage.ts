import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import TodoPage from "./TodoPage";
import TodoApi from "../apis/TodoApi";
import Todo from "../models/Todo";

export default class NewTodoPage {
  //   Variables
  private page: Page;
  private request?: APIRequestContext;
  private context?: BrowserContext;

  // Constructor
  constructor(
    page: Page,
    request?: APIRequestContext,
    context?: BrowserContext
  ) {
    this.page = page;
    this.request = request;
    this.context = context;
  }

  // Elements
  private get newTodoInput() {
    return '[data-testid="new-todo"]';
  }
  private get submitButton() {
    return '[data-testid="submit-newTask"]';
  }

  // Methods
  async load() {
    await this.page.goto("/todo/new");
    return this;
  }
  async addNewTodoUsingUI(todo: string) {
    await this.page.type(this.newTodoInput, todo);
    await this.page.click(this.submitButton);
    return new TodoPage(this.page);
  }
  async addNewTodoUsingAPI(user: User, todo: Todo) {
    await new TodoApi(this.request!).addTodo(user, todo);
    return new TodoPage(this.page);
  }
}
