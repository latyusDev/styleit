/**
 * Safe clipboard utility with fallbacks for iOS and older browsers
 */

/**
 * Copy text to clipboard with fallback for older browsers
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
  try {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('Clipboard API failed, using fallback:', err);
  }

  // Fallback for older browsers and iOS
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';
    document.body.appendChild(textarea);
    
    // For iOS, ensure proper selection
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      textarea.contentEditable = true;
      textarea.readOnly = true;
      const range = document.createRange();
      range.selectNodeContents(textarea);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      textarea.setSelectionRange(0, 999999);
    } else {
      textarea.select();
    }
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    
    if (successful) {
      return true;
    } else {
      throw new Error('execCommand copy failed');
    }
  } catch (err) {
    console.error('All clipboard methods failed:', err);
    return false;
  }
};