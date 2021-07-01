export default function invalidAuth() {
  return [
    null,
    {
      statusCode: 403,
      body: JSON.stringify({
        error: 'Forbidden',
        message: 'Invalid authentication token provided.',
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    },
  ];
}
