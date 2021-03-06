init_geeks = function() {

  $(document).ready(function() {

    var geeks_map = new scene({
        // Must keep the background ratio:
        width: 1605,
        height: 714,
        objects: [
          {src: "/public/images/planAfGeeks.png",
           id: 0,
           width: 100,
           height: 100,
           movable: false,
           resizable: false,
           left: 0,
           top: 0,
           z: 1,
           title: "",
          },
        ]
    }, $("#map"));

    var defaults = {
      width: "30px",
      height: "30px",
      movable: true,
      resizable: true,
      css_classes: ['geek'],
      src: function(geek) {
        if(!geek.avatar_fname) return '/public/images/smiley.png';
        return "/public/images/geeks/" + geek.avatar_fname;
      },
      z: 2,
      top: 0,
      left: 0,
      title: function(geek) {
        return geek.name + " aka " + geek.nickname;
      },
      update_callback: function(geek) {
        geek.save();
      }
    },
    add_geek = function(geek) {
      geeks_map.add_object(geek, defaults);
    };

    R.Geek.index(function(geeks) {
      geeks.forEach(add_geek);
    });
    events_dispatcher.bind('NewGeek', function(json_geek) {
      var geek = new R.Geek(json_geek);
      add_geek(geek);
    });
    events_dispatcher.bind('UpdateGeek', function(json_geek) {
      var geek = new R.Geek(json_geek);
      geeks_map.remove_object(geek.id);
      geeks_map.add_object(geek, defaults);
      if(window.location.hash == "#/geeks/" + geek.id + "/edit") {
        $("#upload_avatar").html('<img src="'+defaults.src(geek)+'" />');
      }
    });

    var irc_url = $('#irc_urls'),
    add_url = function(url) {
      irc_url.find('ul').append('<li><span></span><a href="' + url.url +
                                '">'+ url.url +'</a></li>');
      irc_url.find('ul li:last span').text(url.channel + ' (' + url.from + '): ');
      irc_url.scrollTop(irc_url[0].scrollHeight);
    };
    events_dispatcher.bind('IrcURL', add_url);
    $.getJSON('/urls.json', function(urls) {
      urls.forEach(add_url);
    });

    var app = $.sammy(function() {
    });
    app.run();

   $('#map .obj').live('dblclick', function(event) {
     var geek = $(this).data('obj'); 
     if (geek && geek.id) {
       window.location.hash = '#/geeks/' + geek.id + '/edit';
     }
     return false; 
   })
   .click(function(event) {
     window.location.hash = '#/';
     return false;
   });

  });
};

