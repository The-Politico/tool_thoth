import slack from './init';

const postMessage = function postMessage(payload) {
  const client = slack();

  client.chat.postMessage(payload);
};

export default postMessage;
