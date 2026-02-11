# Changesets

This monorepo uses [Changesets](https://changesets-docs.vercel.app/) to manage versioning and changelogs.  
When you make changes that should be released, please create a changeset by running:

```bash
pnpm changeset
```

This will create a markdown file in the `.changeset` folder where you can describe the changes made and select the type
of version bump (major, minor, patch) for each package affected. You can create multiple changesets before releasing.

When you're ready to release new versions, run:

```bash
pnpm changeset version
```

This will update the version numbers in the `package.json` files and generate changelogs based on the changesets created.

find the full documentation for it in the [Changesets repository](https://github.com/changesets/changesets)

They have a quick list of common questions in
[their documentation](https://github.com/changesets/changesets/blob/main/docs/common-questions.md)
