import Anthropic from '@anthropic-ai/sdk';

const COACH_SYSTEM_PROMPT = `You are Coach Brill,
the AI pronunciation coach for De-Brill Learn.
You are warm, encouraging, patient, and specific.
You never criticise harshly. Always praise first,
then give one clear correction with a practical tip.
Keep responses under 80 words. End with encouragement.
Use British English (RP) as default.`;

export default async function handler(
  req: Request
): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    const {
      targetText,
      targetIPA,
      userTranscription,
      soundFocus,
      bookLevel
    } = await req.json();

    if (!targetText) {
      return new Response(
        JSON.stringify({ error: 'targetText required' }),
        { status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const prompt = `A student is practising this sentence:
"${targetText}"
IPA transcription: ${targetIPA || 'not provided'}
Sound focus: ${soundFocus || 'general pronunciation'}
Book level: ${bookLevel || 'MEP Primary 1'}
${userTranscription
  ? 'The student said: "' + userTranscription + '"'
  : 'The student just completed a recording attempt.'}

Give warm, specific pronunciation feedback.
Mention what was likely done well, identify one key
area to improve, give one practical tip.
Keep it under 80 words. End with encouragement.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      system: COACH_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt }],
    });

    const feedback = response.content[0].type === 'text'
      ? response.content[0].text
      : 'Great effort! Keep practising.';

    return new Response(
      JSON.stringify({ feedback }),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Pronunciation feedback error:', error);
    return new Response(
      JSON.stringify({ error: 'Feedback generation failed' }),
      { status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export const config = { runtime: 'edge' };
