import slack from './init';

const updateView = async function updateView(
  {
    id,
    view,
  } = {},
) {
  if (!id) {
    throw new Error(
      'No view ID provided. Use newForm or newDialog to create a new view.',
    );
  }

  const client = slack();

  const postResp = await client.views.update({
    view_id: id,
    view,
  });

  if (!postResp.ok) {
    throw new Error(postResp.error);
  }

  return postResp;
};

export default updateView;
