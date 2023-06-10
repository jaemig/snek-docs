/**
 * Get the platform of the user
 * @returns {string} platform  - The platform of the user
 */
export function getPlatform() {
  const userAgent =
    typeof window.navigator !== 'undefined' ? window.navigator.userAgent : '';

  const platforms = [
    { pattern: /Mac/, platform: 'mac' },
    { pattern: /Windows/, platform: 'windows' },
    {
      pattern: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/,
      platform: 'mobile'
    }
  ];

  const { platform } = platforms.find(({ pattern }) =>
    pattern.test(userAgent)
  ) || {
    platform: 'Unknown'
  };

  return platform;
}

/**
 * Checks if the user is on a touch device
 * @returns {boolean} isTouchDevice - Whether the user is on a touch device or not
 */
export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

/**
 *  Checks if the link is internal or external
 * @param href  - The href of the link
 * @returns   - Whether the link is internal or not
 */
export function isInternalLink(href: string) {
  let urlObj: URL;
  try {
    urlObj = new URL(href, window.location.origin);
  } catch (e) {
    return false; // If the URL is invalid, it is treated as an external link
  }

  // If the hostname is the same as the current hostname, it's an internal link
  return urlObj.hostname === window.location.hostname;
}
