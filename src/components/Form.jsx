import React, { useState } from "react";
import { ALPHANUMERIC_REGEX, EMAIL_REGEX } from "../constants/constants";

function Form() {
    const [data, setData] = useState({
      email: "",
      message: ""
    });

    const [error, setError] = useState({
      email: "",
      message: ""
    });

    const handleOnChange = (name, value, regex) => {
      setError({...error, [name]: !regex.test(value)? "Incorrect format!" : ""});
      setData({...data, [name]:value});
      console.log(error);
      console.log(data);
      console.log(regex.test(value));
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Data submitted:", data);
    };
  
    return (
      <>
        <h2>Contact Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
	    <div className="col">
	    	<label htmlFor="name">Nombre <span className="text-danger">*</span></label>
	    	<br />
	    	<input id="name" name="name" type="text" className="form-control bg-white" value={data.name} maxLength="747"/>
	    </div>
            <div className="col">
              	<label htmlFor="email">Email <span className="text-danger">*</span></label>
              	<br />
              	<input id="email" name="email" type="email" className="form-control bg-white" value={data.email} maxLength={320}
                onChange={(e) => handleOnChange(e.target.name, e.target.value, EMAIL_REGEX)} required/>
              { error.email && 
                <span className="text-danger pb-2">{error.email}</span>
              }
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col">
              <button type="submit" className="bg-success text-dark rounded w-100">Someter</button>
            </div>
          </div>
        </form>
      </>
    );
}

export default Form;
