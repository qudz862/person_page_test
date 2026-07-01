# Scholar Maintenance Guide

This website is designed so that you can update academic content without editing code.

## Admin Login

After the site is deployed, open:

```text
https://dezhan.tech/admin/
```

Log in with the email address invited by the site maintainer.

If an invitation email opens the homepage with a URL like:

```text
https://dezhan.tech/#invite_token=...
```

set the password in the prompt that appears. After login, the site redirects to:

```text
https://dezhan.tech/admin/
```

## Updating Content

Open:

```text
Site > Homepage Content
```

You can update:

- Name, title, affiliation, location
- Biography and research interests
- Email, Google Scholar, GitHub, CV, and other links
- Education
- Experience
- Publications
- Projects
- Courses
- Talks
- Honors and awards
- Profile image

After editing, save the entry. The website will rebuild automatically.

## Adding a Publication

In `Publications`, add a new item with:

- Year
- Title
- Authors
- Venue
- Short description
- Selected status
- Tags
- Links such as Paper, DOI, Code, Project, or Slides

Use stable public links when possible.

## Updating the CV

Upload the CV PDF to the repository or ask the maintainer to place it at:

```text
assets/files/cv.pdf
```

Then set the CV link to:

```text
/assets/files/cv.pdf
```

## Best Practices

- Keep biography concise.
- Put newest publications first.
- Use consistent author formatting.
- Keep link labels short: `Paper`, `DOI`, `Code`, `Slides`, `Project`.
- Update `Last Updated` whenever content changes.

## When to Contact the Maintainer

Ask the maintainer if:

- You cannot log in.
- A deploy fails.
- You want to change the layout or visual design.
- You need to add a new content section.
- The domain or HTTPS certificate has a problem.
