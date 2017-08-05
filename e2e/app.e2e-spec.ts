import { Ngcli127Page } from './app.po';

describe('ngcli127 App', () => {
  let page: Ngcli127Page;

  beforeEach(() => {
    page = new Ngcli127Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
