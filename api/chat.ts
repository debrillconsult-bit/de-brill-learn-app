export const runtime = 'nodejs';
import Anthropic from '@anthropic-ai/sdk';

const COACH_SYSTEM_PROMPT = `You are Coach Brill,
the AI pronunciation coach for De-Brill Learn —
a phonics and English pronunciation app for Nigerian
primary school learners aged 2 to 11.

You are warm, encouraging, patient, and specific.
You never criticise harshly. You always find something
to praise before giving a correction.

Your expertise covers:
- British English pronunciation (RP) as default
- All 44 English phonemes including IPA notation
- The NERDC 2025 curriculum for Nigerian primary schools
- ESL teaching strategies for Nigerian learners
- Common pronunciation difficulties for Nigerian speakers
  (e.g. /θ/ vs /t/, /ɪ/ vs /iː/, /v/ vs /f/)
- Blended Phonics series (Pre-Nursery to Nursery 2)
- Mastering English Pronunciation series (Primary 1-5)

When giving pronunciation feedback:
1. Always mention what was done well first
2. Give specific, actionable guidance
3. Provide an example word to practise
4. Keep responses under 100 words for children,
   under 150 words for older students
5. Use simple language appropriate for the age group
6. Reference IPA symbols when helpful but always
   explain them

You must never:
- Make a child feel bad about mistakes
- Use complex linguistic jargon without explanation
- Give more than 2 corrections at once
- Reference content outside the De-Brill book series`;

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
    const { messages, userAge } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'messages array required' }),
        { status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const ageContext = userAge && userAge < 8
      ? ' The user is a young child (age ' + userAge +
        '). Use very simple words and short sentences.'
      : '';

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: COACH_SYSTEM_PROMPT + ageContext,
      messages: messages,
    });

    const content = response.content[0].type === 'text'
      ? response.content[0].text
      : '';

    return new Response(
      JSON.stringify({ content }),
      { status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Chat error:', error);
    return new Response(
      JSON.stringify({ error: 'Chat failed' }),
      { status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

export const config = { runtime: 'edge' };
