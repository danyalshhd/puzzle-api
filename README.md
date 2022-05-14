* include .env file at root level with the following params:
API_KEY=PZIW8UETGPX137MP
BASE_URL=https://www.alphavantage.co

* to run npm start

check the post route in postman by
POST
http://localhost:3000/api/quotes
with following body
{
  symbol: "ABC"
}

* to run test
npm run test
