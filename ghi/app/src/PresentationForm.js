function PresentationForm() {





    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new presentation</h1>
            <form  id="create-presentation-form">

              <div className="form-floating mb-3">
                <input  placeholder="presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control"/>
                <label htmlFor="name">Name</label>
              </div>

              <div className="form-floating mb-3">
                <input  placeholder="company name" required type="text" name="company_name" id="company_name" className="form-control"/>
                <label htmlFor="starts">Company Name</label>
              </div>

              <div className="form-floating mb-3">
                <input  placeholder="presenter_email" required type="email" name="presenter_email" id="presenter_email" className="form-control"/>
                <label htmlFor="ends">Presenter Email</label>
              </div>

              <div className="form-floating mb-3">
                <input  placeholder="title" required type="text" name="title" id="title" className="form-control"/>
                <label htmlFor="title">Title</label>
              </div>

              <div className="mb-3">
                <label htmlFor="synopsis" className="form-label">Synopsis</label>
                <textarea required name="synopsis" id="synopsis" rows="5" cols="33" className="form-control"></textarea>
              </div>

              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
}

export default PresentationForm;
