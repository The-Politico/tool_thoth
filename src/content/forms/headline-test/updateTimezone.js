import slack from 'Utils/slack/index';

const shortLabels = {
  'Eastern Daylight Time': 'EDT',
  'Eastern Standard Time': 'EST',
  'Central Daylight Time': 'CDT',
  'Central Standard Time': 'CST',
  'Mountain Daylight Time': 'MDT',
  'Mountain Standard Time': 'MST',
  'Pacific Daylight Time': 'PDT',
  'Pacific Standard Time': 'PST',
};

const updateTimezone = async function updateTimezone(self, user) {
  const userInfo = await slack.getUserInfo(user);

  const offset = userInfo.user.tz_offset / 60;
  let label = userInfo.user.tz_label;
  if (Object.hasOwnProperty.call(shortLabels, label)) {
    label = shortLabels[label];
  }

  self.updateState({
    tzOffset: offset,
    tzLabel: label,
  });

  return self;
};

export default updateTimezone;
