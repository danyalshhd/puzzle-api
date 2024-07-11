import request from "supertest";
import { app } from '../../app';
import { Quote } from "../../models/puzzle";

it('returns an error if invalid request is provided', async () => {
    await request(app)
        .post('/api/quotes')
        .send({
            title: ''
        })
        .expect(400)
})

it('returns 201 if valid request is provided', async () => {
    await request(app)
        .post('/api/quotes')
        .send({
            symbol: 'abc'
        })
        .expect(201)
})

it('returns 200 if quote is not expired', async () => {
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + 100);
    const quote = Quote.build({
        symbol: 'IBM',
        price: '13343',
        expiresAt: expiration,
    });
    await quote.save();

    await request(app)
        .post('/api/quotes')
        .send({
            symbol: 'IBM'
        })
        .expect(200)
})
