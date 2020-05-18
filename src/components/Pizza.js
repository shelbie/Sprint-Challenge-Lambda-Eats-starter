import React, { useState 
} from "react"
import * as yup from "yup";


const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field."),
    type: yup
      .string()
      .required(""),
      toppings: yup.string().required("Required"),
      instructions: yup.string(),
    order: yup.boolean().oneOf([true], ""),
    
  });
  


export default function Pizza() {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    // managing state for our form inputs
    const [formState, setFormState] = useState({
      name: "",
      type: "",
      toppings: "",
      instructions: "",
      order: ""
  
    });
  
    // state for our errors
    const [errors, setErrors] = useState({
        name: "",
        type: "",
        toppings: "",
        instructions: "",
        order: ""
    });




return (
    <div>
   <div>

   </div>
    </div>
)
}