import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup.string().min(2, "Requires at least two characters"),
  size: yup
    .string()
    .required("Must select size"),
  pepperoni: yup.string(),
  sausage: yup.string(),
  ham: yup.string(),
  meatlovers: yup.string(),
  instructions: yup.string()

});



export default function Pizza() {


  // state for whether our button should be disabled or not.
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // managing state for our form inputs
  const [formState, setFormState] = useState({
          name: "",
          size: "",
          pepperoni: "",
          sausage: "",
          ham: "",
          meatlovers: "",
          instructions: ""

  });

  // state for our errors
  const [errors, setErrors] = useState({
    name: "",
    size: "",
    pepperoni: "",
    sausage: "",
    ham: "",
    meatlovers: "",
    instructions: ""
  });

  // new state to set our post request too. So we can console.log and see it.
  const [post, setPost] = useState([]);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(res => {
        setPost(res.data); // get just the form data from the REST api
        console.log("success", post);
        // reset form if successful
        setFormState({
          name: "",
          size: "",
          pepperoni: "",
          sausage: "",
          ham: "",
          meatlovers: "",
          instructions: ""
        });
      })
      .catch(err => console.log(err.response));
  };



  const validateChange = e => {
    // Reach will allow us to "reach" into the schema and test only one part.
    
    
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({
          ...errors,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = e => {
    e.persist();


    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };

    validateChange(e);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name:
        <input
          type="text"
          name="name"
          id="name"
          value={formState.name}
          onChange={inputChange}
        />
        {errors.name ? <p className='error'>{errors.name}</p> : null}
      </label>


     <label htmlFor='size'>
        Pizza Size:
        <select id='size' name='size' onChange={inputChange}>
        <option value='null'>Select One</option>
          <option value='Small'>Small</option>
          <option value='Medium'>Medium</option>
          <option value='Large'>Large</option>
          <option value='X-Large'>X-Large</option>
        </select>
        {errors.size.length > 0 ? (
          <p className="error">{errors.size}</p>
        ) : null}
      </label>
      <label>Toppings:</label>
      <label htmlFor='pepperoni' className='topping'>
        <input
          type='checkbox'
          name='pepperoni'
          checked={formState.pepperoni}
          onChange={inputChange}
        />
        Pepperoni
      </label>
      <label htmlFor='sausage' className='topping'>
        <input
          type='checkbox'
          name='sausage'
          checked={formState.sausage}
          onChange={inputChange}
        />
        Sausage
      </label>
      <label htmlFor='ham' className='topping'>
        <input
          type='checkbox'
          name='ham'
          checked={formState.ham}
          onChange={inputChange}
        />
        Ham
      </label>
      <label htmlFor='meatlovers' className='topping'>
        <input
          type='checkbox'
          name='meatlovers'
          checked={formState.meatlovers}
          onChange={inputChange}
        />
        Meat Lovers
      </label>
      <label htmlFor="instructions">
        Special Instructions:
        <textarea
        type="text"
          name="instructions"
          id="instructions"
          value={formState.instructions}
          onChange={inputChange}
        />
        {errors.instructions.length > 0 ? (
          <p className="error">{errors.instructions}</p>
        ) : null}
      </label>
      <pre>{JSON.stringify(post, null, 2)}</pre>
      <button disabled={buttonDisabled}>Add to Order</button>
    </form>
  );
}
