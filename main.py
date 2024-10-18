import { useState, useEffect } from 'react'
import "./pageone.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'



export default function FinancialTrackerPreview() {
  const [transactions, setTransactions] = useState([])
  const [report, setReport] = useState('')
  const [prediction, setPrediction] = useState('')

  useEffect(() => {
    // Simulate fetching data
    const fetchData = () => {
      const newData = generateMockData(30)
      setTransactions(newData)
      generateReport(newData)
      generatePrediction(newData)
    }

    fetchData()
    const interval = setInterval(fetchData, 5000)
    return () => clearInterval(interval)
  }, [])

  const generateMockData = (days) => {
    const data = []
    const now = new Date()
    for (let i = days; i > 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      data.push({
        date: date.toISOString().split('T')[0],
        amount: Math.random() * 200 - 100 // Random amount between -100 and 100
      })
    }
    return data;
  };

  const generateReport = (data) => {
    const totalIncome = data.reduce((sum, t) => sum + (t.amount > 0 ? t.amount : 0), 0)
    const totalExpenses = data.reduce((sum, t) => sum + (t.amount < 0 ? -t.amount : 0), 0)
    const netProfit = totalIncome - totalExpenses
    setReport(`Total Income: $${totalIncome.toFixed(2)}
Total Expenses: $${totalExpenses.toFixed(2)}
Net Profit/Loss: $${netProfit.toFixed(2)}`)
  }

  const generatePrediction = (data) => {
    if(data.length === 0) return;
    const lastAmount = data[data.length - 1].amount
    const prediction = lastAmount * 1.1 // Simple prediction: 10% increase
    setPrediction(Predicted next day: ${prediction > 0 ? '+' : ''}$${prediction.toFixed(2)})
  };

  return (
    <div className="container">
    <div className="card">
      <h2>Financial Tracker Preview</h2>
      <p>Simulating real-time data updates every 5 seconds...</p>
    </div>

    <div className="card">
      <h2>Transaction History</h2>
      <div className="chart-container">
        {/* Replace this with your chart component or rendering logic */}
        <p>Chart goes here</p>
      </div>
    </div>

    <div className="card">
      <h2>Financial Report</h2>
      <pre>{report}</pre>
    </div>

    <div className="card">
      <h2>Future Prediction</h2>
      <p>{prediction}</p>
    </div>
  </div>


  )
}
