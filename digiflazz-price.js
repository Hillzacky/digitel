async function pricelist(df) {
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
                <th scope="row">${}</th>
                <td>${}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">${}</th>
                <td>${}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="tab-pane fade" id="pills-pas" role="tabpanel" aria-labelledby="pills-pas-tab" tabindex="0">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="row">${}</th>
                <td>${}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">${}</th>
                <td>${}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" crossorigin="anonymous"></script>
  </body>
</html>`;
  return t;
}
