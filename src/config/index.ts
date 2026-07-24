import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  if (isProduction) {
    throw new Error('JWT_SECRET environment variable is required in production');
  }
  console.warn('WARNING: Using default JWT secret in non-production environment');
}

export const config = {
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
  line: {
    channelId: process.env.LINE_CHANNEL_ID || '',
    channelSecret: process.env.LINE_CHANNEL_SECRET || '',
    accessToken: process.env.LINE_ACCESS_TOKEN || '',
  },
  jwt: {
    secret: jwtSecret || 'dev-only-secret-do-not-use-in-production',
  },
  llm: {
    apiKey: process.env.LLM_API_KEY || '',
    model: process.env.LLM_MODEL || '',
  },
  storage: {
    url: process.env.SUPABASE_URL || '',
    key: process.env.SUPABASE_SERVICE_KEY || '',
  },
  port: parseInt(process.env.PORT || '3000', 10),
};
