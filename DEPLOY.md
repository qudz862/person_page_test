# Deployment Plan for a Scholar Homepage

This project is intended to be deployed as a static site on Netlify, with content editing through Decap CMS.

Recommended stack:

```text
GitHub repository + Netlify + Decap CMS + custom .me or .top domain
```

## 1. Ownership

Use the scholar's long-term email address for the domain and Netlify ownership whenever possible. The developer can be added as a collaborator, but the scholar should ultimately own:

- Domain registration account
- DNS account, preferably Cloudflare or the registrar DNS
- GitHub repository
- Netlify project

## 2. Domain

Recommended:

```text
firstname-lastname.me
lastname-lab.me
scholarname.me
```

This project is currently configured for:

```text
dezhan.tech
www.dezhan.tech
```

Buy one primary domain and optionally redirect alternatives:

```text
dezhan.tech      primary
www.dezhan.tech  redirect to dezhan.tech
```

## 3. GitHub Repository

Create a GitHub repository and push this project.

Typical setup:

```bash
git init
git add .
git commit -m "Initial academic homepage"
git branch -M main
git remote add origin https://github.com/OWNER/REPO.git
git push -u origin main
```

The Decap CMS config currently uses:

```yaml
backend:
  name: git-gateway
  branch: main
```

Keep the production branch named `main`, or update `admin/config.yml`.

## 4. Netlify Project

In Netlify:

1. Add new site from Git.
2. Select the GitHub repository.
3. Build command: leave empty.
4. Publish directory: `.`.
5. Deploy.

The same settings are also captured in `netlify.toml`.

## 5. Enable Content Editing

In the Netlify project:

1. Open Project configuration.
2. Enable Identity.
3. Set registration to Invite only.
4. Enable Git Gateway.
5. Invite the scholar's email address as an Identity user.
6. After they accept the invite, they can visit:

```text
https://dezhan.tech/admin/
```

Then they can update biography, publications, projects, courses, talks, awards, links, and profile image through forms.

## 6. Custom Domain

In Netlify:

1. Open Domain management.
2. Add `dezhan.tech`.
3. Add `www.dezhan.tech`.
4. Follow Netlify's DNS instructions.
5. Enable HTTPS after DNS is verified.

If using Cloudflare DNS, keep proxying off until Netlify validates the domain and certificate. After validation, use the setup that best matches Netlify's current guidance.

## 7. Update CMS Site URL

After the final domain is known, edit:

```text
admin/config.yml
```

Replace:

This has already been set to:

```yaml
site_url: "https://dezhan.tech"
display_url: "https://dezhan.tech"
```

## 8. Final Handoff Checklist

- The site opens at the custom domain.
- `https://dezhan.tech/admin/` opens the CMS.
- The scholar can log in.
- The scholar can edit `Homepage Content`.
- A test edit creates a Git commit and triggers a Netlify deploy.
- `cv.pdf`, profile image, and publication links work.
- The scholar owns or has admin access to the domain, GitHub repo, and Netlify site.
