import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './SavingsGoalsPage.css'; // create this file for consistent styling

function SavingsGoalsPage() {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const fetchGoals = async () => {
    try {
      const res = await api.get('/goals', { headers });
      setGoals(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load goals');
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/goals', {
        goalName,
        targetAmount: parseFloat(targetAmount),
        startDate,
        targetDate
      }, { headers });

      await fetchGoals();
      setGoalName('');
      setTargetAmount('');
      setStartDate('');
      setTargetDate('');
    } catch (err) {
      console.error('Add goal failed:', err);
      setError('Failed to add savings goal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="goal-container">
      <div className="goal-form-card">
        <h2>Add Savings Goal</h2>
        <form onSubmit={handleAddGoal}>
          <input
            placeholder="Goal Name"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            required
          />
          <input
            type="number"
            step="0.01"
            placeholder="Target Amount"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Goal'}
          </button>
        </form>
        {error && <p className="error-msg">{error}</p>}
      </div>

      <div className="goal-list">
        <h3>Your Goals</h3>
        {goals.map((g, idx) => (
          <div key={idx} className="goal-card">
            <h4>{g.goalName}</h4>
            <p>Saved: ₹{Math.max(0, g.currentProgress)} / ₹{g.targetAmount}</p>
            <p>Remaining: ₹{g.remainingAmount}</p>
            <p>Progress: {g.progressPercentage}%</p>
            <progress
              max={g.targetAmount}
              value={Math.max(0, g.currentProgress)}
              className="progress-bar"
            />
            <p>From: {g.startDate || '—'} → {g.targetDate || '—'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavingsGoalsPage;
