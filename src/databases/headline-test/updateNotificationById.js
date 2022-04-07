import { Client as NotionClient } from '@notionhq/client';
import get from 'lodash/get';
import { HEADLINE_TEST_DATABASE } from '../../constants/locations';
import toRichText from '../../utils/notion/toRichText';

export default async function updateNotificationById(
  id,
  messagets,
  { updateStatus = true } = {},
) {
  const notion = new NotionClient({
    auth: process.env.NOTION_TOKEN,
  });

  const data = await notion.databases.query({
    database_id: HEADLINE_TEST_DATABASE(),
    filter: {
      property: 'Form Id',
      rich_text: {
        equals: id,
      },
    },
  });

  const pageId = get(data, 'results.0.id');
  if (!pageId) {
    throw new Error(`No entry found in database with Form Id: ${pageId}`);
  }

  const update = {
    page_id: pageId,
    properties: {
      Notification: toRichText(messagets),
    },
  };

  if (updateStatus) {
    update.properties.Status = {
      select: {
        name: 'Notified',
      },
    };
  }

  await notion.pages.update(update);
}
