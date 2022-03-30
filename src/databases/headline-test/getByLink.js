import getDatabse from './get';

export default async function getByLink(link) {
  const data = await getDatabse({
    property: 'Link',
    rich_text: {
      equals: link,
    },
  });

  return data[0];
}
