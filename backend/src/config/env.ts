import dotenv from 'dotenv';

dotenv.config();

type Env = {
  NODE_ENV: string;
  PORT: number;
  MONGO_URI: string;
  ELASTICSEARCH_NODE: string;
  ELASTICSEARCH_USERNAME: string;
  ELASTICSEARCH_PASSWORD: string;
  CHROMA_API_KEY: string;
  CHROMA_TENANT: string;
  CHROMA_DATABASE: string;
  OPENAI_API_KEY: string;
};

export const env: Env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 4000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27018/elastic_search',
  ELASTICSEARCH_NODE: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
  ELASTICSEARCH_USERNAME: process.env.ELASTICSEARCH_USERNAME || 'elastic',
  ELASTICSEARCH_PASSWORD: process.env.ELASTICSEARCH_PASSWORD || '',
  CHROMA_API_KEY: process.env.CHROMA_API_KEY || '',
  CHROMA_TENANT: process.env.CHROMA_TENANT || '',
  CHROMA_DATABASE: process.env.CHROMA_DATABASE || '',
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',
};
