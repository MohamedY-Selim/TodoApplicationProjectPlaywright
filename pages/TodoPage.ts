import { Page } from "@playwright/test";
import User from "../models/User";
import NewTodoPage from "./NewTodoPage";

export default class TodoPage {
  //Variables
  private page: Page;

  // Constructor
  constructor(page: Page) {
    this.page = page;
  }

  // Elements
  private get welcomeMessage() {
    return '[data-testid="welcome"]';
  }
  private get addTodoButton() {
    return '[data-testid="add"]';
  }
  private get todoText() {
    return '[data-testid="todo-text"]';
  }
  private get deleteTodoButton() {
    return '[data-testid="delete"]';
  }
  private get noTodosMessage() {
    return '[data-testid="no-todos"]';
  }
  //   Methods
  async load() {
    await this.page.goto("/todo");
    return this;
  }
  async getWelcomeMessage() {
    return this.page.locator(this.welcomeMessage);
  }
  async clickOnAddTodoButton() {
    await this.page.click(this.addTodoButton);
    return new NewTodoPage(this.page);
  }
  async getTodoText(index: number) {
    return await this.page.locator(this.todoText).nth(index).innerText();
  }
  async deleteTodo(index: number) {
    await this.page.locator(this.deleteTodoButton).nth(index).click();
    return this;
  }
  async getNoTodosMessage() {
    return this.page.locator(this.noTodosMessage);
  }
}
