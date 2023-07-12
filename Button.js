import React, { useState } from 'react';

const Todo = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [remark, setRemark] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [accountBalance, setAccountBalance] = useState(0);

  const add = () => {
    if (amount !== "" && type !== "" && remark !== "") {
      if (type === 'expense' && parseFloat(amount) > accountBalance) {
        alert('Invalid Transaction');
        return;
        
      }

      setTransactions([...transactions, { amount, type, remark }]);
      if (type === 'income') {
        setAccountBalance(prevBalance => prevBalance + parseFloat(amount));
      } else if (type === 'expense') {
        setAccountBalance(prevBalance => prevBalance - parseFloat(amount));
      }

      setType("");
      setAmount("");
      setRemark("");
    }
  };

  const handleDeleteBtn = (ind) => {
    const updatedTransactions = [...transactions];
    updatedTransactions.splice(ind, 1);
    setTransactions(updatedTransactions);
  };

  const getSummary = () => {
    const summary = {
      expense: 0,
      income: 0
    };

    transactions.forEach((el) => {
      const { amount } = el;

      if (el.type === 'income') {
        summary.income += parseInt(amount);
      } else {
        summary.expense += parseInt(amount);
      }
    });

    return summary;
  };

  return (
    <>
      <input
        type='number'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">Choose type</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type='text'
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
      />
      <button onClick={add} disabled={amount === "" || type === "" || remark === ""}>Save</button>

      <table width="100%" border={1}>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Type</th>
            <th>Remark</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, ind) => {
            return (
              <tr key={ind} style={{ border: '1px solid black' }}>
                <td>{txn.amount}</td>
                <td>{txn.type}</td>
                <td>{txn.remark}</td>
                <td>
                  <button onClick={() => handleDeleteBtn(ind)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Total Income: {getSummary().income}</p>
      <p>Total Expense: {getSummary().expense}</p>
      <p>Balance: {getSummary().income - getSummary().expense}</p>
    </>
  );
};

export default Todo;
