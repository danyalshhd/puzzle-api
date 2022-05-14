export const QUOTE_ENDPOINT = (symbol: string) => `/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.API_KEY}`;
//export const QUOTE_ENDPOINT = (symbol: string) => `${process.env.BASE_URL}/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.API_KEY}`;
export const EXPIRATION_WINDOW_SECONDS = 5 * 60;