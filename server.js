const http = require('http');
const querystring = require('querystring');
const discord = require('discord.js-selfbot');
const client = new discord.Client();

http.createServer(function(req, res){
 if (req.method == 'POST'){
   var data = "";
   req.on('data', function(chunk){
     data += chunk;
   });
   req.on('end', function(){
     if(!data){
        console.log("No post data");
        res.end();
        return;
     }
     var dataObject = querystring.parse(data);
     console.log("post:" + dataObject.type);
     if(dataObject.type == "wake"){
       console.log("Woke up in post");
       res.end();
       return;
     }
     res.end();
   });
 }
 else if (req.method == 'GET'){
   res.writeHead(200, {'Content-Type': 'text/plain'});
   res.end('Discord Bot is active now\n');
 }
}).listen(3000);

client.on("ready", () => {
console.log(`${client.user.tag} is ready!`)
});

function sendReply(message, text){
  message.reply(text)
    .then(console.log("リプライ送信: " + text))
    .catch(console.error);
}

function sendMsg(channelId, text, option={}){
  client.channels.get(channelId).send(text, option)
    .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
    .catch(console.error);
}

client.on('message', async message => {
  if(message.author.bot){
  return;
}
  if(message.author.id === "707459939446161438" || message.author.id === "759001587422462015"){
  if (message.content.toLowerCase().startsWith("!9say")) {
   const [name, ...args] = message.content.slice(3).split("y ");
  message.delete()
  message.channel.send(args[0])
    }
  if (message.content.toLowerCase().startsWith("!allsay")) {
   const [name, ...args] = message.content.slice(3).split("y ");
  message.delete()
  message.channel.send(args[0])
    }
  }
});

client.on('message', async message => {
if(message.channel.id === "876405324989489192" && message.author.id === "759001587422462015" && message.content == "rin"){
message.channel.send("rin")
  }
});

client.login("ODk2OTc3NTU2NjUyMjk0MTU1.YfhyYA.UPWOzLvni8BL5YOYhJaRKhgJqbs")