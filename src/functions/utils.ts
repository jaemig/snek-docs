import { WindowLocation } from '@reach/router';

/**
 * Get the platform of the user
 * @returns {string} platform  - The platform of the user
 */
export function getPlatform() {
  const userAgent =
    typeof window !== 'undefined' && typeof window.navigator !== 'undefined'
      ? window.navigator.userAgent
      : '';

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
  return (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints)
  );
}

/**
 *  Checks if the link is internal or external
 * @param href  - The href of the link
 * @returns   - Whether the link is internal or not
 */
export function isInternalLink(href: string) {
  // Check if the link starts with a forward slash (/) or a dot (./ or ../)
  return /^\/|^\.+\//.test(href);
}
