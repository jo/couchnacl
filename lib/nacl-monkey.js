// monkey patch nacl's base64 and utf8 functions
exports.util.encodeUTF8 = UTF8ArrToStr
exports.util.decodeUTF8 = strToUTF8Arr
exports.util.encodeBase64 = base64EncArr
exports.util.decodeBase64 = base64DecToArr
