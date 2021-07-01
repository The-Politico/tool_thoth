export default function badRequest(e) {
  return [
    null,
    {
      statusCode: e.statusCode || 400,
      body: JSON.stringify({
        error: e.name || 'Unknown Error',
        message: e.message,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    },
  ];
}
