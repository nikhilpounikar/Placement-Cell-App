const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});


const development = {
  name: "development",
  asset_path: "/assets",
  session_cookie_key: "nikhilpounikar",
  db: "major_project_1_development",
  smtp: {
    // service: 'gmail',
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "nikhilptacktile@gmail.com",
      pass: "0kY8VD1yHP4XvITM",
    },
  },
  google_client_id:
    "977932929073-fpud2qtp5eb1o7onjs78qomj00sk4rag.apps.googleusercontent.com",
  google_client_secret: "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",
  google_call_back_url: "http://localhost:8000/user/auth/google/callback",
  jwt_secret: "secret",
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

const production = {
  name: "production",
  asset_path: process.env.CODEIAL_ASSET_PATH,
  session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
  db: process.env.CODEIAL_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CODEIAL_GMAIL_USERNAME,
      pass: process.env.CODEIAL_GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_RURL,
  jwt_secret: process.env.CODEIAL_JWT_SECRET,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports =
  eval(process.env.CODEIAL_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.CODEIAL_ENVIRONMENT);
