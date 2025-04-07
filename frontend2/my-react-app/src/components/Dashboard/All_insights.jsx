import { useNavigate } from 'react-router-dom'
import './All_insights.css'

function All_insights() {
  const navigate = useNavigate()
  
  const insights = [
    {
      id: 1,
      text: 'You spent 15% more on dining this month compared to last month.'
    },
    {
      id: 2,
      text: 'You could save $245 by reducing subscription services.'
    },
    {
      id: 3,
      text: 'Based on your goals, consider increasing retirement contributions by 2%.'
    }
  ]

  const handleViewAnalysis = () => {
    navigate('/insights')
  }

  return (
    <div className="insights-container">
      <h3>AI Insights</h3>
      <p className="subtitle">Personalized recommendations</p>
      <div className="insights-list">
        {insights.map(insight => (
          <div key={insight.id} className="insight-item">
            <div className="insight-icon">📊</div>
            <p>{insight.text}</p>
          </div>
        ))}
      </div>
      <button 
        className="view-analysis-btn"
        onClick={handleViewAnalysis}
      >
        View Detailed Analysis
      </button>
    </div>
  )
}

export default All_insights 