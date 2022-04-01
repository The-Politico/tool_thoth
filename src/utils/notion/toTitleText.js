export default function toTitleText(text) {
  return {
    title: [
      {
        text: {
          content: text ? `${text}` : '',
        },
      },
    ],
  };
}
