import React from "react";
import "./TrainingsForm.css";

class TrainingsForm extends React.Component {
  render() {
    return (
      <div class="row">
        <div class="col s12 m12">
          <div class="card-panel teal z-depth-5">
            <div className="row">
              <form className="col s12 white-text">
                <div className="row">
                  <div className="input-field col s12">
                    <textarea id="textarea1" className="materialize-textarea" />
                    <label className="white-text" for="textarea1">
                      Textarea
                    </label>
                  </div>
                </div>
              </form>
              <button
                class="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Submit
                <i class="material-icons right">send</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TrainingsForm;
