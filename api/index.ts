
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).send('Olá! Este é um texto simples do backend na Vercel.');
}
