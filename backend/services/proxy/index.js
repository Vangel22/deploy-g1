const config = require("../../pkg/config");
const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");

const app = express();
// app.use(cors());

// www.semosvezbi.com -> 192.168.101.101 -> Internet servis provajder -> Root, TLD

// http://localhost:3000/api/v1/storage
app.use(
  "/api/v1/storage",
  proxy("http://127.0.0.1:10001", {
    proxyReqPathResolver: (req) =>
      `http://127.0.0.1:10001/api/v1/storage${req.url}`, // upload, download
  })
);

app.use(
  "/api/v1/auth",
  proxy("http://127.0.0.1:10002", {
    proxyReqPathResolver: (req) =>
      `http://127.0.0.1:10002/api/v1/auth${req.url}`, // req.url = login, register
  })
);

app.use(
  "/api/v1/posts",
  // prenasocuvanje
  proxy("http://127.0.0.1:10003", {
    proxyReqPathResolver: (req) =>
      `http://127.0.0.1:10003/api/v1/posts${req.url}`,
  })
);

// localhost -> 127.0.0.1

app.use(
  "/api/cars",
  proxy("http://127.0.0.1:10004", {
    proxyReqPathResolver: (req) => `http://127.0.0.1:10004/api/cars${req.url}`,
  })
);

const PORT = process.env.PORT || config.getSection("services").proxy.port;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Service [proxy] successfully started on port", PORT);
});

// client (postman) --> service:port

// client (postman) --> proxy:port --> service1:port
// client (postman) --> proxy:port --> service2:port
// client (postman) --> proxy:port --> service3:port
// client (postman) --> proxy:port --> serviceN:port
