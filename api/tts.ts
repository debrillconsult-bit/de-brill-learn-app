export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const { text } = await req.json();
    if (!text || typeof text !== 'string') {
      return new Response(JSON.stringify({ error: 'text required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const cleanText = text.slice(0, 200);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 100,
        messages: [
          {
            role: 'user',
            content:
              'Say only this word or phrase naturally in British English, nothing else: ' +
              cleanText,
          },
        ],
      }),
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'TTS failed' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(
      JSON.stringify({
        message: 'Use Web Speech API',
        text: cleanText,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'TTS error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export const config = { runtime: 'edge' };
