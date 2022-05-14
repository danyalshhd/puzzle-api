import mongoose from 'mongoose';

declare global {
    namespace NodeJS {
        interface Global {

        }
    }
}

let mongo: any;
beforeAll(async () => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const mongoUri = 'mongodb://localhost:27017/fintech';

    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongoose.connection.close();
});
