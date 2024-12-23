const express = require('express');
const os = require('os');
const TelegramBot = require('node-telegram-bot-api');
const Digiflazz = require('digiflazz');
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
bot.onText(/\/deposit (.*?) (.*?) (.*?)/, async (msg, match) => {
  // nominal, bank, a/n
  let deposit = await digiflazz.deposit(match[1],match[2].toUpperCase(),match[3].toUpperCase());
  const chatId = msg.chat.id;console.info(match);
  bot.sendMessage(chatId, JSON.stringify(match));
});

bot.onText(/\/trx (.+) (.+) (.+)/, async (msg, match) => {
  // sku, tujuan, ref_id
  const ref = (match[3]) ? match[3] : 'R#' + waktu();
  let prabyr = await digiflazz.transaksi(match[1],match[2],ref);
  const chatId = msg.chat.id;console.info(match);
  bot.sendMessage(chatId, 'Match: ' + JSON.stringify(match));
});

bot.onText(/\/cek (.+) (.+) (.+)/, async (msg, match) => {
  let cekPasca = await digiflazz.transaksi(match[1],match[2],match[3], 'CEK');
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, cekPasca);
});

bot.onText(/\/bayar (.+) (.+) (.+)/, async (msg, match) => {
  let byrPasca = await digiflazz.transaksi(match[1],match[2],match[3], 'BAYAR');
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, byrPasca);
});

bot.onText(/\/status (.+) (.+) (.+)/, async (msg, match) => {
  let statusPasca = await digiflazz.transaksi(match[1],match[2],match[3], 'STATUS');
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, statusPasca);
});

bot.on('message', async (msg) => {
  let resMsg = null;
  switch(msg.text){
    case '/menu':
      resMsg = 'Welcome to the ppob!';
    break;
    case '/harga':
      let harga = await digiflazz.daftarHarga();
      resMsg = ;
    break;
    case '/ceksaldo':
      let saldo = await digiflazz.cekSaldo();
      resMsg = ;
    break;
    case '/ip':
      const ni = os.networkInterfaces();
      resMsg = JSON.stringify(ni);
    break;
  }
  bot.sendMessage(msg.chat.id, resMsg);
});

bot.on('polling_error', (err) => {
  bot.startPolling();
  console.error(err.code);
});
