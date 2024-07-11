import express, { Request, Response } from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { validateRequest, currentUser } from '@dstransaction/common';
import { Puzzle } from '../models/puzzle';
import { PuzzleWordData } from '../config';

router.get('/api/generate-puzzle', async (req, res) => {
  try {

    res.status(200).send(shuffleArray(PuzzleWordData))
  }
  catch (err: any) {
    res.status(500).send({ message: err.message });
  }
})

router.get('/api/show-results/:user', async (req: Request, res: Response) => {

  const {user} = req.params;
  console.log(user);
  const result = await Puzzle.find();

  res.status(200).send(result);
})

router.post("/api/puzzle",
  async (req: Request, res: Response) => {

    const { user, timeFinished } = req.body;

    // Find the transaction the user is trying to account in the database
    const puzzleUser = await Puzzle.findOne({ user });

    try {

      // Build the order and save it to the database
      let puzzle = null;
      if (puzzleUser) {
        puzzleUser?.set({
          score: ++puzzleUser.score,
          timeFinished: new Date(timeFinished),
        });
        puzzle = await puzzleUser?.save();
      }
      else {
        puzzle = Puzzle.build({
          user,
          score: 1,
          timeFinished,
        });
        await puzzle.save();
      }

      res.status(201).send(puzzle);
    }
    catch (err: any) {
      res.status(500).send({ message: err.message });
    }
  });

function shuffleArray(array: any) {
  return array.sort(() => Math.random() - 0.5);
}

export { router as puzzleRouter };
