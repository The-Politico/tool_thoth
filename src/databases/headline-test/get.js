import { Client as NotionClient } from '@notionhq/client';
import fromText from '../../utils/notion/fromText';
import fromSelect from '../../utils/notion/fromSelect';
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
    id: fromText(row.properties['Form Id'].title),
    link: fromText(row.properties.Link.rich_text),
    user: fromText(row.properties['Last Updated By'].rich_text),
    publishDate: new Date(row.properties['Publish Date'].date.start),
    notes: fromText(row.properties.Notes.rich_text),
    notification: fromText(row.properties.Notification.rich_text),
    status: fromSelect(row.properties.Status),
    headlines: [
      fromText(row.properties['Headline One'].rich_text),
      fromText(row.properties['Headline Two'].rich_text),
      fromText(row.properties['Headline Three'].rich_text),
      fromText(row.properties['Headline Four'].rich_text),
      fromText(row.properties['Headline Five'].rich_text),
      fromText(row.properties['Headline Six'].rich_text),
      fromText(row.properties['Headline Seven'].rich_text),
      fromText(row.properties['Headline Eight'].rich_text),
      fromText(row.properties['Headline Nine'].rich_text),
      fromText(row.properties['Headline Ten'].rich_text),
    ].filter((h) => !!h),
  }));
}
