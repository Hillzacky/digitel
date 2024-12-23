const express = require('express');
const os = require('os');
const TelegramBot = require('node-telegram-bot-api');
const { Keyboard, Key } = require('telegram-keyboard');
const Digiflazz = require('./digiflazz.js');
const commands = require('./commands.js');
const { toRp, waktu } = require('./utils.js');
const digiflazz = new Digiflazz(process.env.USR, process.env.API);
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: false });
const url = process.env.URL ?? '0.0.0.0'
const host = process.env.HOST ?? '0.0.0.0';
const port = process.env.PORT ?? 8081;
const app = express();
bot.setWebHook(`${url}/bot${token}`);
app.use(express.json());
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
app.get(`/`, (req, res) => {
  res.json({host,port});
});
app.listen(port, host, () => {
  console.info(`Server is listening on ${port}`);
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
    break;
    default:
      res='404 Command not found.';
    break;
  }
  console.info(res);
  bot.sendMessage(msg.chat.id, JSON.stringify(res));
});

bot.on('message', async (msg) => {
  let resMsg = null, keyMsg = {};
  switch(msg.text){
    case '/start':
      resMsg = 'Welcome to the ppob!';
    break;
    case '/menu':
      keyMsg = Keyboard.make([
        Key.callback('Cek Saldo', '/ceksaldo'),
        Key.callback('Transaksi', '/help'),
        Key.callback('Daftar Harga Prepaid', '/harga1'),
        Key.callback('Daftar Harga Pasca', '/harga2'),
        Key.callback('Cek IP', '/ip')
      ],{ columns: 2 }).reply()
      resMsg = 'PPOB by Copysland';
    break;
    case '/harga1':
      let plpr = await digiflazz.daftarHarga('prepaid');
      resMsg = JSON.stringify(plpr);
      keyMsg = {};
    break;
    case '/harga2':
      let plpa = await digiflazz.daftarHarga('pasca');
      resMsg = JSON.stringify(plpa);
      keyMsg = {};
    break;
    case '/ceksaldo':
      let saldo = await digiflazz.cekSaldo();
      resMsg = 'Saldo: ' + toRp(saldo.deposit);
      keyMsg = {};
    break;
    case '/ip':
      const ni = os.networkInterfaces();
      resMsg = JSON.stringify(ni);
      keyMsg = {};
    break;
  }
  bot.sendMessage(msg.chat.id, resMsg, keyMsg);
});

bot.on('polling_error', (err) => {
  bot.startPolling();
  console.error(err.code);
});
