export default function invalidAuth() {
  return [
    null,
    {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Server Error',
        message: 'An unknow server error occured. Check logs for more.',
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    },
  ];
}
