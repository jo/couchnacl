// stub crypto
this.window = { crypto: { getRandomValues: function() { throw new Error('no PRNG in Couch land') } } };

