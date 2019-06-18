const Discord = require('discord.js');
const client = new Discord.Client(); 
const fs = require('fs');
const prefix = "$"



//////كود طرد البوتات 
let antihack = JSON.parse(fs.readFileSync('./antihack.json' , 'utf8'));//require antihack.json file
client.on('message', message => {
    if(message.content.startsWith(prefix + "cjantihack")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!antihack[message.guild.id]) antihack[message.guild.id] = {
          onoff: 'Off'
        }
          if(antihack[message.guild.id].onoff === 'Off') return [message.channel.send(`**تم تشغيل حماية السيرفر !**`), antihack[message.guild.id].onoff = 'On']
          if(antihack[message.guild.id].onoff === 'On') return [message.channel.send(`**تم ايقاف حماية السيرفر !**`), antihack[message.guild.id].onoff = 'Off']
          fs.writeFile("./antihack.json", JSON.stringify(antihack), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }
 
        })
        //antihack with ON , OFF ! RARE CODE
        //LIKE PLUSBOT !
 

    const data = require("./data.json");
  });
  client.on('roleDelete', (u) => {
      u.guild.fetchAuditLogs().then( s => {
          var ss = s.entries.first();
          if (ss.action == `ROLE_DELETE`) {
          if (!data[ss.executor.id]) {
              data[ss.executor.id] = {
              time : 1
            };
            if(antihack[u.guild.id].onoff === 'Off') return;
 
        } else {
            data[ss.executor.id].time+=1
        };
        if(antihack[u.guild.id].onoff === 'Off') return;
 
  data[ss.executor.id].time = 0
  u.guild.members.get(ss.executor.id).roles.forEach(r => {   
                  r.edit({
                      permissions : []  
                  });
                  data[ss.executor.id].time = 0
              });
          setTimeout(function(){
              if (data[ss.executor.id].time <= 3) {
                  data[ss.executor.id].time = 0
              }
          },60000)
      };
      });
    const data = require("./data.json");
  });
  client.on('channelDelete', (u) => {  
      u.guild.fetchAuditLogs().then( s => { 
          var ss = s.entries.first();
          if (ss.action == `CHANNEL_DELETE`) { 
          if (!data[ss.executor.id]) {
              data[ss.executor.id] = { 
              time : 1
            };
            if(antihack[u.guild.id].onoff === 'Off') return;
        } else {
            data[ss.executor.id].time+=1
        };
        if(antihack[u.guild.id].onoff === 'Off') return;
  data[ss.executor.id].time = 0
  u.guild.members.get(ss.executor.id).roles.forEach(r => {
                  r.edit({
                      permissions : []
                  });
                  data[ss.executor.id].time = 0
              });
          setTimeout(function(){
              if (data[ss.executor.id].time <= 3) { //Toxic Codes
                  data[ss.executor.id].time = 0
              }
          })
      };
      });
    const data = require("./data.json");
  })
  let antibots = JSON.parse(fs.readFileSync('./antibots.json' , 'utf8'));//require antihack.json file
  client.on('message', message => {
    if(message.content.startsWith(prefix + "antibots on")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**Sorry But You Dont Have Permission** `ADMINISTRATOR`' );
antibots[message.guild.id] = {
onoff: 'On',
}
message.channel.send(`**تم تفعيل مانع البوتات**`)
          fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }
 

    if(message.content.startsWith(prefix + "antibots off")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**Sorry But You Dont Have Permission** `ADMINISTRATOR`' );
antibots[message.guild.id] = {
onoff: 'Off',
}
message.channel.send(`**تم ايقاف مانع البوتات**`)
          fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }
 
        })
 
client.on("guildMemberAdd", member => {
  if(!antibots[member.guild.id]) antibots[member.guild.id] = {
onoff: 'Off'
}
  if(antibots[member.guild.id].onoff === 'Off') return;
if(member.user.bot) return member.kick()
})
 
fs.writeFile("./antibots.json", JSON.stringify(antibots), (err) => {
if (err) console.error(err)
.catch(err => {
console.error(err);
});
})

//////كود منع التخريب

var config = {
  events: [
    {type: "CHANNEL_CREATE", logType: "CHANNEL_CREATE", limit: 3 , delay: 5000},
    {type: "CHANNEL_DELETE", logType: "CHANNEL_DELETE", limit: 3, delay: 5000},
    {type: "GUILD_MEMBER_REMOVE", logType: "MEMBER_KICK", limit: 3, delay: 5000},
    {type: "GUILD_BAN_ADD", logType: "MEMBER_BAN_ADD", limit: 3, delay: 5000},
    {type: "GUILD_ROLE_CREATE", logType: "ROLE_CREATE", limit: 3, delay: 5000},
    {type: "GUILD_ROLE_DELETE", logType: "ROLE_DELETE", limit: 3, delay: 5000},
  ]
}
client.on("error", (e) => console.error(e));
client.on("raw", (packet)=> {
  let {t, d} = packet, type = t, {guild_id} = data = d || {};
  if (type === "READY") {
    client.startedTimestamp = new Date().getTime();
    client.captures = [];
  }
  let event = config.events.find(anEvent => anEvent.type === type);
  if (!event) return;
  let guild = client.guilds.get(guild_id);
  if (!guild) return;
  guild.fetchAuditLogs({limit : 1, type: event.logType})
    .then(eventAudit => {
      let eventLog = eventAudit.entries.first();
      if (!eventLog) return;
      let executor = eventLog.executor;
      guild.fetchAuditLogs({type: event.logType, user: executor})
        .then((userAudit, index) => {
          let uses = 0;
          userAudit.entries.map(entry => {
            if (entry.createdTimestamp > client.startedTimestamp && !client.captures.includes(index)) uses += 1;
          });
          setTimeout(() => {
            client.captures[index] = index
          }, event.delay || 2000)
          if (uses >= event.limit) {
            client.emit("reachLimit", {
              user: userAudit.entries.first().executor,
              member: guild.members.get(executor.id),
              guild: guild,
              type: event.type,
            })
          }
        }).catch(console.error)
    }).catch(console.error)
});




client.on("reachLimit", (limit)=> {
    let log = limit.guild.channels.find( channel => channel.name === "log-plus");
    log.send(`<@${limit.user.id}>`+"\ntried to hack (!)");
    limit.guild.owner.send(limit.user.username+"\nحاول أختراق السيرفر (!)")
    limit.member.roles.map(role => {
      limit.member.removeRole(role.id)
      .catch(log.send)
    });
  });

client.on('ready', () => {
   console.log(`----------------`);
      console.log(`Desert Bot- Script By : osama,tech.#0184`);
        console.log(`----------------`);
      console.log(`ON ${client.guilds.size} Servers '     Script By : osama,tech.#0184 ' `);
    console.log(`----------------`);
  console.log(`Logged in as ${client.user.tag}!`);
client.user.setGame(`#Dev by osama,tech.#0184`,"http://twitch.tv/S-F")
client.user.setStatus("dnd")
});

/////// المشاركين في البوت " 
////// 1- server codes
////// 2- -Kyle,#4434
////// 3- osama,tech.#0184
/////رابط سيرفر اسامة https://discord.gg/QMeKMyg
///// 4- Azoqz#0888




client.login("process.env.BOT_TOKEN");
