// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// ----------------------------------------------------------------------------------

// import { useState } from "react";
// import ExpenseForm from "./components/ExpenseForm";
// import ExpenseList from "./components/ExpenseList";

// function App() {
//   const [expenses, setExpenses] = useState([]);

//   const addExpense = (expense) => {
//     setExpenses((prev) => [...prev, expense]);
//   };

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Expense Calculator</h1>
//       <ExpenseForm onAddExpense={addExpense} />
//       <ExpenseList expenses={expenses} />
//     </div>
//   );
// }

// export default App;

// -----------------------------------------------------------------------------------


// import ExpenseForm from "./components/expenses/expenseForm";
// import ExpenseList from "./components/expenses/expenseList";
// import HypotheticalCalculator from "./components/hypotheticalCalculator";
// import SpendingSummary from "./components/spendingSummary";
// import MonthlyComparison from "./components/monthlyComparison";

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
//         <h1 className="text-3xl font-bold mb-4 text-center">💰 Expense Calculator Dashboard</h1>
//         <p className="mb-6 text-center text-gray-600">
//           This tool helps you understand your monthly spending, compare across time periods, and calculate your future affordability.
//         </p>

//         <SpendingSummary />

//         <section className="my-10">
//           <h2 className="text-2xl font-semibold mb-2">Add New Expense</h2>
//           <ExpenseForm />
//         </section>

//         <section className="my-10">
//           <ExpenseList />
//         </section>

//         <section className="my-10">
//           <h2 className="text-2xl font-semibold mb-2">Hypothetical Expense Calculator</h2>
//           <HypotheticalCalculator />
//         </section>

//         <section className="my-10">
//           <h2 className="text-2xl font-semibold mb-2">Monthly Comparison</h2>
//           <MonthlyComparison />
//         </section>

//         <p className="mt-10 text-center text-sm text-gray-500">
//           Log in or create an account to save your data securely and track spending across devices.
//         </p>
//       </div>
//     </div>
//   );
// }

// export default App;

// --------------------------------------------------------------------------------------------------

import { useState } from "react";
import ExpenseForm from "./components/expenses/expenseForm";
import ExpenseList from "./components/expenses/expenseList";
import HypotheticalCalculator from "./components/hypotheticalCalculator";
import SpendingSummary from "./components/spendingSummary";
import MonthlyComparison from "./components/monthlyComparison";

function App() {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">💰 Expense Calculator Dashboard</h1>
        <p className="mb-6 text-center text-gray-600">
          This tool helps you understand your monthly spending, compare across time periods, and calculate your future affordability.
        </p>

        <SpendingSummary />

        <section className="my-10">
          <h2 className="text-2xl font-semibold mb-2">Add New Expense</h2>
          <ExpenseForm onAddExpense={addExpense} />
        </section>

        <section className="my-10">
          <ExpenseList expenses={expenses} />
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-semibold mb-2">Hypothetical Expense Calculator</h2>
          <HypotheticalCalculator />
        </section>

        <section className="my-10">
          <h2 className="text-2xl font-semibold mb-2">Monthly Comparison</h2>
          <MonthlyComparison />
        </section>

        <p className="mt-10 text-center text-sm text-gray-500">
          Log in or create an account to save your data securely and track spending across devices.
        </p>
      </div>
    </div>
  );
}

export default App;



