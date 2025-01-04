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
    key = k.replaceAll("_"," ");
    if((typeof v == 'object')||(k == 'desc')){
      for (const [k2, v2] of Object.entries(v)){
        if (k2 == 'detail'){
          if ((typeof v2 == 'object')||Array.isArray(v2)){
            for (l=0;l<v2.length;l++){
              for (const [k3, v3] of Object.entries(v2[l])){
                str+=`${k3}: ${v3}\n`;
              }
              str+=`\n`;
            }
          } else {
            for (const [k3, v3] of Object.entries(v2)){
              str+=`${k3}: ${v3}\n`;
            }
          }
        } else {
          str+=`${k2}: ${v2}\n`;
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
