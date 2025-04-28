import React from 'react';

function FinancialOverview() {
  const stats = [
    {
      title: 'Total Balance',
      amount: '$14,589.90',
      change: '+4.3%',
      isPositive: true,
    },
    {
      title: 'Monthly Income',
      amount: '$5,491.67',
      change: '+2.1%',
      isPositive: true,
    },
    {
      title: 'Monthly Expenses',
      amount: '$4,300.00',
      change: '-1.8%',
      isPositive: false,
    },
    {
      title: 'Monthly Savings',
      amount: '$1,191.67',
      change: '+7.2%',
      isPositive: true,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-gray-600 text-sm font-normal">{stat.title}</h3>
          <div className="text-2xl font-bold my-2">{stat.amount}</div>
          <div
            className={`text-sm ${
              stat.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {stat.change} from last month
          </div>
        </div>
      ))}
    </div>
  );
}

export default FinancialOverview;