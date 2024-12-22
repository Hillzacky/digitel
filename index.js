const TelegramBot = require('node-telegram-bot-api');
const Digiflazz = require('digiflazz');
const digiflazz = new Digiflazz(process.env.USR, process.env.API);
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/deposit (.+)/, (msg, match) => {
  let deposit = await digiflazz.deposit(0,'BANK','AN');
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, deposit);
});

bot.onText(/\/trx (.+)/, (msg, match) => {
  let prabyr = await digiflazz.transaksi('sku', 'tujuan', 'ref_id');
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, prabyr);
});

bot.onText(/\/cek (.+)/, (msg, match) => {
  let cekPasca = await digiflazz.transaksi('sku', 'tujuan', 'ref_id', 'CEK');
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, cekPasca);
});

bot.onText(/\/bayar (.+)/, (msg, match) => {
  let byrPasca = await digiflazz.transaksi('sku', 'tujuan', 'ref_id', 'BAYAR');
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, byrPasca);
});

bot.onText(/\/status (.+)/, (msg, match) => {
  let statusPasca = await digiflazz.transaksi('sku', 'tujuan', 'ref_id', 'STATUS');
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, statusPasca);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  if (messageText === '/menu') {
    bot.sendMessage(chatId, 'Welcome to the ppob!');
  }
  if (messageText === '/ceksaldo') {
    let saldo = await digiflazz.cekSaldo();
    bot.sendMessage(chatId, 'Saldo: '+saldo);
  }
  if (messageText === '/harga') {
    let harga = await digiflazz.daftarHarga();
    bot.sendMessage(chatId, harga);
  }
});
