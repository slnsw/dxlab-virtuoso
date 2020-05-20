export default function setupSocials(title, text, pathname, imageUrl) {
  const tweetText = encodeURIComponent(text);
  const fbAppId = process.env.DXLAB_WEBSITE_FB_APP_ID;

  // TODO: Use baseUrl variable
  const url = encodeURIComponent(`http://dxlab.sl.nsw.gov.au${pathname}`);
  const fbLink = `https://www.facebook.com/dialog/share?app_id=${fbAppId}&href=${url}&redirect_uri=${url}&name=%${encodeURIComponent(
    title,
  )}&description=${encodeURIComponent(text)}${
    imageUrl ? `&picture=${imageUrl}` : ''
  }`;

  const twitterLink = `https://twitter.com/intent/tweet?text=${tweetText}&url=${url}`;

  return { fbLink, twitterLink };
}
