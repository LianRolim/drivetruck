import { AngularRotasPage } from './app.po';

describe('angular-rotas App', () => {
  let page: AngularRotasPage;

  beforeEach(() => {
    page = new AngularRotasPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
