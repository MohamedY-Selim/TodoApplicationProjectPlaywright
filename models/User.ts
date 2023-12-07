import { faker } from "@faker-js/faker";

export default class User {
  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;
  private access_token: string;
  private userID: string;

  constructor() {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.email = faker.internet.exampleEmail();
    this.password = faker.internet.password();
  }

  getFirstName() {
    return this.firstName;
  }
  getLastName() {
    return this.lastName;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
  getAccessToken() {
    return this.access_token;
  }
  setAccessToken(access_token: string) {
    this.access_token = access_token;
  }
}
