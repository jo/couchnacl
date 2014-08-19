# couchnacl
Use TweetNaCl.js from inside CouchDB.

[![Build Status](https://travis-ci.org/jo/couchnacl.svg?branch=master)](https://travis-ci.org/jo/couchnacl)

## Usage
```js
shows: {
  encrypt: function(doc, req) {
    var nacl = require('couchnacl')

    var key64 = 'K2Wz5AUF5+hFPTMy6K1aEWkpZZjwmttbn7QojxmpZQY='
    var key = nacl.util.decodeBase64(key64)
    var nonce64 = 'plYu7rLW8pagaZxPJolmtacUg1+QcURx'
    var nonce = nacl.util.decodeBase64(nonce64)
    var message64 = 'VGhpcyBpcyBhIHNlY3JldCBtZXNzYWdlIHRvIHlvdSE='
    var message = nacl.util.decodeBase64(message64)

    var box = nacl.secretbox(message, nonce, key)

    return nacl.util.encodeBase64(box)
  },
  decrypt: function(doc, req) {
    var nacl = require('couchnacl')

    var key64 = 'K2Wz5AUF5+hFPTMy6K1aEWkpZZjwmttbn7QojxmpZQY='
    var key = nacl.util.decodeBase64(key64)
    var nonce64 = 'plYu7rLW8pagaZxPJolmtacUg1+QcURx'
    var nonce = nacl.util.decodeBase64(nonce64)
    var box64 = 'kFo4GJ4USL13y4apIk2fWIcG5eHWFE4lyuU7y4qKQ+/J2amf3LjZ82VuoaZLYqGA'
    var box = nacl.util.decodeBase64(box64)

    var message = nacl.secretbox.open(box, nonce, key)

    return nacl.util.encodeUTF8(message)
  }
}
```

# License
Public domain

(c) 2014 Johannes J. Schmidt
