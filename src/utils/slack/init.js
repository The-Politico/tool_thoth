import { WebClient } from '@slack/web-api';

const slack = () => {
  const token = process.env.THOTH_SLACK_TOKEN;
  return new WebClient(token);
};

export default slack;
