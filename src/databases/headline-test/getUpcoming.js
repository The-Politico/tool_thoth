import getNextInterval from '../../utils/getNextInterval';
import getDatabse from './get';

export default async function getUpcoming() {
  return getDatabse({
    and: [
      {
        property: 'Publish Date',
        date: {
          after: new Date().toISOString(),
        },
      },
      {
        property: 'Publish Date',
        date: {
          before: getNextInterval().toISOString(),
        },
      },
    ],

  });
}
