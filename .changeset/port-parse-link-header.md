---
"@developer-overheid-nl/don-register-layouts": minor
"@developer-overheid-nl/don-register-components": patch
"@developer-overheid-nl/api-register": patch
"@developer-overheid-nl/oss-register": patch
"@developer-overheid-nl/schema-register": patch
---

Replace `parse-link-header` with a TypeScript port (`parseLinkHeader`) that does not need Node's `url.parse`, and remove the `PARSE_LINK_HEADER_*` env workaround from the apps. Query parameters that appear more than once in a link URL are returned as an array; `parseHeaders` uses the first value when `page` or `perPage` is repeated.
