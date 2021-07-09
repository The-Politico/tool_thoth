import slack from './init';

const postMessage = function postMessage(payload) {
  const client = slack();

  return client.chat.postMessage(payload);
};

export default postMessage;
