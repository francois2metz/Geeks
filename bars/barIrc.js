var sys    = require("sys"),
    events = require("events"),
    kiwi   = require("kiwi")

// Express
kiwi.require("express")
require("express/plugins")

configure(function() {
  use(MethodOverride);
  use(ContentLength);
});

/**
 * Home page
 * Who am I.
 */
get('/', function() {
});

/**
 * Which params i need to start listenning.
 * @todo app.js config and call this url.
 */
get('/carte', function() {
    sys.debug('carte asked')
    this.contentType("json");
    this.halt(200, JSON.stringify( { 'params' : ['server', 'chanel', 'nick'],
                             'name' : 'irc',
                             'version' : 'alpha (as in GFI)'
    }))
});

/**
 * @param geek
 * @param url
 */
post('/order', function() {
    // check params
    // contact service and watch.
    // branch callback on /
})

run(3001)
