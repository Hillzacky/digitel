async function priceList (df) {
  const p1 = df.daftarHarga('prepaid');
  const p2 = df.daftarHarga('pas');
  const [pre,pas] = await Promise.all([p1,p2])
  let t = `<!Doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
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
                <td scope="row">Category</td>
                <td scope="row">Brand</td>
                <td scope="row">Type</td>
                <td scope="row">SellerName</td>
                <td scope="row">Price</td>
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
            <tbody>`;
              for(i=0;i<pre.length;i++){
              t+=`<tr>`
                for(const [k,v] of Object.entries(pre[i])){
                  t+=`<td>${v}</td>`
                }
              t+=`</tr>`
              }
            t+=`</tbody>
          </table>
        </div>
      </div>
      <div class="tab-pane fade" id="pills-pas" role="tabpanel" aria-labelledby="pills-pas-tab" tabindex="0">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="row">ProductName</th>
                <td scope="row">Category</td>
                <td scope="row">Brand</td>
                <td scope="row">Seller</td>
                <td scope="row">Admin</td>
                <td scope="row">Komisi</td>
                <td scope="row">BuyerSku</td>
                <td scope="row">BuyerStat</td>
                <td scope="row">SellerStat</td>
                <td scope="row">Desc</td>
              </tr>
            </thead>
            <tbody>`;
              for(i=0;i<pas.length;i++){
              t+=`<tr>`
                for(const [k,v] of Object.entries(pas[i])){
                  t+=`<td>${v}</td>`
                }
              t+=`</tr>`
              }
            t+=`</tbody>
          </table>
        </div>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" crossorigin="anonymous"></script>
  </body>
</html>`;
  return t;
}
module.exports = { priceList }
