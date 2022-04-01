import getDatabse from './get';

export default async function getById(id) {
  const data = await getDatabse({
    property: 'Form Id',
    rich_text: {
      equals: id,
    },
  });

  return data[0];
}
