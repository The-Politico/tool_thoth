import { Client as NotionClient } from '@notionhq/client';
import get from 'lodash/get';
import { HEADLINE_TEST_DATABASE } from '../../constants/locations';

export default async function updateStatusByNotification(
  messagets,
  status,
) {
  const notion = new NotionClient({
    auth: process.env.NOTION_TOKEN,
  });

  const data = await notion.databases.query({
    database_id: HEADLINE_TEST_DATABASE(),
    filter: {
      property: 'Notification',
      rich_text: {
        equals: messagets,
      },
    },
  });

  const pageId = get(data, 'results.0.id');
  if (!pageId) {
    const e = new Error(`No entry found in database with Form Id: ${pageId}`);
    e.errorCode = '404';
    throw e;
  }

  await notion.pages.update({
    page_id: pageId,
    properties: {
      Status: {
        select: {
          name: status,
        },
      },
    },
  });
}
