export default async function handler(
  req: Request
): Promise<Response> {
  return new Response(
    JSON.stringify({
      status: 'ok',
      coach: 'Coach Brill',
      timestamp: new Date().toISOString()
    }),
    { status: 200,
      headers: { 'Content-Type': 'application/json' }
    }
  );
}

export const config = { runtime: 'edge' };
