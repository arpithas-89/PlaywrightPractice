import { Locator, Page, BrowserContext, FrameLocator } from '@playwright/test';
import { BrowserInteractions } from "./BrowserIntereactions";
import path from 'path';


export class BrowserInteractionsImp implements BrowserInteractions {

    page: Page;
    context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async click(locator: Locator): Promise<void> {
        await locator.click();
    }

    async type(locator: Locator, value: string): Promise<void> {
        await locator.fill(value);
    }

    async simpleAlert(): Promise<void> {
        this.page.on('dialog', async (alert) => {
            await alert.accept();
        });
    }

    async promptAlert(data: string): Promise<void> {
        this.page.on("dialog", async (alert) => {
            await alert.accept(data);
        });
    }

    async confirmAlert(accept: boolean = true): Promise<void> {
        this.page.on('dialog', async (alert) => {
            if (accept) {
                await alert.accept();   // OK
            } else {
                await alert.dismiss();  // Cancel
            }
        });
    }

    async selectDropdown(locator: Locator, options: { value?: string; index?: number; label?: string }): Promise<void> {
        await locator.selectOption(options);
    }

    async selectByValue(locator: Locator, option: string): Promise<void> {
        await locator.selectOption({ value: option });
    }

    /**
    * Returns the number of open windows.
    */
    async multipleWindowsCount(): Promise<number> {

        return this.page.context().pages().length;
    }

    /**
     * Switches to a new window based on title.
     */
    async switchToWindow(windowTitle: string, locator: Locator): Promise<Page> {

        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'),
            locator.click()
        ]);
        for (const page of newPage.context().pages()) {
            if ((await page.title()).includes(windowTitle)) {
                await page.bringToFront();
                return page;
            }
        }
        throw new Error(`New page with title: ${windowTitle} not displayed`);

    }

    async switchToExistingWindow(windowTitle: string): Promise<Page> {
        for (const page of this.context.pages()) {
            if ((await page.title()).includes(windowTitle)) {
                await page.bringToFront();
                return page;
            }
        }
        throw new Error(`Window with title '${windowTitle}' not found`);
    }

    /**
        * Switches to an iframe and returns FrameLocator.
        */
    async switchToFrame(framelocator: string, name: string): Promise<FrameLocator> {

        await this.page.waitForSelector(framelocator, { state: "attached", timeout: 5000 });
        return this.page.frameLocator(framelocator);

    }


    /**
     * Uploads a file using <input type="file"> element.
     */
    async uploadFile(locator: Locator, filePath: string):Promise<void> {
       
            const absolutePath = path.resolve(__dirname, filePath);
            await locator.waitFor({ state: 'visible' });
            await locator.setInputFiles(absolutePath);
 
    }

        async uploadFileChooser(locator: Locator,location:string): Promise<void> {

        const uploadPromise = this.page.waitForEvent('filechooser');
        await this.click(locator);
        const upFile = await uploadPromise;
        await upFile.setFiles(path.join(__dirname,`${location}`))
    }

    /**
    * Download a file element.
    */
    async downloadFile(locator: Locator): Promise<void> {
        const downPromise = this.page.waitForEvent('download');
        await this.click(locator);
        const downFile = await downPromise;
        await downFile.saveAs('../resources/' + downFile.suggestedFilename());
    }

    /**
     * Radio button or Checkbox
     */
    async check(locator: Locator): Promise<void> {
        await locator.check();
    }


}
