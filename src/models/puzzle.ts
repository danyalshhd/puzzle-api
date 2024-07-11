import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Quote
interface PuzzleAttrs {
  user: string;
  score: number;
  timeFinished: Date;
}

// An interface that describes the properties
// that a Quote Model has
interface PuzzleModel extends mongoose.Model<PuzzleDoc> {
  build(attrs: PuzzleAttrs): PuzzleDoc;
}

// An interface that describes the properties
// that a Quote Document has
interface PuzzleDoc extends mongoose.Document {
  user: string;
  score: number;
  timeFinished: Date;
  //isExpired(): Promise<boolean>;
}

const puzzleSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    timeFinished: {
      type: mongoose.Schema.Types.Date
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

puzzleSchema.statics.build = (attrs: PuzzleAttrs) => {
  return new Puzzle(attrs);
};

// puzzleSchema.methods.isExpired = function () {
//   // this === the ticket document that we just called 'isReserved' on
//   if (this.expiresAt > new Date()) {
//     return false;
//   }
//   return true;
// };

const Puzzle = mongoose.model<PuzzleDoc, PuzzleModel>('Puzzle', puzzleSchema);

export { Puzzle };
