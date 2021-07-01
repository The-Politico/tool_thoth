import slack from './init';

const newForm = async function newForm(
  {
    trigger,
    view,
    push = false,
  } = {},
) {
  if (!trigger) {
    throw new Error(
      'No trigger provided. Must have a trigger to open a modal.',
    );
  }

  const client = slack();

  let postResp;
  if (push) {
    postResp = await client.views.push({
      trigger_id: trigger,
      view,
    });
  } else {
    postResp = await client.views.open({
      trigger_id: trigger,
      view,
    });
  }

  if (!postResp.ok) {
    throw new Error(postResp.error);
  }

  return postResp;
};

export default newForm;
