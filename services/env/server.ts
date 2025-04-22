import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    AUTH_SECRET: z.string(),
    DATABASE_URL: z.string().url(),
    AUTH_GOOGLE_ID: z.string(),
    AUTH_GOOGLE_SECRET: z.string(),
    BLOB_READ_WRITE_TOKEN: z.string(),
    YANDEX_MAP_API: z.string().min(1),
  },

  experimental__runtimeEnv: process.env,
});
