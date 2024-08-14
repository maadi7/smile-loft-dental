import type { NextApiRequest, NextApiResponse } from 'next'
import translate from 'translate-google-api'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text, targetLang } = req.body

  if (!text || !targetLang) {
    return res.status(400).json({ error: 'Missing required parameters' })
  }

  try {
    const result = await translate(text, {
      tld: "com", // Changed from "cn" to "com"
      to: targetLang,
    })

    if (!result || result.length === 0) {
      throw new Error('No translation result')
    }

    res.status(200).json({ translatedText: result[0] })
  } catch (error) {
    console.error('Translation error:', error)
    res.status(500).json({ error: 'Translation failed', details: error, stack: error })
  }
}