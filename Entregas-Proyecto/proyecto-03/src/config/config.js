import 'dotenv/config'

export const {
    PORT, 
    API_PREFIX,
    DB_NAME,
    DB_HOST,
    DB_PORT,
    MONGO_URI, 
    SECRET_SESSION, 
    GITHUB_CLIENT_ID, 
    GITHUB_CLIENT_SECRET, 
    SECRET_JWT,
    PERSISTENCE
} = process.env;