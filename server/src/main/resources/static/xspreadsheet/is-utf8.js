/**
 * 判断给定的字节数组是否为有效的 UTF-8 编码
 * @param {Array<number>|Uint8Array} bytes - 要检查的字节数组
 * @returns {boolean} - 如果是有效的 UTF-8 编码则返回 true，否则返回 false
 */
function isUTF8(bytes) {
    if (!bytes || bytes.length === 0) return true; // 空数据视为有效

    let i = 0;
    const len = bytes.length;

    while (i < len) {
        const byte = bytes[i];

        // 1字节序列 (0xxxxxxx)
        if ((byte & 0x80) === 0x00) {
            i++;
        }
        // 2字节序列 (110xxxxx 10xxxxxx)
        else if ((byte & 0xE0) === 0xC0) {
            if (i + 1 >= len || (bytes[i + 1] & 0xC0) !== 0x80) {
                return false;
            }
            i += 2;
        }
        // 3字节序列 (1110xxxx 10xxxxxx 10xxxxxx)
        else if ((byte & 0xF0) === 0xE0) {
            if (i + 2 >= len || (bytes[i + 1] & 0xC0) !== 0x80 || (bytes[i + 2] & 0xC0) !== 0x80) {
                return false;
            }
            i += 3;
        }
        // 4字节序列 (11110xxx 10xxxxxx 10xxxxxx 10xxxxxx)
        else if ((byte & 0xF8) === 0xF0) {
            if (i + 3 >= len ||
                (bytes[i + 1] & 0xC0) !== 0x80 ||
                (bytes[i + 2] & 0xC0) !== 0x80 ||
                (bytes[i + 3] & 0xC0) !== 0x80) {
                return false;
            }
            i += 4;
        }
        // 无效的 UTF-8 起始字节
        else {
            return false;
        }
    }

    return true;
}