import { Client as NotionClient } from '@notionhq/client';
import fromText from '../../utils/notion/fromText';
import fromSelect from '../../utils/notion/fromSelect';
import getProperty from '../../utils/notion/getProperty';
import { HEADLINE_TEST_DATABASE } from '../../constants/locations';

export default async function getDatabse(filter) {
  const notion = new NotionClient({
    auth: process.env.NOTION_TOKEN,
  });

  const data = await notion.databases.query({
    database_id: HEADLINE_TEST_DATABASE(),
    filter,
  });

  return data.results.map((row) => ({
    id: fromText(getProperty(row, 'Form Id', 'title')),
    link: fromText(getProperty(row, 'Link', 'rich_text')),
    user: fromText(getProperty(row, 'Last Updated By', 'rich_text')),
    publishDate: new Date(getProperty(row, 'Publish Date', 'date.start')),
    notes: fromText(getProperty(row, 'Notes', 'rich_text')),
    notification: fromText(getProperty(row, 'Notification', 'rich_text')),
    status: fromSelect(row.properties.Status),
    headlines: [
      fromText(getProperty(row, 'Headline One', 'rich_text')),
      fromText(getProperty(row, 'Headline Two', 'rich_text')),
      fromText(getProperty(row, 'Headline Three', 'rich_text')),
      fromText(getProperty(row, 'Headline Four', 'rich_text')),
      fromText(getProperty(row, 'Headline Five', 'rich_text')),
      fromText(getProperty(row, 'Headline Six', 'rich_text')),
      fromText(getProperty(row, 'Headline Seven', 'rich_text')),
      fromText(getProperty(row, 'Headline Eight', 'rich_text')),
      fromText(getProperty(row, 'Headline Nine', 'rich_text')),
      fromText(getProperty(row, 'Headline Ten', 'rich_text')),
    ].filter((h) => !!h),
  }));
}
