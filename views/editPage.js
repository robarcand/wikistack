const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (page, author) => layout(html`
  <h3>Edit a Page</h3>
  <hr>
  <form method="POST" action="/wiki/${page.slug}">
  
    <div class="form-group">
      <label for="name" class="col-sm-2 control-label">Author Name</label>
      <div class="col-sm-10">
        <input name="name" type="text" class="form-control" value="${author.name}"/>
      </div>
    
    
      <label for="email" class="col-sm-2 control-label">Author Email</label>
      <div class="col-sm-10">
        <input name="email" type="text" class="form-control" value="${author.email}" />
      </div>
    
    
      <label for="title" class="col-sm-2 control-label">Page Title</label>
      <div class="col-sm-10">
        <input name="title" type="text" class="form-control" value="${page.title}"/>
      </div>
    
    
      <label for="content" class="col-sm-2 control-label">Content</label>
      <div class="col-sm-10">
        <textarea name="content">${page.content}</textarea>
      </div>
    

    
      <label for="content" class="col-sm-2 control-label">Status</label>
      <div class="col-sm-10">
        <select name="status">
          <option ${page.status == "open" ? "selected" : ""}>open</option>
          <option ${page.status == "closed" ? "selected" : ""}>closed</option>
        </select>
      </div>
    

      <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-primary">submit</button>
      </div>
    </div>
  </form>
`);