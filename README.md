# Sassy Cow Creations website

A static shop designed for GitHub + Netlify.

## Fast setup

1. Upload all files and folders to the top level of your GitHub repository.
2. Netlify will redeploy automatically after the commit.
3. Open the temporary `.netlify.app` address and check the site.

## Edit products in one place

Open:

`assets/js/products.js`

Each product has:

- `name`
- `price`
- `category`
- `short`
- `description`
- `images`

Prices in this starter are placeholders. Replace them before launch.

## Add a product image

1. Upload the image to `assets/images/products/`.
2. Add the filename to the product's `images` list in `assets/js/products.js`.
3. Commit the changes.

## Connect the cart

Search all HTML files for:

`YOUR_SNIPCART_PUBLIC_API_KEY`

Replace it with your Snipcart **public** API key. Do not upload secret keys.

Then configure payment, shipping, tax and order emails inside Snipcart.

## Contact form

The contact form uses Netlify Forms. In Netlify, enable form detection and redeploy. Test the form after deployment.

## Before accepting orders

- Confirm every product name, description and price.
- Add accurate delivery and returns information.
- Replace the privacy and terms templates.
- Add your contact email and social links.
- Test checkout from cart to confirmation.
- Check product naming and imagery comply with any relevant trademark or marketplace rules.
