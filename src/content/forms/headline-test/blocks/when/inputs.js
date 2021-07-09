import flatten from 'lodash/flatten';
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
      type: 'static_select',
      action_id: HT_SCHEDULED_TIME_UPDATE,
      placeholder: {
        type: 'plain_text',
        text: 'Select time',
      },
      options: flatten([
        ...new Array(12).fill(undefined).map((_, idx) => {
          const baseLabelTime = idx === 0 ? 12 : idx;

          return [
            {
              text: {
                type: 'plain_text',
                text: `${baseLabelTime}:00 AM`,
              },
              value: `${idx}:00`,
            },
            {
              text: {
                type: 'plain_text',
                text: `${baseLabelTime}:30 AM`,
              },
              value: `${idx}:30`,
            },
          ];
        }),
        ...new Array(12).fill(undefined).map((_, idx) => {
          const baseLabelTime = idx === 0 ? 12 : idx;

          return [
            {
              text: {
                type: 'plain_text',
                text: `${baseLabelTime}:00 PM`,
              },
              value: `${idx + 12}:00`,
            },
            {
              text: {
                type: 'plain_text',
                text: `${baseLabelTime}:30 PM`,
              },
              value: `${idx + 12}:30`,
            },
          ];
        }),
      ]),
      initial_option: initialTime,
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
