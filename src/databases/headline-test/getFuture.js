import getDatabse from './get';
import getNextInterval from '../../utils/getNextInterval';

export default async function getFuture() {
  return getDatabse({
    and: [
      {
        property: 'Publish Date',
        date: {
          after: new Date(getNextInterval().getTime() + 60000).toISOString(),
        },
      },
    ],
  });
}
