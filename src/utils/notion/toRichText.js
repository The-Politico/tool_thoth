export default function toRichText(text) {
  return {
    rich_text: [
      {
        text: {
          content: text ? `${text}` : '',
        },
      },
    ],
  };
}
