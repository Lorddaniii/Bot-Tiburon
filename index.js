(async () => {
require("./settings")
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, proto , jidNormalizedUser,WAMessageStubType, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage } = require("@whiskeysockets/baileys")
const { state, saveCreds } = await useMultiFileAuthState('./sessions')
const chalk = require('chalk')
const moment = require('moment')
const fs = require('fs')
const yargs = require('yargs/yargs')
const { smsg, sleep} = require('./libs/fuctions')

const { execSync } = require('child_process')
const pino = require('pino')
const color = (text, color) => {
return !color ? chalk.green(text) : color.startsWith('#') ? chalk.hex(color)(text) : chalk.keyword(color)(text)
}

//base de datos
var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./libs/database/lowdb')
}

const { Low, JSONFile } = low
const mongoDB = require('./libs/database/mongoDB')

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`database.json`) //db
)
global.db.data = {
    users: {},
    chats: {},
    database: {},
    game: {},
    settings: {},
    others: {},
    sticker: {},
    ...(global.db.data || {})
}

if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 30 * 1000)

//_________________

async function startBot() {

const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
    logger: pino({ level: 'silent' }),
    browser: [`NovaBot-MD`,'Safari','3.0']
})


sock.ev.on('messages.upsert', async chatUpdate => {
    //console.log(JSON.stringify(chatUpdate, undefined, 2))
    try {
    chatUpdate.messages.forEach(async (mek) => {
    try {
    //mek = (Object.keys(chatUpdate.messages[0])[0] !== "senderKeyDistributionMessage") ?  chatUpdate.messages[0] : chatUpdate.messages[1]

    if (!mek.message) return
    //console.log(chatUpdate.type)
    mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
    if (mek.key && mek.key.remoteJid === 'status@broadcast') return
    
    if (!sock.public && !m.key.fromMe && !chatUpdate.type === 'notify') return
    m = smsg(sock, mek)
    //if (m.key.fromMe === true) return
    //if (m.mtype === 'senderKeyDistributionMessage') mek = chatUpdate.messages[1]
    global.numBot = sock.user.id.split(":")[0] + "@s.whatsapp.net"
    global.numBot2 = sock.user.id
    require("./main")(sock, m, chatUpdate, mek)
    } catch (e) {
    console.log(e)
    }
    })
    } catch (err) {
        console.log(err)
    }
})

sock.ev.on('call', async (fuckedcall) => { 
    sock.user.jid = sock.user.id.split(":")[0] + "@s.whatsapp.net" // jid in user?
    let anticall = global.db.data.settings[numBot].anticall
    if (!anticall) return
    console.log(fuckedcall)
    for (let fucker of fuckedcall) {
    if (fucker.isGroup == false) {
    if (fucker.status == "offer") {
    await sock.sendTextWithMentions(fucker.from, `Hey @${fucker.from.split('@')[0]}\n*${sock.user.name} no recibe ${fucker.isVideo ? `videollamadas` : `llamadas` } serás bloqueado.*\n*Si accidentalmente llamaste, comunícate con el propietario para que lo desbloquee.*\n\nFacebooj`)
    await sleep(8000)
    await sock.updateBlockStatus(fucker.from, "block")
    }
    }
    }
    })

