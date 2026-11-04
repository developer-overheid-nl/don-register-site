---
"@developer-overheid-nl/api-register": patch
"@developer-overheid-nl/oss-register": patch
"@developer-overheid-nl/schema-register": patch
---

Limit the in-memory page cache to 100 entries. The default of 1000 rendered pages used more memory than the 256Mi container limit, so the pods were OOMKilled.
