import { API_URL, API_ENDPOINT, API_VERSION } from "astro:env/client";
// import { API_X_API_KEY } from "astro:env/server";
// import { test } from "../../../../packages/components/src/apiStore";
import { test, env, config } from "@developer-overheid-nl/don-register-components";
import appConfig from "../../app.config";

test.set('Test from store (set by Astro');

env.set({ API_URL, API_ENDPOINT, API_VERSION });

config.set({
  ...appConfig
})