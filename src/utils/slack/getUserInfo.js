import slack from './init';

const getUserInfo = async function getUserInfo(id) {
  if (!id) {
    throw new Error(
      'No User ID provided.',
    );
  }

  const client = slack();

  const postResp = await client.users.info({
    user: id,
  });

  if (!postResp.ok) {
    throw new Error(postResp.error);
  }

  return postResp;
};

export default getUserInfo;
