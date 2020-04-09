import Page from '../../Builder';

describe('Config test', () => {
    let page;
    const pageOption = { waitUntil: ['load', 'domcontentloaded', 'networkidle0', 'networkidle2'] }
    beforeAll(async () => {
        page = await Page.build('Desktop');
    });
    afterAll(async () => {
        await page.close();
    });
    it('should Home page  load successfully', async () => {
        await page.goto('https://glbecom-uat2-wcs.inc.hp.com/us/en/mdp/business-solutions/elitedesk-700-mini?etr_pdp=true');
        await page.waitForSelector('.header_container')
        const searchWidget = await page.isElementVisible('#search_widget');
        expect(searchWidget).toBeTruthy();
    });

})

