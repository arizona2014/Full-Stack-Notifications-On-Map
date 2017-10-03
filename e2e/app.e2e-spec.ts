import { MySGELPage } from './app.po';

describe('my-sgel App', () => {
  let page: MySGELPage;

  beforeEach(() => {
    page = new MySGELPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
