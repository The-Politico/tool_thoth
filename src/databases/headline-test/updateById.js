import { Client as NotionClient } from '@notionhq/client';
import get from 'lodash/get';
import { HEADLINE_TEST_DATABASE } from '../../constants/locations';
import toRichText from '../../utils/notion/toRichText';
import toNotionTime from '../../utils/toNotionTime';

export default async function updateById(id, update) {
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
    throw new Error(`No entry found in database with Form Id: ${id}`);
  }

  const {
    link,
    user,
    publishDate,
    headlines,
    notes,
  } = update;

  const getHeadlineAtIdx = (idx) => (headlines.length > idx
    ? toRichText(headlines[idx]) : undefined);

  await notion.pages.update({
    page_id: pageId,
    properties: {
      Link: toRichText(link),
      'Last Updated By': toRichText(user),
      Notes: toRichText(notes),
      'Headline One': getHeadlineAtIdx(0),
      'Headline Two': getHeadlineAtIdx(1),
      'Headline Three': getHeadlineAtIdx(2),
      'Headline Four': getHeadlineAtIdx(3),
      'Headline Five': getHeadlineAtIdx(4),
      'Headline Six': getHeadlineAtIdx(5),
      'Headline Seven': getHeadlineAtIdx(6),
      'Headline Eight': getHeadlineAtIdx(7),
      'Headline Nine': getHeadlineAtIdx(8),
      'Headline Ten': getHeadlineAtIdx(9),
      'Publish Date': {
        date: {
          start: toNotionTime(publishDate),
        },
      },
    },
  });
}
