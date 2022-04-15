/* No Tests Yet */

import expect from 'expect.js';
import dotenv from 'dotenv';
import find from 'lodash/find';
import toDisplayTime from '../src/utils/toDisplayTime';
import toDisplayDate from '../src/utils/toDisplayDate';

import database from '../src/databases';

dotenv.config();

process.env.TESTING = 'true';
process.env.HEADLINE_TEST_DATABASE = '4f6e61f23b1241aab3f54bf4607ba132';

describe('Database', () => {
  it('Gets data from a database', async () => {
    const data = await database.headlineTest.get();
    const testRow = find(data, { id: 'V038Z09UVQE' });

    expect(testRow.id).to.be('V038Z09UVQE');
    expect(testRow.link).to.be('https://cms.politico.com/cms/hello-world/');
    expect(testRow.user).to.be('Andrew Briz');
    expect(testRow.notes).to.be('');
    expect(testRow.headlines[0]).to.be('One');
    expect(testRow.headlines.length).to.be(3);

    expect(
      testRow.publishDate.getTime(),
    ).to.be(
      (new Date('March 29, 2022 10:00 AM EDT').getTime()),
    );
  });

  it('Gets data from a database with link', async () => {
    const data = await database.headlineTest.getByLink('https://cms.politico.com/cms/hello-world/');

    expect(data.id).to.be('V038Z09UVQE');
  });

  it('Returns undefined when no row with link found', async () => {
    const data = await database.headlineTest.getByLink('https://cms.politico.com/cms/this-link-doesnt-exist/');
    expect(data).to.be(undefined);
  });

  it('Appends and updates a row', async () => {
    const publishDate = new Date();
    const publishDateISO = publishDate.toISOString();

    const id = `V-${publishDateISO}`;
    const link = `https://cms.politico.com/cms/test-${publishDateISO}`;
    const user = 'Test Bot';
    const notes = `This test was run at ${toDisplayTime(publishDate)} on ${toDisplayDate(publishDate)}.`;
    const headlines = Array
      .from({ length: Math.round(Math.random() * 10) })
      .map((_, idx) => `Headline - ${toDisplayDate(publishDate)} - ${toDisplayTime(publishDate)} - ${idx + 1}`);

    await database.headlineTest.append({
      id,
      link,
      user,
      notes,
      headlines,
      publishDate: new Date(publishDate),
    });

    const checkData = await database.headlineTest.getByLink(link);

    expect(checkData.id).to.be(id);
    expect(checkData.user).to.be(user);
    expect(checkData.notes).to.be(notes);
    expect(checkData.headlines.length).to.be(headlines.length);

    const updatedNote = `${notes} And updated again at ${new Date().toISOString()}.`;

    await database.headlineTest.updateById(id, {
      id,
      link,
      user,
      notes: updatedNote,
      headlines,
      publishDate: new Date(publishDate),
    });

    const updatedCheckData = await database.headlineTest.getById(id);
    expect(updatedCheckData.notes).to.be(updatedNote);
  });

  it('Updates the row\'s status', async () => {
    const publishDate = new Date();
    const publishDateISO = publishDate.toISOString();

    const id = `VS-${publishDateISO}`;

    await database.headlineTest.append({
      id,
      publishDate: new Date(publishDate),
    });

    const notificationTs = `${publishDate.getTime()}`;
    await database.headlineTest.updateNotificationById(
      id, notificationTs,
    );

    const checkData = await database.headlineTest.getById(id);
    expect(checkData.status).to.be('Notified');
    expect(checkData.notification).to.be(notificationTs);

    await database.headlineTest.updateStatusByNotification(
      notificationTs, 'Scheduled',
    );
    const secondCheckData = await database.headlineTest.getById(id);
    expect(secondCheckData.status).to.be('Scheduled');

    await database.headlineTest.updateStatusByNotification(
      notificationTs, 'Complete',
    );
    const thirdCheckData = await database.headlineTest.getById(id);
    expect(thirdCheckData.status).to.be('Complete');
  });

  it('Gets upcoming tests', async () => {
    const publishDate = new Date(new Date().getTime() + 100000);
    const publishDateISO = publishDate.toISOString();

    const id = `VU-${publishDateISO}`;
    const link = `https://cms.politico.com/cms/test-upcoming-${publishDateISO}`;
    const user = 'Test Bot';
    const notes = `This test was run at ${toDisplayTime(publishDate)} on ${toDisplayDate(publishDate)}.`;
    const headlines = Array
      .from({ length: Math.round(Math.random() * 10) })
      .map((_, idx) => `Headline - ${toDisplayDate(publishDate)} - ${toDisplayTime(publishDate)} - ${idx + 1}`);

    await database.headlineTest.append({
      id,
      link,
      user,
      notes,
      headlines,
      publishDate,
    });

    const data = await database.headlineTest.getUpcoming();
    expect(!!data.find((test) => test.id === id)).to.be(true);
  });

  it('Gets editable tests', async () => {
    const futureStoryId = 'V03B1RMU1CX';
    const data = await database.headlineTest.getFuture();
    expect(!!data.find((test) => test.id === futureStoryId)).to.be(true);
  });
});
