const ipParse =(obj)=>{
  let str = '';
  for (const [k, v] of Object.entries(obj)) {
    str+=`*${k}*\n`;
    for (i=0;i<v.length;i++){
      str+='-----------------------\n';
      for (const [x,y] of Object.entries(v[i])){
        str+=`${x}: ${y}\n`;
      }
    }
    str+='\n\n';
  }
  return str;
}
const objParse =(obj)=>{
  let str = '', key = '';
  for (const [k, v] of Object.entries(obj)) {
    key = k.replace("_"," ");
    str+=`${key}: ${v}\n`;
  }
  return str;
}
const objParses =(obj)=>{
  let str = '', key = '';
  for (i=0;i<obj.length;i++) {
    for (const [k, v] of Object.entries(obj[i])) {
      key = k.replace("_"," ");
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
  toRp, waktu, objParse, objParses
}
