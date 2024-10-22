import { useState, useEffect } from 'react'
import "./App.css"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function FinancialTrackerLLM() {
  const [transactions, setTransactions] = useState([])
  const [report, setReport] = useState('')
  const [prediction, setPrediction] = useState('')
  const [insight, setInsight] = useState('')

  useEffect(() => {
    const fetchData = () => {
      const newData = generateMockData(30)
      setTransactions(newData)
      generateReport(newData)
      generatePrediction(newData)
      generateInsight(newData)  // Generate insight using LLM
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
    setPrediction(`Predicted next day: ${prediction > 0 ? '+' : ''}$${prediction.toFixed(2)}`)
  };

  // Function to send transaction data to the LLM API to generate insights
  const generateInsight = async (data) => {
    const insightsPrompt = generateInsightPrompt(data)

    // Simulating the API call to an LLM (e.g., GPT)
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer sk-svcacct-MtADhxCOjkp0MT8_LbY3FASyWLO_eGO1fIcxlYyt0xZLj01V8jck1ivTga-xeT3BlbkFJFtlPx_wwNJklWr_nhGjfRNr_5-MrQjajo3z8DJu9iTmFlDp6-TATdXH-oWRtgA`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        prompt: insightsPrompt,
        max_tokens: 150
      })
    })
    const result = await response.json()
    const insightText = result.choices[0].text.trim()

    setInsight(insightText)
  }

  // Function to create a prompt for LLM to generate insights
  const generateInsightPrompt = (data) => {
    return `Here is a list of recent financial transactions: ${JSON.stringify(data)}. 
    Based on this data, what trends or patterns do you observe? Provide some financial insights.`
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Financial Tracker</h2>
       
      </div>

      <div className="card">
        <h2>Transaction History</h2>
        <div className="chart-container">
          {/* Add your chart visualization */}
          <p>Chart goes here</p>
        </div>
      </div>

      <div className="card">
        <h2>Financial Report</h2>
        <pre>{report}</pre>
      </div>

      <div className="card">
        <h2> Prediction</h2>
        <p>{prediction}</p>
      </div>

    </div>
  )
}
