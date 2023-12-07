import { test, expect } from "@playwright/test";
import User from "../models/User";
import RegisterPage from "../pages/RegisterPage";

test("Should be able to register to the todo website", async ({ page }) => {
  const user = new User();

  const registerPage = new RegisterPage(page);
  const welcomeMessage = await (
    await (await registerPage.load()).registerUsingUI(user)
  ).getWelcomeMessage();

  await expect(welcomeMessage).toBeVisible();
});
