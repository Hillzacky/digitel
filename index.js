const os = require('os');
const express = require('express');
const commands = require('./commands.js');
const TelegramBot = require('node-telegram-bot-api');
const Digiflazz = require('./digiflazz.js');
const { priceList } = require('./digiflazz-price.js');
const { Keyboard, Key } = require('telegram-keyboard');
const { toRp, waktu, objParse, objParses, ipParse } = require('./utils.js');
const digiflazz = new Digiflazz(process.env.USR, process.env.API);
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;
const url = process.env.URL ?? '0.0.0.0'
const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ?? 8081;
const bot = new TelegramBot(token, {
  polling: {
    params: {
      allowed_updates: ["message", "callback_query", "message_reaction"],
    }
  },
  webhook: { url,host,port }
});
const app = express();
bot.setWebHook(`${url}/webhook-${token}`);
app.use(express.json());
app.get(`/`, (req, res) => {
  let time = new Date();
  console.info(time);
  res.json({time,host,port});
});
app.get(`/prepaid`, async(req, res) => {
  let plpr = await digiflazz.daftarHarga('prepaid');
  res.json(plpr);
});
app.get(`/pasca`, async(req, res) => {
  let plpa = await digiflazz.daftarHarga('pasca');
  res.json(plpa);
});
app.get(`/pricelist`, async(req, res, next) => {
  res.set('Content-Type', 'text/html');
  const content = await priceList();
  res.send(Buffer.from(content));
});
app.post(`/webhook-${token}`, (req,res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
app.post(`/webhook`, Digiflazz.webhook(digiflazz), (req,res) => {
  // Anda dapat memproses hasilnya disini
  // result webhook dapat diakses di req.dfwh
  console.info(req.dfwh)
});
app.listen(port, host, () => {
  console.info(`Server listening on ${port}`);
});

bot.setMyCommands(commands);
bot.onText(/([a-zA-Z]{3,3}) ([a-zA-Z0-9.#]+)/, async (msg, group) => {
  // sku, tujuan, ref_id
  let res=null,
  cmd=group[1].toUpperCase(),
  trx=group[2].split(".", 3),
  rid=(!trx[2]) ? 'R#'+waktu() : trx[2];
  switch(cmd){
    case 'TRX':
      res=await digiflazz.transaksi(trx[0],trx[1],rid);
    break;
    case 'CEK':
      res=await digiflazz.transaksi(trx[0],trx[1],rid,'CEK');
    break;
    case 'BYR':
      res=await digiflazz.transaksi(trx[0],trx[1],rid,'BAYAR');
    break;
    case 'STS':
      res=await digiflazz.transaksi(trx[0],trx[1],rid,'STATUS');
    break;
    case 'PLN':
      res=await digiflazz.validateInqPln(group[2]);
    break;
    case 'ISI':
      // nominal, bank, a/n
      res=await digiflazz.deposit(trx[0],trx[1].toUpperCase(),trx[2].toUpperCase());
      // bot.sendMessage(msg.chat.id, JSON.stringify(res))
    break;
    default:
      res='404 Command not found.';
    break;
  }
  // console.info(res);
  bot.sendMessage(msg.chat.id, objParse(res)).catch((err) => {
    console.error(err.code);
    console.info(err.response.body);
  });
});

bot.on('message', async (msg) => {
  let resMsg = null, options = null;
  switch(msg.text){
    case '/start':
      options = Keyboard.make([
        '/ceksaldo',
        '/help',
        '/harga',
        '/ip'
      ],{ columns: 2 }).reply();
      resMsg = 'Welcome to the ppob application by Copysland!';
    break;
    case '/help':
      options = { parse_mode: 'markdown' }
      resMsg = '**Cara Deposit**\n-----\n```Rule  ISI nominal.namabank.atasnama\n  ISI 200000.MANDIRI.COPYSLAND```\n=====\n**Cara Bertransaksi**\n-----\n**Transaksi Prepaid**\n```Rule  TRX code.tujuan.reportID```\nJika tanpa reportID akan generate secara otomatis\n```CONTOH  TRX pulsatri50.08990666680.R#00125```\nUntuk pengecekan status kirim hal serupa dengan id report yang dikirim sebelumnya.\n\n**Transaksi PascaBayar**\n__Validasi id tujuan sebelum pembayaran__\n```Rule  CEK code.tujuan.reportID\n```__Pembayaran transaksi pasca__\n```Rule  BYR code.tujuan.reportID```\n__Cek status transaksi pascabayar__\n```Rule  STS code.tujuan.reportID```';
    break;
    case '/harga':
      options = Keyboard.make([
        Key.callback('Prepaid', 'prepa'),
        Key.callback('Pospaid', 'pasca')
      ]).inline()
      resMsg = url + '/pricelist';
    break;
    case '/ceksaldo':
      let saldo = await digiflazz.cekSaldo();
      resMsg = 'Saldo: ' + toRp(saldo.deposit);
    break;
    case '/ip':
      try {
      const ni = os.networkInterfaces();
      resMsg = ipParse(ni);
      } catch(e) { resMsg=e; }
    break;
    case '/responsecode':
      resMsg = 'https://developer.digiflazz.com/api/buyer/response-code';
    break;
  }
  if(!options) {
    bot.sendMessage(msg.chat.id, resMsg).catch((err) => {
      console.error(err.code);
      console.info(err.response.body);
    });
  } else {
    bot.sendMessage(msg.chat.id, resMsg, options).catch((err) => {
      console.error(err.code);
      console.info(err.response.body);
    });
  }
});

bot.on('polling_error', (err) => {
  bot.startPolling();
  console.error(err.code);
});
bot.on('webhook_error', (err) => {
  console.error(err.code);
});

bot.on('callback_query', async(cbq)=>{
  let res = '';
  console.log(cbq.message.chat.id, cbq.data, cbq);
  bot.answerCallbackQuery(cbq.id, {
    text: "It's working"
  })
  switch(cbq.data){
    case 'prepa':
      res = await digiflazz.daftarHarga('prepaid');
    break;
    case 'pasca':
      res = await digiflazz.daftarHarga('pasca');
    break;
  }
  bot.sendMessage(cbq.chat.id, JSON.stringify(res))
});

bot.on("message_reaction", (mr)=>{
  // console.log(mr.user,mr.chat,mr)
  bot.sendMessage(mr.chat.id, JSON.stringify(mr))
});
