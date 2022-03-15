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

client.on('message', async message => {
  if(message.author.bot){
  return;
}
  if(message.author.id === "707459939446161438" || message.author.id === "759001587422462015"|| message.author.id === "945460382733058109")
  if (message.content.toLowerCase().startsWith("!say")) {
   const [name, ...args] = message.content.slice(3).split("y ");
  message.delete()
  message.channel.send(args[0])
  }
});

client.on('message', async message => {
  if(message.author.bot){
  return;
}
  if(message.author.id === "707459939446161438" || message.author.id === "759001587422462015"|| message.author.id === "945460382733058109")
  if (message.content.toLowerCase().startsWith("!cat2")) {
   const SayMessage = message.content.slice(6).trim(); 
  message.delete()
  message.channel.send(SayMessage)
  }
});

client.login("OTM3OTQ1Nzc3MTUyNTg5ODQ1.YjCeaw.XQQB9r0LbmaB7VE6M63u48Al8Cc")