const types = {
  "[object Boolean]": "boolean",
  "[object Number]": "number",
  "[object String]": "string",
  "[object Function]": "function",
  "[object Array]": "array",
  "[object Date]": "date",
  "[object RegExp]": "regexp",
  "[object Object]": "object",
};

/**
 * Get correct extension from path.extname.
 * @return correct extension if successful, original string otherwise.
 */
export const getExtName = (str) => {
  return str.split(".").pop();
};

/**
 * it isn't used
 * Convert Bytes To A Human Format
 * @return correct Bytes, KB, MB, GB, or TB version.
 */
export const convertBytes = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) {
    return "n/a";
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i === 0) {
    return bytes + " " + sizes[i];
  }
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
};