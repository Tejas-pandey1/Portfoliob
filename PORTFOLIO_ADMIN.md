# Private portfolio project editor

The portfolio's project cards are stored in `data/projects.json`. Entries marked `"featured": true` appear first on the homepage; visitors can use **See more projects** to expand the full project shelf. The editor includes a per-project **In Progress** thumbnail label and bulk controls to apply or clear that label across all projects.

## Enable the private editor

Configure these environment variables in your deployment provider (and in local `.env.local` for development):

- `ADMIN_PASSWORD`: a long, unique password for the editor.
- `GITHUB_TOKEN`: a fine-grained GitHub token scoped to this repository with **Contents: Read and write** permission.

Then visit `/admin`, sign in, and add/edit project titles, descriptions, image paths, technologies, and links. Saving commits `data/projects.json` to the `main` branch. Never commit the password or token to the repository.

Images can use existing public paths such as `/images/project-ai.png`, or a public HTTPS image URL. For local images, add the image file under `public/images/` and use its `/images/filename.png` path.

Projects without a public link can be kept as placeholders; their cards display without a clickable link until a destination is added.

The editor is protected by a server-checked password and an HTTP-only, signed session cookie. Saving requires a GitHub token held only on the server.