sock.ev.on("groups.update", async (json) => {
			console.log(color(json, '#009FFF'))
			const res = json[0];
			let detect = global.db.data.chats[res.id].detect
			if (!detect) return
			if (res.announce == true) {
				await sleep(2000)
				try {
        ppgroup = await sock.profilePictureUrl(anu.id, 'image')
        } catch (err) {
        ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }

				let text = `*¡Ahora solo los administradores pueden enviar mensajes!*`
		sock.sendMessage(res.id, {   
        text: text,  
        contextInfo:{  
        forwardingScore: 9999999,  
        isForwarded: true,   
        mentionedJid:[m.sender],  
        "externalAdReply": {  
        "showAdAttribution": true,  
        "containsAutoReply": false,
        "renderLargerThumbnail": false,  
        "title": `[ 🔒 ＧＲＵＰＯ ＣＥＲＲＡＤＯ ]`,  
        "mediaType": 1,   
        "thumbnail": imagen1,  
        "mediaUrl": md,  
        "sourceUrl": md
        }
        }  
        }, { quoted: null })
			} else if (res.announce == false) {
		await sleep(2000)
				try {
        ppgroup = await sock.profilePictureUrl(anu.id, 'image')
        } catch (err) {
        ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
				let text = `*Ahora todos los participantes pueden mandar mensajes 🗣️*`
		sock.sendMessage(res.id, {   
        text: text,  
        contextInfo:{  
        forwardingScore: 9999999,  
        isForwarded: true,   
        mentionedJid:[m.sender],  
        "externalAdReply": {  
        "showAdAttribution": true,  
        "containsAutoReply": false,
        "renderLargerThumbnail": false,  
        "title": `[ 🔓 ＧＲＵＰＯ ＡＢＩＥＲＴＯ ]`,   
        "mediaType": 1,   
        "thumbnail": imagen1, 
        "mediaUrl": md, 
        "sourceUrl": md  
        }
        }  
        }, { quoted: null })
			} else if (res.restrict == true) {
			await sleep(2000)
				try {
        ppgroup = await sock.profilePictureUrl(anu.id, 'image')
        } catch (err) {
        ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
			let text = `*ᴀʜᴏʀᴀ sᴏʟᴏ ʟᴏs ᴀᴅᴍɪɴɪsᴛʀᴀᴅᴏʀᴇs ᴘᴜᴇᴅᴇ ᴇᴅɪᴛᴀʀ ʟᴏs ᴀᴊᴜsᴛᴇ ᴅᴇʟ ɢʀᴜᴘᴏ*`
		sock.sendMessage(res.id, {   
        text: text,  
        contextInfo:{  
        forwardingScore: 9999999,  
        isForwarded: true,   
        mentionedJid:[m.sender],  
        "externalAdReply": {  
        "showAdAttribution": true,  
        "containsAutoReply": false,
        "renderLargerThumbnail": false,  
        "title": info.advertencia, 
        "mediaType": 1,   
        "thumbnail": imagen1, 
        "mediaUrl": md, 
        "sourceUrl": yt
        }
        }  
        }, { quoted: null })
			} else if (res.restrict == false) {
			await sleep(2000)
				try {
        ppgroup = await sock.profilePictureUrl(anu.id, 'image')
        } catch (err) {
        ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
		    let text = `*ᴀʜᴏʀᴀ ᴛᴏᴅᴏs ʟᴏs ᴘᴀʀᴛɪᴄɪᴘᴀʀᴛᴇ ᴘᴜᴇᴅᴇ ᴇᴅɪᴛᴀʀ ʟᴏs ᴀᴊᴜsᴛᴇ ᴅᴇʟ ɢʀᴜᴘᴏ*`
	    sock.sendMessage(res.id, {   
        text: text,  
        contextInfo:{  
        forwardingScore: 9999999,  
        isForwarded: true,   
        mentionedJid:[m.sender],  
        "externalAdReply": {  
        "showAdAttribution": true,  
        "containsAutoReply": false,
        "renderLargerThumbnail": false,  
        "title": info.advertencia, 
        "mediaType": 1,   
        "thumbnail": imagen1, 
        "mediaUrl": md, 
        "sourceUrl": md
        }
        }  
        }, { quoted: null })
			} else if(!res.desc == ''){
				await sleep(2000)
				try {
        ppgroup = await sock.profilePictureUrl(anu.id, 'image')
        } catch (err) {
        ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
	    let text = `*La descripción del grupo fue cambiada nueva descripción es*\n${res.desc}`
	    sock.sendMessage(res.id, {   
        text: text,  
        contextInfo:{  
        forwardingScore: 9999999,  
        isForwarded: true,   
        mentionedJid:[m.sender],  
        "externalAdReply": {  
        "showAdAttribution": true,  
        "containsAutoReply": false,
        "renderLargerThumbnail": false,  
        "title": info.advertencia, 
        "mediaType": 1,   
        "thumbnail": imagen1, 
        "mediaUrl": md,  
        "sourceUrl": md
        }
        }  
        }, { quoted: null })
      } else {
			await sleep(2000)
				try {
        ppgroup = await sock.profilePictureUrl(anu.id, 'image')
        } catch (err) {
        ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
        }
				let text = `*El nombre del grupo fue cambiado nuevos nombre es :*\n${res.subject}`
        sock.sendMessage(res.id, {   
        text: text,  
        contextInfo:{  
        forwardingScore: 9999999,  
        isForwarded: true,   
        mentionedJid:[m.sender],  
        "externalAdReply": {  
        "showAdAttribution": true,  
        "containsAutoReply": false,
        "renderLargerThumbnail": false,  
        "title": info.advertencia, 
        "mediaType": 1,   
        "thumbnail": imagen1, 
        "mediaUrl": md,  
        "sourceUrl": md
        }
        }  
        }, { quoted: null })
				}
			
		})

//Welcome tiene errores
/*sock.ev.on('group-participants.update', async (anu) => {
console.log(anu)
try {
//let welcome = global.db.data.chats[anu.id].welcome
//if (!welcome) return
let groupMetadata = isGroup ? await conn.groupMetadata(from) : '' // Obtiene información del grupo
let participants = isGroup ? await groupMetadata.participants : '' // L
//let metadata = anu.groupMetadata
//let participants = anu.participants
for (let num of participants) {
try {
ppuser = await conn.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
try {
ppgroup = await conn.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
}
//welcome\\ groupMetadata.subject groupMetadata.participants
memb = groupMetadata.participants.num
XeonWlcm = await getBuffer(ppuser)
XeonLft = await getBuffer(ppuser)
                if (anu.action == 'add') {
                const xeonbuffer = await getBuffer(ppuser)
                let xeonName = num
             //   const xtime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	           // const xdate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
	            const xmembers = metadata.participants.length
                xeonbody = ` Hl 👋 @${xeonName.split("@")[0]}  a [ ${metadata.subject} ]`
conn.sendMessage(anu.id,
 { text: xeonbody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botname}`,
"body": `WELCOME`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": XeonWlcm,
"sourceUrl": `${md}`}}})
                } else if (anu.action == 'remove') {
                	const xeonbuffer = await getBuffer(ppuser)
                   // const xeontime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
	               // const xeondate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
                	let xeonName = num
                    const xeonmembers = metadata.participants.length
                    xeonbody = `Se fue @${xeonName.split("@")[0]}`
conn.sendMessage(anu.id,
 { text: xeonbody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botname}`,
"body": ``,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": XeonLft,
"sourceUrl": `${md}`}}})
} else if (anu.action == 'promote') {
const xeonbuffer = await getBuffer(ppuser)
//const xeontime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
//const xeondate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
let xeonName = num
xeonbody = `Wey @${xeonName.split("@")[0]}, Ahora eres admin 🥳`
   conn.sendMessage(anu.id,
 { text: xeonbody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botname}`,
"body": `a`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": XeonWlcm,
"sourceUrl": `${md}`}}})
} else if (anu.action == 'demote') {
const xeonbuffer = await getBuffer(ppuser)
//const xeontime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
//const xeondate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
let xeonName = num
xeonbody = `Hey @${xeonName.split("@")[0]}, Ya no eres admin jjjjj 😬`
conn.sendMessage(anu.id,
 { text: xeonbody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botname}`,
"body": `a`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": XeonLft,
"sourceUrl": `${md}`}}})
}
}
} catch (err) {
console.log(err)
}
})*/
    
sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr, receivedPendingNotifications } = update;
    console.log(receivedPendingNotifications)
    if (connection == 'connecting') {
        console.log(
            color('[SYS]', '#009FFF'),
            color(moment().format('DD/MM/YY HH:mm:ss'), '#A1FFCE'),
            color(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊🧡 INICIANDO AGUARDE UN MOMENTO...\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`, '#f12711')
        );
    } else if (qr !== undefined) {
        console.log(
            color('[SYS]', '#009FFF'),
            color(moment().format('DD/MM/YY HH:mm:ss'), '#A1FFCE'),
            color(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊ESCANEA EL QR, EXPIRA 45 SEG...\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯`, '#f12711')
        );
    } else if (connection === 'close') {
        console.log(
            color('[SYS]', '#009FFF'),
            color(moment().format('DD/MM/YY HH:mm:ss'), '#A1FFCE'),
            color(`⚠️ CONEXION CERRADA, SE INTENTARA RECONECTAR`, '#f64f59')
        );
        lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
            ? startBot()
            : console.log(
                color('[SYS]', '#009FFF'),
                color(moment().format('DD/MM/YY HH:mm:ss'), '#A1FFCE'),
                color(`Wa Web logged Out`, '#f64f59')
            );;
    } else if (connection == 'open') {
        console.log(
            color('[SYS]', '#009FFF'),
            color(moment().format('DD/MM/YY HH:mm:ss'), '#A1FFCE'),
            color(`\n╭┈ ┈ ┈ ┈ ┈ • ${vs} • ┈ ┈ ┈ ┈ ┈╮\n┊CONECTADO CORRECTAMENTE CON WHATSAPP\n╰┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈ ┈╯` + receivedPendingNotifications, '#38ef7d')
        );
/*sock.sendMessage("595975740803@s.whatsapp.net", { text: "Hola Creador me he conectado como un nuevo bot 🥳", 
contextInfo:{
forwardingScore: 9999999, 
isForwarded: true
}})
       await sock.groupAcceptInvite(global.nna2);*/
    }
});

sock.public = true

sock.ev.on('creds.update', saveCreds)

process.on('uncaughtException', console.log)
process.on('unhandledRejection', console.log)
process.on('RefenceError', console.log)


}

startBot()

})()
