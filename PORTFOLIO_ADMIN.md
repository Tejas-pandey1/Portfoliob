# Private portfolio project editor

The portfolio's project cards are stored in `data/projects.json`. The first four entries appear on the homepage; visitors can use **See more** to reveal the remaining projects.

## Enable the private editor

Configure these environment variables in your deployment provider (and in local `.env.local` for development):

- `ADMIN_PASSWORD`: a long, unique password for the editor.
- `GITHUB_TOKEN`: a fine-grained GitHub token scoped to this repository with **Contents: Read and write** permission.

Then visit `/admin`, sign in, and add/edit project titles, descriptions, image paths, technologies, and links. Saving commits `data/projects.json` to the `main` branch. Never commit the password or token to the repository.

Images can use existing public paths such as `/images/project-ai.png`, or a public HTTPS image URL. For local images, add the image file under `public/images/` and use its `/images/filename.png` path.

The editor is protected by a server-checked password and an HTTP-only, signed session cookie. Saving requires a GitHub token held only on the server.
