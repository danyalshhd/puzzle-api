import express, { Request, Response } from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { validateRequest, currentUser } from '@dstransaction/common';
import { Quote } from '../models/quotes';
import { axiosInstance } from '../axiosInstance';
import { EXPIRATION_WINDOW_SECONDS, QUOTE_ENDPOINT } from '../config';
import { IQuote } from '../dto/quote';

router.post("/api/quotes", currentUser, [
  body('symbol')
    .trim()
    .notEmpty()
    .withMessage('You must supply a symbol'),
], validateRequest,
  async (req: Request, res: Response) => {

    const { symbol } = req.body;

    // Find the transaction the user is trying to account in the database
    const quoteSymbol = await Quote.findOne({ symbol });

    // Make sure that the symbol is not expired
    const isExpired = quoteSymbol?.isExpired();

    if (!isExpired && quoteSymbol) {
      res.status(200).send(quoteSymbol);
      return;
    }

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    try {
      const { data: quoteResult } = await axiosInstance.get(QUOTE_ENDPOINT(symbol));
      const response: IQuote = quoteResult['Global Quote'];

      // Build the order and save it to the database
      let quote = null;
      if (isExpired) {
        quoteSymbol?.set({
          price: response['05. price'],
          expiresAt: expiration,
        });
        quote = await quoteSymbol?.save();
      }
      else {
        quote = Quote.build({
          symbol: response['01. symbol'],
          price: response['05. price'],
          expiresAt: expiration,
        });
        await quote.save();
      }

      res.status(201).send(quote);
    }
    catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  });

export { router as quotesRouter };
