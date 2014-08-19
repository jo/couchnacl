var helper = require('./helper')
var tweetnacl = require('tweetnacl')

var message = 'This is a secret message to you!'
var cypher64 = 'kFo4GJ4USL13y4apIk2fWIcG5eHWFE4lyuU7y4qKQ+/J2amf3LjZ82VuoaZLYqGA'

var shows = {
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

helper.test('encrypt', shows, function(t, db) {
  db.show('couchnacl', 'encrypt', 'doc-id', function(err, doc) {
    t.ok(!err, 'no error has been occured while running the show function')
    t.equal(doc, cypher64, 'message had been encrypted and base64 encoded')
    t.end()
  })
})

helper.test('decrypt', shows, function(t, db) {
  db.show('couchnacl', 'decrypt', 'doc-id', function(err, doc) {
    t.ok(!err, 'no error has been occured while running the show function')
    t.equal(doc, message, 'message has been decrypted and UTF-8 encoded')
    t.end()
  })
})
