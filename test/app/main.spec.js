import { Application } from 'spectron';
import electronPath from  'electron';
import path from 'path';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

const delay = time => new Promise(resolve => setTimeout(resolve, time));

describe('main window', function spec() {
  beforeAll(async () => {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..', '..', 'app')],
    });
    return this.app.start();
  });

  afterAll(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  // const findCounter = () => this.app.client.element('[data-tid="counter"]');

  /* const findButtons = async () => {
    const { value } = await this.app.client.elements('[data-tclass="btn"]');
    return value.map(btn => btn.ELEMENT);
  }; */

  it('should open window', async () => {
    const { client, browserWindow } = this.app;

    await client.waitUntilWindowLoaded();
    await delay(500);
    const title = await browserWindow.getTitle();
    console.log('title: , ', title);
    expect(title).toBe('SmartDesk3');
  });
});
