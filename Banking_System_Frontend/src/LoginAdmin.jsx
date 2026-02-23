import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [feedback, setFeedback] = useState(""); // One variable for all messages
    
    const navigate = useNavigate();

    const handleLoginAdmin = (e) => {
        e.preventDefault(); // Stop the silent page refresh!

        fetch("http://localhost:8080/loginAdmin", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            // MUST perfectly match credentials.get("email") in Java
            body: JSON.stringify({ email: email, password: password }) 
        })
        .then(response => {
            if (response.ok) {
                return response.json().then(data => {
                    // Success! Read the 'adminName' label Java sent back
                    setFeedback("✅ Welcome, " + data.adminName + "! Redirecting...");
                    
                    // Teleport to the Admin Dashboard
                    setTimeout(() => navigate("/adminDashboard"), 1500);
                });
            } else {
                return response.json().then(data => {
                    // Failure: Read the 'error' label Java sent
                    setFeedback("❌ Login Failed: " + data.error); 
                });
            }
        })
        .catch(error => {
            setFeedback("🚨 Cannot connect to the banking server"); 
        });
    };

    return (
        <div style={{ maxWidth: "350px", margin: "50px auto", padding: "30px", border: "2px solid darkred", borderRadius: "8px", fontFamily: "sans-serif" }}>
            <h2 style={{ color: "darkred", textAlign: "center", marginBottom: "5px" }}>Admin Access</h2>
            <p style={{ textAlign: "center", color: "#666", marginBottom: "25px", fontSize: "14px" }}>Authorized Personnel Only</p>
            
            <form onSubmit={handleLoginAdmin}>
                <div style={{ marginBottom: "15px" }}>
                    <label><strong>Admin Email:</strong></label>
                    <br />
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "10px", marginTop: "5px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #ccc" }}
                        placeholder="admin@bank.com"
                    />
                </div>
                
                <div style={{ marginBottom: "25px" }}>
                    <label><strong>Password:</strong></label>
                    <br />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        style={{ width: "100%", padding: "10px", marginTop: "5px", boxSizing: "border-box", borderRadius: "4px", border: "1px solid #ccc" }}
                        placeholder="••••••••"
                    />
                </div>

                <button 
                    type="submit" 
                    style={{ width: "100%", padding: "12px", backgroundColor: "darkred", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", borderRadius: "4px", fontSize: "16px" }}
                >
                    Secure Login
                </button>
            </form>

            <p style={{ marginTop: "20px", fontWeight: "bold", textAlign: "center", minHeight: "20px" }}>
                {feedback}
            </p>

            <div style={{ textAlign: "center", marginTop: "15px", fontSize: "14px" }}>
                Need an admin account? <span style={{ color: "darkred", cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate('/signupAdmin')}>Register here</span>
            </div>
        </div>
    );
}