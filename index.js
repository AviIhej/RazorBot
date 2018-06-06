const SlackBot = require("slackbots");
const axios = require("axios");

const bot = new SlackBot({
  token: "xoxb-377657881782-376669587363-6aHnZGvMFj61DjrEcLW4fxkP",
  name: "razorbot"
});

// Start Handler
bot.on("start", () => {
  const params = {
    icon_emoji: ":smiley:"
  };

  bot.postMessageToChannel(
    "general",
    "Get Ready to laugh with @RazorBot",
    params
  );
});

// Error Handler
bot.on('error', (err) => console.log(err));

// Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message'){
        return
    }
    handleMessage(data.text);
});

//Response to Data
function handleMessage(message) {
    if(message.includes(' chucknorris')){
        chuckJoke();
    } else if(message.includes(' yomama')){
        yoMamaJoke();
    } else if(message.includes(' random')){
        randomJoke();
    } else if(message.includes(' help')){
        help();
    }
}

// Tell Chuck Norris Joke

function chuckJoke(){
    axios.get('http://api.icndb.com/jokes/random')
        .then(res => {
            const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':laughing:'
        };

        bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
        })
}

//Tell Yo Mama Joke

function yoMamaJoke() {
    axios.get('http://api.yomomma.info')
    .then(res =>{
        const joke = res.data.joke;

        const params = {
            icon_emoji: ':tangerine:'
        }

        bot.postMessageToChannel('general', `Yo Mama: ${joke}`, params)
    });
}

// Tell Random Joke

function randomJoke(){
    const rand = Math.floor(Math.random() * 2) + 1;
    if(rand === 1){
        chuckJoke();
    } else if(rand === 2 ){
        yoMamaJoke();
    }
}

function help() {
    const params = {
        icon_emoji:':question:'
    }

    bot.postMessageToChannel('general',`Type @RazorBot with either 'chucknorris', 'yomama', or 'random' to get a joke`, params);
}