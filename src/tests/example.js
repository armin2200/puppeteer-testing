import Page from '../../Builder';

describe('Config test', () => {
  let page;
  beforeAll(async () => {
    page = await Page.build('Desktop');
  });
  afterAll(async () => {
    await page.close();
  });

  it('should load webappsecurity home page', async () => {
    await page.goto('http://zero.webappsecurity.com/');
    const signInButton = await page.isElementVisible('#signin_button');
    expect(signInButton).toBeTruthy();
  });

  it('should display login form', async () => {
    await page.waitAndClick('#signin_button');
    const loginForm = await page.isElementVisible('#login_form');
    expect(loginForm).toBeTruthy();
    const signInButton = await page.isElementVisible('#signin_button');
    expect(signInButton).toBeFalsy();
  });

  it('should login to application', async () => {
    await page.waitAndType('#user_login', 'username');
    await page.waitAndType('#user_password', 'password');
    await page.waitAndClick('.btn-primary');
    const navbar = await page.isElementVisible('.nav-tabs');
    expect(navbar).toBeTruthy();
  });

  it('should have 6 navbar links', async () => {
    const navbarLinksCount = await page.getCount('.nav-tabs li');
    expect(navbarLinksCount).toEqual(6);
  });
});
