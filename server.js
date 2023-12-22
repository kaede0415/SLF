const http = require('http');
const {Client,Intents,MessageEmbed,MessageActionRow,MessageButton,} = require("discord.js-selfbot-v13")
const client = new Client({
  syncStatus: false,
  checkUpdate: false,
});
const Keyv = require('keyv');
const db = new Keyv(`sqlite://db.sqlite`, { table: "database" });
const owner_id = ["707459939446161438"];
const prefix = "!2"

http
  .createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' })
    response.end(`${client.user.tag} is ready!\n導入サーバー:${client.guilds.cache.size}\nユーザー:${client.users.cache.size}`)
  })
  .listen(3000)

client.on("ready", async () => {
  client.channels.cache.get("937267631055073310").send("ログイン/再起動完了しました！\n最終更新時のファイル↓", { files: ['./server.js'] })
  console.log(`${client.user.tag} is ready!`)
  const info = await db.get(client.user.id)
  if(!info) await db.set(client.user.id,[false,undefined])
  if(info[0] == true) client.channels.cache.get(info[1]).send("::atk")
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
    if(message.content.match(/ダメージを受けた！/)) return 3
    if(message.content.match(`${client.user.globalName}は華麗にかわした！`)) return 3
  }
  return undefined
}

client.on('messageCreate', async message => {
  if(message.channel.id == "668071221165817894"){
    const array = await db.get(client.user.id)
    if(array[0] == true) client.channels.cache.get(array[1]).send("::atk")
  }
  const arg = message.content.slice(prefix.length).split(/ +/);
  const command = arg.shift().toLowerCase();
  if(!owner_id.includes(message.author.id) || !message.content.startsWith(prefix)){
    return;
  }
  if(command == "set"){
    const id = message.content.slice(prefix.length+command.length+1).trim();
    const array = await db.get(client.user.id)
    array.splice(1,1,id)
    await db.set(client.user.id,array)
    message.channel.send(`周回chを<#${id}>に設定しました！`)
  }
  if(command == "change"){
    const array = await db.get(client.user.id)
    if(array[1] == undefined || client.channels.cache.get(array[1]) == undefined){
      return message.reply("チャンネルが設定されていないまたは見つかりません")
    }
    if(array[0] == true){
      message.reply("```diff\n- SETTING:STOP```停止します。")
      array.splice(0,1,false)
      await db.set(client.user.id,array)
    }else if(array[0] == false){
      message.reply("```diff\n+ SETTING:START```5秒後に開始します。")
      array.splice(0,1,true)
      await db.set(client.user.id,array)
      setTimeout(() => { client.channels.cache.get(array[1]).send("::atk") }, 5000);
    }
  }
  if(command == "say"){
    const say = message.content.slice(prefix.length+command.length+1).trim();
    message.delete()
    message.channel.send(say)
  }
  if(command == "cat"){
    const say = message.content.slice(prefix.length+command.length+1).trim();
    message.delete()
    message.channel.send(say)
  }
  if(command == "eval"){
    if(!owner_id.includes(message.author.id)){
      message.channel.send("```diff\n- !ERROR!``````fix\nevalコマンドの実行権限がありません。```")
      message.react("❎")
    }
    try{
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
  }
});
client.on('messageCreate', async message => {
  const array = await db.get(client.user.id)
  if(array[0] == false){
    return;
  }
  if(message.channel.id == array[1]){
    if(message.author.id == "526620171658330112"){
      const num = judge(message)
      if(num == undefined) return
      else if(num == 0) setTimeout(function(){ message.channel.send(`::atk`) },2000)
      /*else if(num == 1){
        if(message.embeds[0] && message.embeds[0].author.name && message.embeds[0].author.name.match(/超激レア|最強|大地の覇者|原初|ありがとう！|天使|龍帝|三女神/)){
          message.channel.send("::luna <@&1187561350709379153>")}
        else{
          setTimeout(function(){ message.channel.send(`::atk`) },200)
        }
      }*/
      else if(num == 1){
          setTimeout(function(){ message.channel.send(`::atk`) },200)
        }
      else if(num == 2) setTimeout(function(){ message.channel.send(`::i f`) },200)
      else if(num == 3) setTimeout(function(){ message.channel.send(`::atk`) },200)
      else if(num == 4) setTimeout(function(){ message.channel.send(`::i e`) },200)
      else if(num == 5) setTimeout(function(){ message.channel.send(`::atk`) },200)
      else if(num == 6) setTimeout(function(){ message.channel.send(`::i e`) },200)
      else if(num == 7) setTimeout(function(){ message.channel.send(`::i f`) },200)
      else if(num == 8) setTimeout(async () => { await message.clickButton({ row: 0, col: 1 }) },200)
      else if(num == 9) setTimeout(function(){ message.channel.send(`::re`) },200)
    }
  }
});

client.login(process.env.Token);