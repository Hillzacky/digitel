const lastChatId =async(record=0)=>{
  const t = process.env.TOKEN;
  const u = `https://api.telegram.org/bot${t}/getUpdates`
  const f = await fetch(u)
  const r = await f.json()
  return r.result[0].message.chat.id
}
const ipParse =(obj)=>{
  let str = '';
  for (const [k, v] of Object.entries(obj)) {
    str+=`Slot Card <${k}>\n`;
    for (i=0;i<v.length;i++){
      str+='\n\n';
      for (const [x,y] of Object.entries(v[i])){
        str+=`${x}: ${y}\n`;
      }
    }
    str+='\n\n';
  }
  return str;
}
const objParse =(obj)=>{
  let str = '', key = '', key2 = '', key3 = '';
  for (const [k, v] of Object.entries(obj)) {
    key = k.replaceAll("_"," ");
    if((typeof v == 'object')||(k == 'desc')){
      for (const [k2, v2] of Object.entries(v)){
        key2 = k2.replaceAll("_"," ");
        if ((typeof v2 == 'object')||(k2 == 'detail')){
          for (l=0;l<v2.length;l++){
            for (const [k3, v3] of Object.entries(v2[l])){
              key3 = k3.replaceAll("_"," ");
              str+=`${key3}: ${v3}\n`;
            }
            str+=`\n`;
          }
        } else {
          str+=`${key2}: ${v2}\n`;
        }
      }
      str+=`\n`;
    } else {
      str+=`${key}: ${v}\n`;
    }
  }
  return str;
}
const objParses =(obj)=>{
  let str = '', key = '';
  for (i=0;i<obj.length;i++) {
    for (const [k, v] of Object.entries(obj[i])) {
      key = k.replaceAll("_"," ");
      str+=`${key}: ${v}\n`;
    }
    str+='-----------------------\n';
  }
  return str;
}
const toRp = (num)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(num);
}
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
module.exports = {
  toRp, waktu, objParse, objParses, ipParse
}
