import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "../db.js";
const pgSession = connectPgSimple(session);

const sessMiddleware = session({
  store: new pgSession({
    pool: pool,
    tableName: "session",
  }),
  resave: false,
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  cookie: { secure: false },
});

export default sessMiddleware;
