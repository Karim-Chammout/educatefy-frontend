export function isValidUrl(urlString: string): boolean {
  try {
    if (!urlString || typeof urlString !== 'string') {
      return false;
    }

    const url = new URL(urlString);

    // Check if protocol is valid
    if (!['http:', 'https:'].includes(url.protocol)) {
      return false;
    }

    // Check if hostname exists and is valid
    if (!url.hostname) {
      return false;
    }

    // hostname validation
    const hostnameRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
    if (!hostnameRegex.test(url.hostname)) {
      return false;
    }

    return true;
  } catch (_error) {
    return false;
  }
}
