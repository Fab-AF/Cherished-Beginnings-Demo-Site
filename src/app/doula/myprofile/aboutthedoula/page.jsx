import React from "react";
import "./aboutthedoula.css";

const page = () => {
  return (
    <>
      <div className="aboutthedoulaformcontainer">
        <div>About the Doula</div>
        <div>
          <hr />
        </div>
        <div className="accformcontainer">
          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Total Experience :
            </label>
            <input className="accinputbox" type="text" />
          </div>
          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Location :
            </label>
            <input className="accinputbox" type="text" />
          </div>
          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Childrens Age Group :
            </label>
            <select>
              <option value="">1-5</option>
              <option value="">5-10</option>
              <option value="">10-15</option>
            </select>
          </div>{" "}
          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Availability :
            </label>
            <select>
              <option value="">Full time</option>
              <option value="">Part Time</option>
            </select>
          </div>
          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Hourly Rate In USD :
            </label>
            <input className="accinputbox" type="text" />
          </div>
          <div className="acccinputboxcont align-items-baseline">
            <label className="acclabel" htmlFor="">
              Group Size :
            </label>
            <div className="d-flex flex-column customcolumn">
              <input className="accinputbox " type="text" />
              <span className="customguideline">Max 4 children allowed</span>
            </div>
          </div>
          <div className="acccinputboxcont">
            <label className="acclabel" htmlFor="">
              Additional Info :
            </label>
            <select>
              <option value="">A</option>
              <option value="">B</option>
              <option value="">C</option>
            </select>
          </div>
          <div className="d-flex gap-3 justify-content-end accbtngrp">
            <button className="savesettingbtn">Save Setting</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
