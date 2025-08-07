const ENV = process.env.ENV || 'staging';

type Config = {
  baseUrl: string;
  apiUrl: string;
};

const configs: Record<string, Config> = {
  staging: {
    baseUrl: 'https://www.saucedemo.com/v1/index.html',
    apiUrl: 'https://jsonplaceholder.typicode.com'
  },
  prod: {
    baseUrl: 'https://prod.example.com',
    apiUrl: 'https://api.prod.example.com'
  }
};

export const config = configs[ENV];