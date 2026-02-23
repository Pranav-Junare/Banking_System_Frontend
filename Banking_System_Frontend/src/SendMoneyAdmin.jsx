import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SendMoneyAdmin() {
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [feedback, setFeedback] = useState("");
    
    const navigate = useNavigate();

    const handleDeposit = (e) => {
        e.preventDefault(); // Stop the silent page refresh!

        if (amount <= 0) {
            setFeedback("❌ Amount must be greater than 0");
            return;
        }

        fetch("http://localhost:8080/addMoney", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', // Show the Admin VIP cookie!
            // Pack the exact labels your Java code expects
            body: JSON.stringify({ uEmail: email, amount: amount })
        })
        .then(response => {
            if (response.ok) {
                return response.json().then(data => {
                    // Success! Read the 'amount' and 'user' labels you mapped in Java
                    setFeedback("✅ Successfully deposited ₹" + data.amount + " to " + data.user + "'s account!");
                    
                    // Clear the form so you can quickly add money to the next user
                    setEmail("");
                    setAmount("");
                });
            } else {
                return response.json().then(data => {
                    // Failure: Read the 'error' label from your Java catch block
                    setFeedback("❌ Failed: " + data.error);
                });
            }
        })
        .catch(error => {
            setFeedback("🚨 Cannot connect to the banking server right now");
        });
    };

    return (
        <div style={{ maxWidth: "450px", margin: "50px auto", padding: "30px", border: "2px solid darkred", borderRadius: "8px", fontFamily: "sans-serif" }}>
            <h2 style={{ color: "darkred", textAlign: "center", marginBottom: "5px" }}>Admin Override: Deposit Funds</h2>
            <p style={{ textAlign: "center", color: "#666", marginBottom: "25px" }}>Inject money directly into a user's account.</p>
            
            <form onSubmit={handleDeposit}>
                <div style={{ marginBottom: "15px" }}>
                    <label><strong>Target User Email:</strong></label>
                    <br />
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "10px", marginTop: "5px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #ccc" }}
                        placeholder="user@email.com"
                    />
                </div>
                
                <div style={{ marginBottom: "25px" }}>
                    <label><strong>Amount to Inject (₹):</strong></label>
                    <br />
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        required 
                        min="1"
                        style={{ width: "100%", padding: "10px", marginTop: "5px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #ccc" }}
                        placeholder="e.g. 50000"
                    />
                </div>

                <button 
                    type="submit" 
                    style={{ width: "100%", padding: "12px", backgroundColor: "darkred", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", borderRadius: "4px", fontSize: "16px" }}
                >
                    Authorize Deposit
                </button>
            </form>

            {/* Display the success or error message here */}
            <p style={{ marginTop: "20px", fontWeight: "bold", textAlign: "center", minHeight: "20px" }}>
                {feedback}
            </p>

            <div style={{ textAlign: "center", marginTop: "15px" }}>
                <button 
                    onClick={() => navigate('/adminDashboard')}
                    style={{ background: "none", border: "none", color: "#666", cursor: "pointer", textDecoration: "underline" }}
                >
                    Return to Admin Dashboard
                </button>
            </div>
        </div>
    );
}