function priceList(){
  let t = `<!Doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta property="og:title" content="Copysland"/>
    <meta property="og:description" content="Telegram x Digiflazz PPOB"/>
    <meta property="og:author" content="Hillzacky"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
  </head>
  <body class="container-fluid py-3">
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="pills-pre-tab" data-bs-toggle="pill" data-bs-target="#pills-pre" type="button" role="tab" aria-controls="pills-pre" aria-selected="true">Prepaid</button>
      </li>
      <li class="nav-item" role="presentation">
        <button class="nav-link" id="pills-pas-tab" data-bs-toggle="pill" data-bs-target="#pills-pas" type="button" role="tab" aria-controls="pills-pas" aria-selected="false">Pasca</button>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-pre" role="tabpanel" aria-labelledby="pills-pre-tab" tabindex="0">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="row">ProductName</th>
                <th scope="row">Category</th>
                <th scope="row">Brand</th>
                <th scope="row">Type</th>
                <td scope="row">SellerName</td>
                <th scope="row">Price</th>
                <td scope="row">BuyerSku</td>
                <td scope="row">BuyerStat</td>
                <td scope="row">SellerStat</td>
                <td scope="row">Unlimited</td>
                <td scope="row">Stock</td>
                <td scope="row">Multi</td>
                <td scope="row">Start</td>
                <td scope="row">End</td>
                <td scope="row">Desc</td>
              </tr>
            </thead>
            <tbody id="prep"></tbody>
          </table>
        </div>
      </div>
      <div class="tab-pane fade" id="pills-pas" role="tabpanel" aria-labelledby="pills-pas-tab" tabindex="0">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="row">ProductName</th>
                <th scope="row">Category</th>
                <th scope="row">Brand</th>
                <th scope="row">Seller</th>
                <th scope="row">Admin</th>
                <th scope="row">Komisi</th>
                <th scope="row">BuyerSku</th>
                <th scope="row">BuyerStat</th>
                <th scope="row">SellerStat</th>
                <th scope="row">Desc</th>
              </tr>
            </thead>
            <tbody id="pasc"></tbody>
          </table>
        </div>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" crossorigin="anonymous"></script>
    <script>
      if (document.readyState === 'complete') {
        setData();
      } else {
        document.addEventListener("DOMContentLoaded", setData);
      }
      async function setData(){
        const [pre,pas] = await Promise.all([ fetch('/prepaid'),fetch('/pasca') ]);
        setTable(pre,'prep')
        setTable(pas,'pasc')
      }
      async function setTable(r,id){
        let t='', c=await r.json();
        for(i=0;i<c.length;i++){
          t+='<tr>'
            for(const [k,v] of Object.entries(c[i])){
              t+='<td>'+v+'</td>'
            }
          t+='</tr>'
        };
        document.getElementById(id).innerHTML = t;
      }
    </script>
  </body>
</html>`;
  return t;
}
module.exports = { priceList }
