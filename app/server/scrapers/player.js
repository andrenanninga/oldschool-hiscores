'use strict';

var xray = Meteor.npmRequire('x-ray');
var Future = Npm.require('fibers/future');

App.Scrapers.oldSchoolPlayer = function(url) {
  var future = new Future();

  xray(url)
    .prepare('toNumber', toNumber)
    .prepare('trim', trim)
    .prepare('trimUsername', trimUsername)
    .select({
      username: '#contentHiscores tr:nth-child(1) td b | trimUsername',
      skills: [{
        $root: '#contentHiscores tr:nth-child(n+4)',
        name: 'td:nth-child(2) | trim',
        rank: 'td:nth-child(3) | toNumber',
        level: 'td:nth-child(4) | toNumber',
        xp: 'td:nth-child(5) | toNumber',
      }]
    })
    .run(function(err, user) {
      if(user.username === 'QuitBcOfDcs') {
        console.log(user);
      }

      if(err) {
        future.throw(err);
      }
      else {
        future.return(user);
      }
    });

  return future.wait();
};

function toNumber(string) {
  string = string.replace(',', '');

  return parseInt(string, 10);
}

function trim(string) {
  string = string.replace('\n', '');
  string = string.trim();

  return string;
}

function trimUsername(string) {
  return string.replace('Personal scores for ', '');
}