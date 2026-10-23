# Private portfolio editor

Visit `/admin` and sign in with the `ADMIN_PASSWORD` environment variable. The editor saves project and site settings to Vercel Blob; the existing server-checked, HTTP-only session cookie protects changes.

## Project shelf

- Search projects by title, category, description, ID, or tag.
- Drag project cards on desktop, use the up/down controls, or enter a position number. All methods update the same saved order, which controls the public project shelf.
- Add, edit, or remove projects; update title, category, description, URL, screenshot path, button label, card colour, unique ID, tags, featured badge, and the diagonal In Progress ribbon.
- Bulk apply or clear the In Progress ribbon.

## Contact buttons

- Edit the original Discord and Fiverr labels, helper text, destinations, icons, colours, and visibility while preserving their original blue/mint styling by default.
- Add up to three more buttons (five total), choosing a label, helper text, destination, icon, colour, and visibility.

## Navbar mascot

Upload a PNG, JPG, WebP, GIF, or SVG under 1.5 MB in the Mascot tab. This replaces the small circular S mark in the navbar only; it does not add an image to the About section. Changes are previewed before saving.

## Vercel storage setup

1. Open the portfolio project in Vercel.
2. Open **Storage**, choose **Create Database**, and select **Blob**.
3. Create a Blob store and connect it to this project. Make sure the `BLOB_READ_WRITE_TOKEN` environment variable is available for the deployment.
4. Confirm `ADMIN_PASSWORD` is set in the project's environment variables, then redeploy.

The editor stores public-facing project data and site settings in Vercel Blob so edits persist across deployments. The Blob files are public because the portfolio itself displays this content; do not put passwords or secrets in them. If Save reports that Vercel Blob is not configured, complete the steps above and redeploy.

Project screenshots can use existing paths such as `/images/project-ai.png` or public HTTPS image URLs. For local images, place the file under `public/images/` and use its `/images/filename.png` path.

Never commit the admin password or any secret to the repository.
