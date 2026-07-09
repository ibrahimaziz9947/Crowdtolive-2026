import { ConfigService } from "@nestjs/config";
import type { AppEnvironment } from "./common/config/env.validation.js";
import { createApp } from "./main.js";

async function bootstrap() {
  const app = await createApp();
  const configService = app.get<ConfigService<AppEnvironment, true>>(ConfigService);
  const port = configService.get("PORT", { infer: true });

  await app.listen(port);
}

void bootstrap();
