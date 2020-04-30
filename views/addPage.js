const html = require("html-template-tag");
const layout = require("./layout");

module.exports = () => layout(html`
  <h3>Add a Page</h3>
  <hr>
  <form action="/wiki/" method="POST">
    
    <div class="form-group">
    <label for="name" class="col-sm-2 control-label">Author's Name</label>
      <div class="col-sm-10">
        <input action="/wiki/" type="text" method="POST" class="form-control"/>
      </div>
    
      <label for="email" class="col-sm-2 control-label">Author's Email</label>
        <div class="col-sm-10">
          <input action="/wiki/" type="text" method="POST" class="form-control"/></div>
        </div>

      <label for="title" class="col-sm-2 control-label">Page Title</label>
        <div class="col-sm-10">
          <input id="title" name="title" type="text" class="form-control"/>
        </div>

      <label for="content" class="col-sm-2 control-label">Page Content Text Area</label>
        <div class="col-sm-10">
          <input action="/wiki/" type="text" method="POST" class="form-control"/>
        </div>

      <label for="status" class="col-sm-2 control-label">Page Status</label>
        <div class="col-sm-10">
          <input action="/wiki/" type="text" method="POST" class="form-control"/>
        </div>
    
    <div class="col-sm-offset-2 col-sm-10">
      <button type="submit" class="btn btn-primary">submit</button>
    </div>
  
  </form>
`);