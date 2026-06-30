const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const root = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || "127.0.0.1";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8"
};

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${host}:${port}`);
    let name = decodeURIComponent(url.pathname);
    if (name === "/") name = "/index.html";
    if (name.endsWith("/")) name += "index.html";

    const file = path.resolve(root, `.${name}`);
    const relative = path.relative(root, file);
    if (relative.startsWith("..") || path.isAbsolute(relative)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const buffer = await fs.readFile(file);
    response.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream"
    });
    response.end(buffer);
  } catch (error) {
    response.writeHead(404);
    response.end("Not found");
  }
});

server.listen(port, host, () => {
  console.log(`Serving http://${host}:${port}`);
});
