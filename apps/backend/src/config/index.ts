export interface Config {
  env: string;
  port: number;
  mongodb: { uri: string };
  redis: { url: string };
  jwt: {
    accessSecret: string;
    refreshSecret: string;
    accessExpiry: string;
    refreshExpiry: string;
  };
  razorpay: { keyId: string; keySecret: string; webhookSecret: string };
  email: { host: string; port: number; user: string; pass: string; from: string };
  aws: { accessKeyId: string; secretAccessKey: string; region: string; s3Bucket: string };
  corsOrigins: string[];
  frontendUrl: string;
  business: { freeShippingThreshold: number; shippingCharge: number; gstRate: number };
}

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  if (value === undefined) throw new Error(`Missing: ${key}`);
  return value;
}

export const config: Config = {
  env: getEnv('NODE_ENV', 'development'),
  port: parseInt(getEnv('PORT', '8000'), 10),
  mongodb: { uri: getEnv('MONGODB_URI', 'mongodb://localhost:27017/apostle') },
  redis: { url: getEnv('REDIS_URL', 'redis://localhost:6379') },
  jwt: {
    accessSecret: getEnv('JWT_ACCESS_SECRET', 'dev-access-secret'),
    refreshSecret: getEnv('JWT_REFRESH_SECRET', 'dev-refresh-secret'),
    accessExpiry: getEnv('JWT_ACCESS_EXPIRY', '15m'),
    refreshExpiry: getEnv('JWT_REFRESH_EXPIRY', '7d'),
  },
  razorpay: {
    keyId: getEnv('RAZORPAY_KEY_ID', ''),
    keySecret: getEnv('RAZORPAY_KEY_SECRET', ''),
    webhookSecret: getEnv('RAZORPAY_WEBHOOK_SECRET', ''),
  },
  email: {
    host: getEnv('SMTP_HOST', 'smtp.gmail.com'),
    port: parseInt(getEnv('SMTP_PORT', '587'), 10),
    user: getEnv('SMTP_USER', ''),
    pass: getEnv('SMTP_PASS', ''),
    from: getEnv('EMAIL_FROM', 'APOSTLE <noreply@apostle.in>'),
  },
  aws: {
    accessKeyId: getEnv('AWS_ACCESS_KEY_ID', ''),
    secretAccessKey: getEnv('AWS_SECRET_ACCESS_KEY', ''),
    region: getEnv('AWS_REGION', 'ap-south-1'),
    s3Bucket: getEnv('AWS_S3_BUCKET', 'apostle-uploads'),
  },
  corsOrigins: getEnv('CORS_ORIGINS', 'http://localhost:3000,http://localhost:3001').split(','),
  frontendUrl: getEnv('FRONTEND_URL', 'http://localhost:3000'),
  business: { freeShippingThreshold: 5000, shippingCharge: 199, gstRate: 18 },
};
