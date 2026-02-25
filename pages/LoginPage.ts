import { Page, Locator, BrowserContext } from "@playwright/test"
import { BrowserInteractionsImp } from '../utils/BrowserInteractionsImp';
import { HomePage } from './HomePage';

export class LoginPage extends BrowserInteractionsImp {

    readonly page: Page;
    readonly context: BrowserContext;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.page = page;
        this.context = context;
        this.userName = page.getByRole('textbox', { name: 'Username' })
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Sign In' });
    }


    async enterUsername(username: string): Promise<void> {

        await this.type(this.userName, username);

    }

    async enterPassword(password: string): Promise<void> {

        await this.type(this.password, password);
    }

    async clickLogin():Promise<HomePage>{

        await this.click(this.loginButton);
        return new HomePage(this.page, this.context);
    }

     async clickLogin1():Promise<HomePage>{

        await this.click(this.loginButton);
        return new HomePage(this.page, this.context);
    }
}
