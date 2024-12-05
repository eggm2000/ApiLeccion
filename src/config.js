import { config } from 'dotenv'
config()

export const BD_HOST = process.env.BD_HOST || "bpcbr40of8fanmrnlbfp-mysql.services.clever-cloud.com";
export const BD_DATABASE = process.env.BD_DATABASE || "bpcbr40of8fanmrnlbfp";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_PORT = process.env.DB_PORT || 3306;
export const PORT = process.env.PORT || 3000;
