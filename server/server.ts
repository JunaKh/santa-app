import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import { submitRequest } from './controllers/requestController';
import { AddressInfo } from 'net';

const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Serve static files from 'dist' directory
app.use(express.static(path.join(__dirname, "../dist")));

// Serve index.html for the root route
app.get("/", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Serve index.html for any other route
app.get("*", (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Handle form submission
app.post("/api/submit", submitRequest);

// Function to start the server
function startServer(port: number): ReturnType<typeof app.listen> {
  const listener = app.listen(port, () => {
    const address = listener.address() as AddressInfo | null;
    if (address) {
      console.log(`Your app is listening on port ${address.port}`);
    }
  });
  return listener;
}

// If the file is executed directly, start the server with the specified or default port
if (require.main === module) {
  const port = parseInt(process.env.PORT || '3000', 10);
  startServer(port);
}

export { app, startServer };
