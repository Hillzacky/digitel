const TelegramBot = require('node-telegram-bot-api');
const Digiflazz = require('digiflazz');
const digiflazz = new Digiflazz(process.env.USR, process.env.API);
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

const waktu =()=> {
  const date = new Date();
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ];
  const [hour, minutes, seconds] = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
  return day+month+year+hour+minutes+seconds
}

bot.onText(/\/deposit (.*?)\s+(.*?)\s+(.*?)/, (msg, match) => {
  // nominal, bank, a/n
  let deposit = await digiflazz.deposit(match[1],match[2],match[3]);
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, deposit);
});

bot.onText(/\/trx (.+)\s+(.+)\s+(.+)/, (msg, match) => {
  // sku, tujuan, ref_id
  const ref = (match[3]) ? match[3] : 'R#' + waktu();
  let prabyr = await digiflazz.transaksi(match[1],match[2],ref);
  const chatId = msg.chat.id;
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
