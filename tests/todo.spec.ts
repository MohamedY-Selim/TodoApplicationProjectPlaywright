import { test, expect } from "@playwright/test";
import User from "../models/User";
import TodoApi from "../apis/TodoApi";
import RegisterPage from "../pages/RegisterPage";
import NewTodoPage from "../pages/NewTodoPage";
import Todo from "../models/Todo";
import TodoPage from "../pages/TodoPage";
test.describe("Todos Test Cases", () => {
  let user: User;
  let todo: Todo;
  test.beforeEach(async ({ page, request, context }) => {
    // Create User
    user = new User();

    // Create Todo
    todo = new Todo();

    // Register Using the API
    await new RegisterPage(page, request, context).registerUsingAPI(user);
  });
  test("should be able to add a todo", async ({ page, request, context }) => {
    const todoText = await (
      await // New Object of TodoPage
      (
        await (
          await new TodoPage(page)
            // Load NewTodoPage
            .load()
        )
          // Click on AddTodoButton
          .clickOnAddTodoButton()
      )
        // Fill Todo Fields using UI
        .addNewTodoUsingUI(todo.getTodo())
    )
      // Get TodoText
      .getTodoText(0);
    // Assert TodoText
    expect(todoText).toEqual(todo.getTodo());
  });

  test("should be able to delete a todo", async ({
    page,
    request,
    context,
  }) => {
    const noTodosMessage = await (
      await (
        await // New Object of NewTodoPage
        (
          await new NewTodoPage(page, request)
            // Add Todo using the API!
            .addNewTodoUsingAPI(user, todo)
        )
          // Load TodoPage
          .load()
      )
        // Delete Todo
        .deleteTodo(0)
    )
      // Get NoTodosMessage
      .getNoTodosMessage();
    // Assert that NoTodosMessage is Visible
    await expect(noTodosMessage).toBeVisible();
  });
});
