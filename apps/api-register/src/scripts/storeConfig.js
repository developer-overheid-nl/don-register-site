import { API_URL, API_ENDPOINT, API_VERSION } from "astro:env/client";
// import { API_X_API_KEY } from "astro:env/server";
import { test } from "../../../../packages/components/src/apiStore";
import appConfig from "../../app.config";

test.set(API_URL);

