import {
  HT_SCHEDULED_DATE_UPDATE,
  HT_SCHEDULED_TIME_UPDATE,
  HT_NOW_ASAP_CLICK,
} from 'Constants/actions';

export default (initialDate, initialTime) => ({
  block_id: 'when:inputs',
  type: 'actions',
  elements: [
    {
      type: 'datepicker',
      action_id: HT_SCHEDULED_DATE_UPDATE,
      placeholder: {
        type: 'plain_text',
        text: 'Select a date',
      },
      initial_date: initialDate,
    },
    {
      type: 'timepicker',
      action_id: HT_SCHEDULED_TIME_UPDATE,
      placeholder: {
        type: 'plain_text',
        text: 'Select time',
      },
      initial_time: initialTime,
    },
    {
      type: 'button',
      text: {
        type: 'plain_text',
        text: 'Now / ASAP',
      },
      value: HT_NOW_ASAP_CLICK,
      action_id: HT_NOW_ASAP_CLICK,
    },
  ],
});
