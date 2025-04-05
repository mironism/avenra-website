# Clean URL Configuration

## Changes Made

1. **Removed .html Extensions**: All internal links now use clean URLs without the .html extension (e.g., `index` instead of `index.html`).

2. **Added .htaccess File**: Created an .htaccess file to handle URL rewriting for servers that support it (like Apache). This ensures URLs work without the .html extension.

3. **Standardized Navigation**: Updated the navigation menu and footer across all pages to match the main site, providing a consistent user experience.

4. **Language Switching**: Fixed the language switching between English and German versions.

## How It Works

The `.htaccess` file contains the necessary rules to:
- Rewrite URLs without extensions to their .html counterparts
- Redirect 404 errors to the homepage
- Force HTTPS
- Redirect www to non-www version of the site

## For GitHub Pages Deployment

If using GitHub Pages, you'll need to ensure the following:

1. Place the `.htaccess` file in the root directory of your repository
2. If GitHub Pages doesn't support the .htaccess configuration, you may need to:
   - Consider using a custom domain with proper server configuration
   - Or use JavaScript redirects for the language switch

## Testing

After deployment, test the following:
- Click the language switcher to ensure it correctly switches between English and German versions
- Verify that URLs display cleanly without the .html extension in the browser
- Check that links in the menu and footer work correctly across all pages 