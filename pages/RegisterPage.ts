import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import TodoPage from "./TodoPage";
import UserApi from "../apis/UserApi";
import config from "../playwright.config";

export default class RegisterPage {
  //Variables
  private page: Page;
  private request?: APIRequestContext;
  private context?: BrowserContext;

  // Constructor
  constructor(
    page: Page,
    requset?: APIRequestContext,
    context?: BrowserContext
  ) {
    this.page = page;
    this.request = requset;
    this.context = context;
  }

  // Elements
  private get firstNameInput() {
    return '[data-testid="first-name"]';
  }
  private get lastNameInput() {
    return '[data-testid="last-name"]';
  }
  private get emailInput() {
    return '[data-testid="email"]';
  }
  private get passwordInput() {
    return '[data-testid="password"]';
  }
  private get confirmPasswordInput() {
    return '[data-testid="confirm-password"]';
  }
  private get submitButton() {
    return '[data-testid="submit"]';
  }

  // Methods
  async load() {
    await this.page.goto("/signup");
    return this;
  }
  async registerUsingUI(user: User) {
    await this.page.type(this.firstNameInput, user.getFirstName());
    await this.page.type(this.lastNameInput, user.getLastName());
    await this.page.type(this.emailInput, user.getEmail());
    await this.page.type(this.passwordInput, user.getPassword());
    await this.page.type(this.confirmPasswordInput, user.getPassword());
    await this.page.click(this.submitButton);
    return new TodoPage(this.page);
  }
  async registerUsingAPI(user: User) {
    // Register Using API
    const response = await new UserApi(this.request!).register(user);

    // Set Cookies
    const responseBody = await response.json();

    const accessToken = responseBody.access_token;
    const userID = responseBody.userID;
    const firstName = responseBody.firstName;
    user.setAccessToken(accessToken);
    await this.context!.addCookies([
      {
        name: "access_token",
        value: accessToken,
        url: config.use?.baseURL,
      },
      {
        name: "firstName",
        value: firstName,
        url: config.use?.baseURL,
      },
      {
        name: "userID",
        value: userID,
        url: config.use?.baseURL,
      },
    ]);
    return new TodoPage(this.page);
  }
}
