import type { IncomingMessage, ServerResponse } from "node:http";
import { createApp } from "./main.js";

type RequestHandler = (req: IncomingMessage, res: ServerResponse) => void | Promise<void>;

let cachedHandler: RequestHandler | null = null;

async function getHandler() {
  if (cachedHandler) {
    return cachedHandler;
  }

  const app = await createApp();
  cachedHandler = app.getHttpAdapter().getInstance() as RequestHandler;

  return cachedHandler;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const requestHandler = await getHandler();
  return requestHandler(req, res);
}
