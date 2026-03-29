export default async function handler(
  req: Request
): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const { text } = await req.json();
    if (!text || typeof text !== 'string') {
      return new Response(
        JSON.stringify({ error: 'text required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const cleanText = text.slice(0, 200).trim();

    // Use Google Translate TTS as free fallback
    const ttsUrl =
      'https://translate.google.com/translate_tts' +
      '?ie=UTF-8&q=' +
      encodeURIComponent(cleanText) +
      '&tl=en-GB&client=tw-ob';

    const ttsResponse = await fetch(ttsUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; DeBrillLearn)',
        'Referer':
          'https://de-brill-learn-app.vercel.app'
      }
    });

    if (!ttsResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'TTS failed' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const audioBuffer = await ttsResponse.arrayBuffer();

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('TTS error:', error);
    return new Response(
      JSON.stringify({ error: 'TTS error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export const config = { runtime: 'edge' };
