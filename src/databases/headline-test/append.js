import { Client as NotionClient } from '@notionhq/client';
import toRichText from '../../utils/notion/toRichText';
import toTitleText from '../../utils/notion/toTitleText';
import toNotionTime from '../../utils/toNotionTime';

import { HEADLINE_TEST_DATABASE } from '../../constants/locations';

export default async function appendToDatabase(row) {
  const {
    id,
    link,
    user,
    publishDate,
    headlines = [],
    notes,
  } = row;

  const notion = new NotionClient({
    auth: process.env.NOTION_TOKEN,
  });

  const getHeadlineAtIdx = (idx) => (headlines.length > idx
    ? toRichText(headlines[idx]) : undefined);

  await notion.pages.create({
    parent: {
      database_id: HEADLINE_TEST_DATABASE(),
    },
    properties: {
      'Form Id': toTitleText(id),
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
