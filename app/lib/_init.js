App = {};

if(Meteor.isServer && _.isEmpty(Meteor.settings)) {
  console.error('Settings not found, use --settings [file] to include settings for the app.');
  process.exit(0);
}

App.settings = Meteor.settings;

_.each(_.keys(App.settings.public), function(key) {
  App.settings[key] = App.settings.public[key];
});
delete App.settings.public;

App.Collections = {};
App.Controllers = {};
App.Jobs        = {};
App.Models      = {};
App.Schemas     = {};
App.Scrapers    = {};
App.Match       = {};

// Meteor.startup(function() {
//   var url = 'http://services.runescape.com/m=hiscore_oldschool_ultimate/overall.ws';

//   var urls = App.Scrapers.oldSchoolPlayers(url);

//   _.each(urls, function(url) {
//     Meteor.setTimeout(function() {
//       var player = App.Scrapers.oldSchoolPlayer(url);

//       if(player.username) {
//         App.Collections.Players.insert(player, function(err, id) {
//           if(err) {
//             console.log(player);
//           }
//           else {
//             console.log('added player', player.username, id);
//           }
//         });

//       }

//     }, Math.random() * 10000);
//   })

// });