// lib/session.js
import { withSession } from 'next-session';

export default withSession({ 
  cookie: {
    secure: process.env.NODE_ENV === 'production'
  }
});
