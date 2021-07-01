import slack from './init';

const dm = async function dm(user, msg) {
  const client = slack();

  const convoResp = await client.conversations.open({
    users: user,
  });

  if (!convoResp.ok) {
    throw new Error(convoResp.error);
  }

  const channel = convoResp.channel.id;

  const postResp = await client.chat.postMessage({
    channel,
    ...msg,
  });

  if (!postResp.ok) {
    throw new Error(postResp.error);
  }

  return postResp;
};

export default dm;
