import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SendMoney() {
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState("");
    const [feedback, setFeedback] = useState("");
    
    const navigate = useNavigate();

    const handleTransfer = (e) => {
        e.preventDefault(); // Stop page refresh!

        // Basic frontend validation before bothering the server
        if (amount <= 0) {
            setFeedback("❌ Amount must be greater than 0");
            return;
        }

        fetch("http://localhost:8080/sendMoney", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', // CRITICAL: Prove we are logged in!
            // Pack the exact labels our Java Map is looking for
            body: JSON.stringify({ uEmail: email, amount: amount })
        })
        .then(response => {
            if (response.ok) {
                return response.json().then(data => {
                    // Success! Show the message Java generated
                    setFeedback("✅ "+data.error);
                    
                    // Clear the form so they don't accidentally double-send
                    setEmail("");
                    setAmount("");
                    
                    // Teleport back to dashboard to see new balance after 2 seconds
                    setTimeout(() => navigate('/dashboard'), 2000);
                });
            } else {
                return response.json().then(data => {
                    setFeedback("❌ Transfer Failed: " + data.error);
                });
            }
        })
        .catch(error => {
            setFeedback("🚨 Cannot connect to the banking server");
        });
    };

    return (
        <div style={{ maxWidth: "450px", margin: "50px auto", padding: "30px", border: "2px solid #0056b3", borderRadius: "8px", fontFamily: "sans-serif" }}>
            <h2 style={{ color: "#0056b3", textAlign: "center", marginBottom: "5px" }}>Transfer Funds</h2>
            <p style={{ textAlign: "center", color: "#666", marginBottom: "25px" }}>Send money instantly to any registered user.</p>
            
            <form onSubmit={handleTransfer}>
                <div style={{ marginBottom: "15px" }}>
                    <label><strong>Receiver's Email:</strong></label>
                    <br />
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "10px", marginTop: "5px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #ccc" }}
                        placeholder="receiver@email.com"
                    />
                </div>
                
                <div style={{ marginBottom: "25px" }}>
                    <label><strong>Amount to Send (₹):</strong></label>
                    <br />
                    <input 
                        type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        required 
                        min="1"
                        style={{ width: "100%", padding: "10px", marginTop: "5px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #ccc" }}
                        placeholder="e.g. 500"
                    />
                </div>

                <button 
                    type="submit" 
                    style={{ width: "100%", padding: "12px", backgroundColor: "#0056b3", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", borderRadius: "4px", fontSize: "16px" }}
                >
                    Confirm Transfer
                </button>
            </form>

            <p style={{ marginTop: "20px", fontWeight: "bold", textAlign: "center", minHeight: "20px" }}>
                {feedback}
            </p>

            <div style={{ textAlign: "center", marginTop: "15px" }}>
                <button 
                    onClick={() => navigate('/dashboard')}
                    style={{ background: "none", border: "none", color: "#666", cursor: "pointer", textDecoration: "underline" }}
                >
                    Cancel and return to Dashboard
                </button>
            </div>
        </div>
    );
}