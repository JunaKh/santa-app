import { Request, Response } from 'express';
import { validateUserData } from '../services/dataService';
import { addPendingRequest } from '../services/emailService';

export async function submitRequest(req: Request, res: Response): Promise<void> {
  const { userid, wish } = req.body;

  if (!userid || !wish) {
    res.status(400).json({ error: 'Both user ID and wish are required.' });
    return;
  }

  if (wish.length > 100) {
    res.status(400).json({ error: 'Wish exceeds 100 character limit.' });
    return;
  }

  const validation = await validateUserData(userid);

  if (!validation.isValid || !validation.user) {
    res.status(400).json({ error: validation.error });
    return;
  }

  addPendingRequest({ userid, wish, address: validation.user.address! });

  res.json({
    message: `Wish submitted successfully for ${validation.user.address!}!`,
    address: validation.user.address,
  });
}
