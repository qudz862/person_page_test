# Academic Homepage

This is a static academic homepage designed for easy long-term maintenance.

## Local Preview

```bash
node scripts/preview-server.cjs
```

Then open:

```text
http://127.0.0.1:4173
```

The site loads content from `content/site.json`, so preview it through a local HTTP server rather than opening `index.html` directly.

## Content Editing

The homepage content lives in:

```text
content/site.json
```

The deployed site also includes a Decap CMS admin entry at:

```text
/admin/
```

See `MAINTENANCE.md` for the scholar-facing editing guide and `DEPLOY.md` for deployment instructions.
