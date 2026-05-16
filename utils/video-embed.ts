/** Convertit watch / youtu.be / embed en URL iframe valide (YouTube, Vimeo). */
export function toEmbedVideoUrl(
  url: string,
  options: { autoplay?: boolean } = {}
): string | null {
  const trimmed = url?.trim();
  if (!trimmed) return null;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\./, "");
  const autoplay = options.autoplay ?? false;

  // youtu.be/VIDEO_ID
  if (host === "youtu.be") {
    const id = parsed.pathname.replace(/^\//, "").split("/")[0];
    return id ? buildYouTubeEmbed(id, autoplay) : null;
  }

  // youtube.com, m.youtube.com, youtube-nocookie.com
  if (
    host === "youtube.com" ||
    host === "m.youtube.com" ||
    host === "youtube-nocookie.com"
  ) {
    const path = parsed.pathname;

    if (path.startsWith("/embed/")) {
      const id = path.slice("/embed/".length).split("/")[0];
      return id ? buildYouTubeEmbed(id, autoplay) : null;
    }

    if (path.startsWith("/shorts/")) {
      const id = path.slice("/shorts/".length).split("/")[0];
      return id ? buildYouTubeEmbed(id, autoplay) : null;
    }

    const fromQuery = parsed.searchParams.get("v");
    if (fromQuery) return buildYouTubeEmbed(fromQuery, autoplay);
  }

  // vimeo.com/123456789
  if (host === "vimeo.com") {
    const id = parsed.pathname.split("/").filter(Boolean).pop();
    return id ? buildVimeoEmbed(id, autoplay) : null;
  }

  // player.vimeo.com/video/123456789
  if (host === "player.vimeo.com") {
    const match = parsed.pathname.match(/\/video\/(\d+)/);
    return match?.[1] ? buildVimeoEmbed(match[1], autoplay) : null;
  }

  return null;
}

function buildYouTubeEmbed(videoId: string, autoplay: boolean): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });
  if (autoplay) {
    params.set("autoplay", "1");
    params.set("mute", "1");
  }
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

function buildVimeoEmbed(videoId: string, autoplay: boolean): string {
  const params = new URLSearchParams();
  if (autoplay) params.set("autoplay", "1");
  const qs = params.toString();
  return qs
    ? `https://player.vimeo.com/video/${videoId}?${qs}`
    : `https://player.vimeo.com/video/${videoId}`;
}
