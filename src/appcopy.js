import {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, useFormik } from 'formik';
import React from 'react';

function App() {
  const [expense, setExpense] = useState([])
  const [income, setIncome] = useState()
  const [remaining, setRemaining] = useState()

const expenses = [
  {name: "abc", amount: 22},
  {name: "abc", amount: 22},
]

// useEffect(() => {
//   console.log(income, "inco")
// },[income])

  const remainingFn = (exp) => {
    // console.log(exp, income)
    setRemaining(remaining - exp)
  }
  const validate = values => {
    const errors = {};
    if (!values.expenseName) {
      errors.expenseName = 'Required';
    } else if (values.expenseName.length > 15) {
      errors.expenseName = 'Must be 15 characters or less';
    }
  // console.log(values, "values")
    if (!values.expenseAmount) {
      errors.expenseAmount = 'Required';
    } else if (values.expenseAmount.length > 20) {
      errors.expenseAmount = 'Must be 20 characters or less';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      expenseName: '',
      expenseAmount: '',
    },
    validate,
    onSubmit: values => {
      setExpense([...expense, values ]);
      remainingFn(values.expenseAmount)
    },
  });

  const incomeHandleChange = (e) => {
    setIncome(e.target.value)
    setRemaining(e.target.value)
  }


  return (
    <div className="root-box">            
      <h1>Expense Tracker</h1>
    <div className="main-container">
    <div className="box">
    <div className="dropdown">
  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Select Amount Type
  </button>
  <ul className="dropdown-menu">
    <li><a className="dropdown-item" href="#">Income</a></li>
    <li><a className="dropdown-item" href="#">Expense</a></li>
  </ul>
</div>
      <div className="divide-two-fields">
       <label htmlFor="income">Income</label>
       <input
         id="income"
         name="income"
         className="input-field"
         type="number"
         onChange={incomeHandleChange}
         value={income}
       />
       </div>
    <form onSubmit={formik.handleSubmit}>
      <div className="divide-two-fields">
       <label htmlFor="expenseName">Expense Name</label>
       <input
         id="expenseName"
         name="expenseName"
         className="input-field"
         type="text"
         onChange={formik.handleChange}
         value={formik.values.expenseName}
       />
       {formik.errors.expenseName ? <div className="error-msg">{formik.errors.expenseName}</div> : null}
       </div>
       <div className="divide-two-fields">
       <label htmlFor="expenseAmount">Expense Amount</label>
       <input
         id="expenseAmount"
         className="input-field"
         name="expenseAmount"
         type="number"
         onChange={formik.handleChange}
         value={formik.values.expenseAmount}
       />
       </div>
       {formik.errors.expenseAmount ? <div className="error-msg">{formik.errors.expenseAmount}</div> : null}
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
        <div>{exp.expenseName}</div>
        <div>{exp.expenseAmount}</div>
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
