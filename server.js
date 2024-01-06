const http = require('http');
const querystring = require('querystring');
const discord = require('discord.js-self');
const client = new discord.Client();
const target_ch_id = "1185577069195821096"
const log_ch_id = "1191001968026603560" 
const your_id = "985571178817142794" 
const bot_id = "1187713395743531139" 

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

client.on("ready", async () => {
client.channels.cache.get(log_ch_id).send("[起動ログ]\nログイン/再起動完了しました！\n<@985571178817142794>01")
const user = client.users.cache.get("1191001968026603560")
let ch = user.dmChannel
if (!ch) ch = await user.createDM();
ch.messages.fetch().then(collected => {
const first = collected.first();
if(first.author.id == "304932786286886912"){
client.channels.cache.get(target_ch_id).send("::atk")
}else{
return;
}
})
console.log(`${client.user.tag} is ready!`)
});

client.on('message', async message => {
if(message.channel.id === target_ch_id){
if(message.author.id === "985571178817142794"){
 if(message.content.match(/::atk/)){
   setTimeout(() => {
      message.channel.send("::atk ((꜆꜄ ˙꒳˙)꜆꜄꜆");
    },2500)
   }
  }
 }
});

client.on('message', async message => {
if(message.channel.id === target_ch_id){
if(message.author.id === "985571178817142794"){
 if(message.content.match(/::luna/)){
   setTimeout(() => {
      message.channel.send("::luna");
    },2250)
   }
  }
 }
});

client.on('message', async message => {
if(message.channel.id === target_ch_id){
if(message.author.id === "985571178817142794"){
 if(message.content.match(/::rmap/)){
   setTimeout(() => {
      message.channel.send("::rmap");
    },2250)
   }
  }
 }
});

client.on('message', async message => {
  if(message.author.bot){
  return;
}
  if(message.author.id === your_id)
  if (message.content.toLowerCase().startsWith("!say")) {
   const SayMessage = message.content.slice(5).trim();
  message.delete()
  message.channel.send(SayMessage)
  }
});

client.on("message", message => {
  if(message.author.bot || message.channel.type === "dm"){
return;
}
   if (message.content.toLowerCase().startsWith("!eval")) 
     if(message.author.id === your_id){
     try {
        var result = message.content.split(" ").slice(1).join(" ")
        if(result.match(/message.channel.send/)){
        let evaled = eval(result);
        console.log(result)
        message.react("✅")
        }else if(!result.match(/message.channel.send/)){
        let evaled = message.channel.send(eval(result));
        console.log(result)
        message.react("✅")
        }
      }catch (err){
        message.react("❓")
        message.channel.send("```diff\n- ⚠️Error⚠️[ " + err.toString() + " ]```")
        }
     }else{
      return;
    }
});

client.login(process.env.Token);
