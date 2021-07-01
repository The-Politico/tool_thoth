import find from 'lodash/find';
import getDatabse from './get';

const getRequestByLink = async function getRequestByLink(link) {
  const data = await getDatabse();
  return find(data, { link });
};

export default getRequestByLink;
