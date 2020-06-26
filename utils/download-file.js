const fs = require("fs");
const request = require("request");

module.exports = (url, dest, cb) => {
  const file = fs.createWriteStream(dest);
  const sendReq = request.get(url);

  // verify response code
  sendReq.on("response", (response) => {
    if (response.statusCode !== 200) {
      cb(`Response status was ${response.statusCode}`);
    }
  });

  // check for request errors
  sendReq.on("error", (err) => {
    fs.unlink(dest);

    if (cb) {
      cb(err.message);
    }
  });

  sendReq.pipe(file);

  file.on("finish", () => {
    file.close(cb); // close() is async, call cb after close completes.
  });

  file.on("error", (err) => {
    // Handle errors
    fs.unlink(dest);

    // Delete the file async. (But we don't check the result)
    if (cb) {
      cb(err.message);
    }
  });
};
