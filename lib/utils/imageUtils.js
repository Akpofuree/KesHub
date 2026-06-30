/**
 * Parse images from JSON string if needed
 * @param {string|Array} images - Images as JSON string, plain URL string, or array
 * @returns {Array} - Parsed images array
 */
export function parseImages(images) {
  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      // If parsed is an array, return it
      if (Array.isArray(parsed)) {
        return parsed;
      }
      // If parsed is a string (single URL), wrap in array
      if (typeof parsed === "string") {
        return [parsed];
      }
      // Otherwise return as single item array
      return [images];
    } catch (e) {
      // If JSON.parse fails, it's likely a plain URL string
      return [images];
    }
  }
  // If it's already an array, return it
  if (Array.isArray(images)) {
    return images;
  }
  // If it's neither string nor array, wrap in array
  return [images];
}

/**
 * Get first image from images array or string
 * @param {string|Array} images - Images as JSON string, plain URL string, or array
 * @returns {string} - First image URL
 */
export function getFirstImage(images) {
  const parsed = parseImages(images);
  return Array.isArray(parsed) ? parsed[0] : parsed;
}
