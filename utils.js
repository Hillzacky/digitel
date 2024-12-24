const objParse =(obj)=>{
  let str = '';
  for (const [k, v] of Object.entries(obj[i])) {
    key = k.replace("_"," ");
    str+=`${key}: ${v}\n`;
  }
  return str;
}
const objParses =(obj)=>{
  let str = '';
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
  toRp, waktu
}
