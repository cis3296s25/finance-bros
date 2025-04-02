// function ExpenseList({ expenses }) {
//     const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  
//     return (
//       <div>
//         <h2 className="text-xl font-semibold mb-2">Expenses</h2>
//         <ul className="mb-2">
//           {expenses.map((expense) => (
//             <li key={expense.id}>
//               {expense.name}: ${expense.amount.toFixed(2)}
//             </li>
//           ))}
//         </ul>
//         <p className="font-bold">Total: ${total.toFixed(2)}</p>
//       </div>
//     );
//   }
  
//   export default ExpenseList;
  
// ------------------------------------------------------------------

const dummyExpenses = [
  { id: 1, name: "Groceries", amount: 220.50 },
  { id: 2, name: "Rent", amount: 500.00 },
  { id: 3, name: "Gym", amount: 42.90 },
  { id: 4, name: "Spotify", amount: 9.99 },
];

function ExpenseList() {
  const total = dummyExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Your Expenses</h2>
      <ul className="space-y-2">
        {dummyExpenses.map((e) => (
          <li key={e.id} className="flex justify-between bg-gray-100 p-3 rounded">
            <span>{e.name}</span>
            <span>${e.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 font-bold text-right">
        Total: ${total.toFixed(2)}
      </div>
    </div>
  );
}

export default ExpenseList;
