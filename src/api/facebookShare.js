export const shareOnFacebook = ({ url, quote, hashtag }) => {
  const base = "https://www.facebook.com/sharer/sharer.php";
  const params = new URLSearchParams();
  // required — the URL to share
  params.set("u", url ?? window.location.href);

  // optional — prefilled post text (may be stripped by FB)
  if (quote) params.set("quote", quote);

  // optional — e.g. "#reactjs"
  if (hashtag) params.set("hashtag", hashtag);

  const shareUrl = `${base}?${params.toString()}`;

  window.open(
    shareUrl,
    "fb-share-dialog",
    "width=626,height=436"
  );
};
