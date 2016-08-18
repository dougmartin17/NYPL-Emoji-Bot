'use strict';

const Images = require('../src/images');
const Tweet = require('../src/tweet');
const Twitter = require('../src/twitter');

let stream = Twitter.stream();

stream.on('tweet', (payload) => {
  let status_id = payload.id_str;

  if (shouldReply(payload)) {
    //let image = new Images().getFromText(payload.text);
    //if (!image) { return; }


    //let tweet = new Tweet(image).getReply(payload.user.screen_name);
    console.log("Reply to "+payload.user.screen_name+"!");
    // Takes a string and a twitter handle to reply to.
    Twitter.reply("@"+payload.user.screen_name+" SnowBot7 replied to you!", status_id);
  }
});

stream.on('error', (payload) => {
  console.error(payload);
});

function shouldReply(payload) {
  return Twitter.isMentioned(payload) && !Twitter.isRetweet(payload);
}
