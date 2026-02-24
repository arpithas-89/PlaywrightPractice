import test from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { URLConstants } from "../constants/urlConstants";
import { credentials } from "../constants/credentialsData";

test('Login',async ({page,context})=>{

    await page.goto(URLConstants.adminURL);

    const loginPage = new LoginPage(page,context);
    await loginPage.enterUsername(credentials.ADMINLOGIN.username);
    await loginPage.enterPassword(credentials.ADMINLOGIN.password);
    const homePage = await loginPage.clickLogin();

    //await page.pause();
})