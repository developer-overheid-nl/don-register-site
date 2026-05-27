---
"@developer-overheid-nl/don-register-components": patch
"@developer-overheid-nl/oss-register": patch
---

Keep the publiccode filter state explicit in the OSS register.
Toggle filters now preserve both `true` and `false` values in the query string, and selected filter badges correctly toggle the publiccode filter instead of removing it.
