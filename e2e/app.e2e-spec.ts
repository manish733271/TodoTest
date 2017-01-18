import { AngnodPage } from './app.po';

describe('angnod App', function() {
  let page: AngnodPage;

  beforeEach(() => {
    page = new AngnodPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
