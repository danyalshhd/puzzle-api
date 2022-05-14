import mongoose from 'mongoose';

// An interface that describes the properties
// that are requried to create a new Quote
interface QuoteAttrs {
  symbol: string;
  price: string;
  expiresAt: Date;
}

// An interface that describes the properties
// that a Quote Model has
interface QuoteModel extends mongoose.Model<QuoteDoc> {
  build(attrs: QuoteAttrs): QuoteDoc;
}

// An interface that describes the properties
// that a Quote Document has
interface QuoteDoc extends mongoose.Document {
  symbol: string;
  price: string;
  expiresAt: Date;
  isExpired(): Promise<boolean>;
}

const quoteSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    expiresAt: {
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

quoteSchema.statics.build = (attrs: QuoteAttrs) => {
  return new Quote(attrs);
};

quoteSchema.methods.isExpired = function () {
  // this === the ticket document that we just called 'isReserved' on
  if (this.expiresAt > new Date()) {
    return false;
  }
  return true;
};

const Quote = mongoose.model<QuoteDoc, QuoteModel>('Quote', quoteSchema);

export { Quote };
