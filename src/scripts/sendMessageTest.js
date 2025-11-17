// Test script to send a message using the API
const http = require("http");

const data = JSON.stringify({
  vendorEmail: "testvendor@example.com",
  userEmail: "testclient@example.com",
  content: "Hello, this is a test message from the vendor!",
});

const options = {
  hostname: "localhost",
  port: 3001,
  path: "/api/vendor/messages",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });

  res.on("end", () => {
    console.log("\nMessage sent successfully!");
  });
});

req.on("error", (error) => {
  console.error("Error:", error);
});

req.write(data);
req.end();
