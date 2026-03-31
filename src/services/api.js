const WORKER_URL = 'https://vellumere-api.vellumere.workers.dev'
const MODEL = 'claude-sonnet-4-20250514'

export async function query({ systemPrompt, userMessage, maxTokens = 4096 }) {
  const response = await fetch(WORKER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error?.message || `API error: ${response.status}`)
  }

  const data = await response.json()

  // Worker may return 200 even for Anthropic API errors
  if (data.type === 'error') {
    throw new Error(data.error?.message || 'API error')
  }

  const text = data.content?.[0]?.text
  if (!text) throw new Error('Empty response from API')
  return text
}
