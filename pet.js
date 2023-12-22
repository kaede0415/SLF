const http = require('http');
const {Client,Intents,MessageEmbed,MessageActionRow,MessageButton,} = require("discord.js-selfbot-v13")
const client = new Client({
  syncStatus: false,
  checkUpdate: false,
});
const target_ch_id = "1184271384147394560"

http
  .createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
    response.end(`${client.user.tag} is ready!\n導入サーバー:${client.guilds.cache.size}\nユーザー:${client.users.cache.size}`)
  })
  .listen(3000)

client.on("ready", async () => {
  client.channels.cache.get("937267631055073310").send("ログイン/再起動完了しました！\n最終更新時のファイル↓", { files: ['./server.js'] })
  console.log(`${client.user.tag} is ready!`)
  client.channels.cache.get(target_ch_id).send("::atk")
});

function judge(message){
  if(message.embeds[0]){
    if(message.embeds[0].title && message.embeds[0].title.split("\n")[0].replace("が待ち構えている...！","") == "ジャックフロスト" && message.embeds[0].title != "戦闘結果:") return 2
    if(message.embeds[0].title && message.embeds[0].title.split("\n")[0].replace("が待ち構えている...！","") != "ジャックフロスト" && message.embeds[0].title != "戦闘結果:") return 1
    if(message.embeds[0].description && message.embeds[0].description.match(/仲間になりたそうに/)) return 8
  }else{
    if(message.content.match(/コマンドの処理が終わってません/)) return 0
    if(message.content.includes(`${client.user.globalName}のHP:`) && !message.content.includes(`${client.user.globalName}はやられてしまった。。。`)) return 3
    if(message.content.includes(`${client.user.globalName}のHP:`) && message.content.includes(`${client.user.globalName}はやられてしまった。。。`)) return 4
    if(message.content.match(/エリクサーを使ってこのチャンネルに参加している仲間とPETが全回復した！/)) return 5
    if(message.content.match(/もうやられている！/)) return 6
    if(message.content.match(/ファイアボール/)) return 7
    if(message.content.match(/エリクサーを持っていない/)) return 9
  }
  return undefined
}

client.on('messageCreate', async message => {
  if(message.channel.id == target_ch_id){
    if(message.author.id == "526620171658330112"){
      const num = judge(message)
      if(num == undefined) return
      else if(num == 0) setTimeout(function(){ message.channel.send(`::atk`) },2000)
      else if(num == 1) setTimeout(function(){ message.channel.send(`::atk`) },200)
      else if(num == 2) setTimeout(function(){ message.channel.send(`::i f`) },200)
      else if(num == 3) setTimeout(function(){ message.channel.send(`::atk`) },200)
      else if(num == 4) setTimeout(function(){ message.channel.send(`::i e`) },200)
      else if(num == 5) setTimeout(function(){ message.channel.send(`::atk`) },200)
      else if(num == 6) setTimeout(function(){ message.channel.send(`::i e`) },200)
      else if(num == 7) setTimeout(function(){ message.channel.send(`::i f`) },200)
      else if(num == 8) setTimeout(async () => { await message.clickButton({ row: 0, col: 0 }) },200)
      else if(num == 9) setTimeout(function(){ message.channel.send(`::re`) },200)
    }
  }
});

client.login(process.env.Token);