import getDatabse from './get';

export default async function getUpcoming() {
  return getDatabse({
    property: 'Publish Date',
    date: {
      after: new Date().toISOString(),
    },
  });
}
