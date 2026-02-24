import { Locator, Page, BrowserContext, FrameLocator } from '@playwright/test';

export interface BrowserInteractions {

    click(locator: Locator): Promise<void>;
    type(locator: Locator, value: string): Promise<void>;
    simpleAlert(): Promise<void>;
    promptAlert(data: string): Promise<void>;
    confirmAlert(accept: boolean): Promise<void>;
    selectDropdown(locator: Locator,options: { value?: string; index?: number; label?: string }): Promise<void>;
    selectByValue(locator: Locator, option: string): Promise<void>;
    multipleWindowsCount(): Promise<number>;
    switchToWindow(windowTitle: string, locator: Locator): Promise<Page>;
    switchToExistingWindow(windowTitle: string): Promise<Page>;
    switchToFrame(framelocator: string, name: string): Promise<FrameLocator>;
    uploadFile(locator: Locator, filePath: string):Promise<void>;
    uploadFileChooser(locator: Locator,location:string): Promise<void>;
    downloadFile(locator: Locator): Promise<void>;
    check(locator: Locator): Promise<void>;

}
