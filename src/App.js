import {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js';
import { Formik, useFormik } from 'formik';
import React from 'react';

function App() {
  const [expense, setExpense] = useState([])
  const [income, setIncome] = useState()
  const [remaining, setRemaining] = useState()
  const [showInputFields, setshowInputFields] = useState(0)
  const [whichCheckBoxSelected, setwhichCheckBoxSelected] = useState("")
  const [isIncomeChecked, setisIncomeChecked] = useState(false)
  const [isExpenseChecked, setisExpenseChecked] = useState(false)

const expenses = [
  {name: "abc", amount: 22},
  {name: "abc", amount: 22},
]

useEffect(() => {
  // console.log(remaining, "remaining")
},[remaining])

  const remainingFn = (exp) => {
    // console.log(exp, "e")
    setRemaining(remaining - exp)
  }
  const validate = values => {
    const errors = {};
    if (!values.Name) {
      errors.Name = 'Required';
    } else if (values.Name.length > 15) {
      errors.Name = 'Must be 15 characters or less';
    }
  // console.log(values, "values")
    if (!values.Amount) {
      errors.Amount = 'Required';
    } else if (values.Amount.length > 20) {
      errors.Amount = 'Must be 20 characters or less';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      Name: '',
      Amount: '',
      amtType: '',
    },
    validate,
    onSubmit: values => {
      if(isIncomeChecked){
          values.amtType = "income"
          setRemaining(values.Amount)
      } else if(isExpenseChecked){
        values.amtType = "exp"
      }
      setExpense([...expense, values ]);
      if(values.amtType === "exp"){
        remainingFn(values.Amount)
      }
    },
  });

  const incomeHandleChange = (e) => {
    setIncome(e.target.value)
    setRemaining(e.target.value)
  }

  const dropdownHandler = (e) => {
    e.stopPropagation();
    // console.log(e.target.text)
    if(e.target.text === "Income"){
      setshowInputFields(1)
    } else if(e.target.text === "Expense") {
      setshowInputFields(2)
    }
  }


  const amountTypeHandler = (e) => {
    let val = e.target.value
    switch(val){
      case "income": 
      setwhichCheckBoxSelected(val)
      setisIncomeChecked(true)
      setshowInputFields(1)
      setisExpenseChecked(false)
      break;
      case "expense":
        setwhichCheckBoxSelected(val)
        setisIncomeChecked(false)
        setisExpenseChecked(true);
        setshowInputFields(2)
        break;
    }
  }
  return (
    <div className="root-box">            
      <h1>Expense Tracker</h1>
    <div className="main-container">
    <div className="box">
  
    <div className="form-check">
  <input className="form-check-input" type="checkbox" value="income"   onChange={amountTypeHandler} id="flexCheckDefault" checked={isIncomeChecked}/>
  <label className="form-check-label" htmlFor="flexCheckDefault">
  Income
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="checkbox" value="expense" id="flexCheckChecked" onChange={amountTypeHandler} checked={isExpenseChecked} />
  <label className="form-check-label" htmlFor="flexCheckChecked">
  Expense
  </label>
</div>
      
    <form onSubmit={formik.handleSubmit}>

      <div className="divide-two-fields">
       <label htmlFor="expenseName">Amount Name</label>
       <input
         id="Name"
         name="Name"
         className="input-field"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.Name}
       />
       {formik.errors.Name ? <div className="error-msg">{formik.errors.Name}</div> : null}
       </div>

       {
  showInputFields === 1 &&(
<div className="divide-two-fields">
       <label htmlFor="Amount">Income Amount</label>
       <input
         id="Amount"
         name="Amount"
         className="input-field"
         type="number"
         onChange={formik.handleChange}
         value={formik.values.Amount}
       />
       </div>
  )
}


       {
  showInputFields === 2 &&(
       <div className="divide-two-fields">
       <label htmlFor="Amount">Expense Amount</label>
       <input
         id="Amount"
         className="input-field"
         name="Amount"
         type="number"
         onChange={formik.handleChange}
         value={formik.values.Amount}
       />
       </div>
  )}
  
       {formik.errors.Amount && showInputFields === 2 ? <div className="error-msg">{formik.errors.Amount}</div> : null}
       
      <div className="submit-box">
       <button className="button-7" type="submit">Submit</button>
       </div>
     </form>
    </div>

    {/* listing of expenses */}

    <div className="listing-container">
   <div>ID</div>
   <div>Expense Name</div>
   <div>Amount</div>
   </div>

   {
    expense?.map((exp, index) => {
      return(
        <div className="listing-container-rows" key={index}>
        <div>{index+1}</div>
        <div>{exp.Name}</div>
        <div>{exp.Amount}</div>
        </div>
      )
    })
   }
   <div className="listing-container-rem">
       <div>Remaining Income Left {remaining<0?<span className="over-paid">OVER PAID</span>: ""}</div>
       <div>{remaining}</div>
       </div>
    </div>
</div>
  );
}

export default App;
