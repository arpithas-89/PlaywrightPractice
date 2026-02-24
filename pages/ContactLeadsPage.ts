import { Locator, Page, BrowserContext } from "@playwright/test";
import { BrowserInteractionsImp } from '../utils/BrowserInteractionsImp';

export class ContactLeadsPage extends BrowserInteractionsImp {

    readonly page: Page;
    readonly context: BrowserContext;
    readonly contactHeading: Locator;
    readonly addNewContact: Locator;
    readonly deleteContact: Locator;
    readonly addMergeLeads: Locator;
    readonly settings: Locator;
    readonly exportCSV: Locator;
    readonly tableContact_Name: Locator;

    constructor(page: Page, context:BrowserContext) {
        super(page,context);
        this.page = page;
        this.context = context;
        this.contactHeading = page.getByRole('heading', { name: 'Contacts & Leads' });
        this.addNewContact = page.getByRole('link', { name: 'Add New Contact' });
        this.deleteContact = page.locator(`table#contactsTable tbody td button`);
        //this.tableContact_Name = page.locator(`table#contactsTable tbody tr td div p`);
        this.tableContact_Name = page.locator(`//table/tbody/tr[1]/td[1]//div/p[1]`);
        this.addMergeLeads = page.getByRole('button', { name: 'Merge Leads' });
        this.settings = page.locator(`a button svg[data-lucide='settings']`);
        this.exportCSV = page.getByRole('button', { name: 'Export CSV' });
    }

    
}
