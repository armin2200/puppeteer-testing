import Page from '../../Builder';
import { mdpUrls } from "../../urls";

describe('Config test', () => {
    let page;
    const pageOption = { waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'] }
    beforeAll(async () => {
        page = await Page.build('Desktop');
    });
    afterAll(async () => {
        await page.close();
    });
    for (let url of mdpUrls) {
        it('should Home page  load successfully', async () => {
            await page.goto(url);
            await page.waitForSelector('.header_container')
            const searchWidget = await page.isElementVisible('#search_widget');
            expect(searchWidget).toBeTruthy();
        });

        //other tests ...
    }
})

