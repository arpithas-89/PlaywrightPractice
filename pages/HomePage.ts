import { Locator, Page, BrowserContext } from "@playwright/test";
import { BrowserInteractionsImp } from '../utils/BrowserInteractionsImp';
import { ContactLeadsPage } from "./ContactLeadsPage";

export class HomePage extends BrowserInteractionsImp {

    readonly page: Page;
     readonly context: BrowserContext;
    readonly dashboardLocator: Locator;
    readonly contactClick: Locator;


    constructor(page: Page, context:BrowserContext) {
        super(page,context);
        this.page = page;
        this.context = context;
        this.dashboardLocator = page.getByRole('heading', { name: 'Dashboard Overview' });
        this.contactClick = page.getByRole('link', { name: 'Contacts / Leads' });

    }

    async verifyHeading(): Promise<Locator> {
        return this.dashboardLocator;
    }

    async clickContacts(): Promise<ContactLeadsPage> {
        await this.click(this.contactClick);
        return new ContactLeadsPage(this.page,this.context);
    }


}