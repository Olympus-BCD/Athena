import React from "react";
import "./TrainingsForm.css";

class TrainingsForm extends React.Component {
  render() {
    return (
      <div class="row">
        <div class="col s12 m12">
          <div class="card purple">
            <div className="row">
              
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
