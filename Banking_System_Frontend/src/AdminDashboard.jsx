import { useState, useEffect } from "react"; // <-- Make sure useEffect is imported!
import { useNavigate } from "react-router-dom";

export default function AdminDashboard(){
    const [aName, setAName] = useState("");
    const [error, setError] = useState("");
    
    const navigate = useNavigate();

    // Changed to useEffect so it fetches the admin's name automatically!
    useEffect(() => {
        // Fixed https -> http
        fetch("http://localhost:8080/adminDashboard", {
            method: "GET",
            headers: {"Content-Type": "application/json"},
            credentials: 'include' // Fixed the missing quotes!
        })
        .then(response => {
            if(response.ok){
                return response.json().then(data => {
                    setAName(data.aName);
                });
            }
            else{
                return response.json().then(data => {
                    setError(data.error);
                });
            }
        })
        .catch(error => {
            setError("Cannot connect to server right now");
        });
    }, []); // Empty brackets so it only runs once!

    // The HTML UI
    return (
        <div style={{ maxWidth: "500px", margin: "50px auto", padding: "30px", border: "2px solid darkred", borderRadius: "10px", fontFamily: "sans-serif", textAlign: "center" }}>
            
            {/* If there is a session error, show the red Access Denied screen */}
            {error ? (
                <div>
                    <h2 style={{ color: "red" }}>🚨 Access Denied</h2>
                    <p><strong>{error}</strong></p>
                    <p>Please return to the admin login portal.</p>
                    <button 
                        onClick={() => navigate('/loginAdmin')}
                        style={{ marginTop: "15px", padding: "10px 20px", backgroundColor: "darkred", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                    >
                        Go to Admin Login
                    </button>
                </div>
            ) : (
                /* If successful, show the Admin Dashboard! */
                <div>
                    <h2 style={{ color: "darkred", marginBottom: "5px" }}>System Administrator Portal</h2>
                    <h1 style={{ marginTop: "0" }}>Welcome, {aName}!</h1>
                    
                    <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", marginTop: "20px", marginBottom: "25px", borderLeft: "5px solid darkred" }}>
                        <p style={{ fontSize: "16px", margin: "0", color: "#666", fontWeight: "bold" }}>Admin Privileges Active</p>
                        <p style={{ fontSize: "14px", marginTop: "10px" }}>You have full system access to manage user accounts and authorize fund injections.</p>
                    </div>

                    {/* Links to the Admin Add Money page we built! */}
                    <button 
                        onClick={() => navigate('/addMoney')} 
                        style={{ width: "100%", padding: "12px", backgroundColor: "darkred", color: "white", fontWeight: "bold", border: "none", cursor: "pointer", borderRadius: "4px", fontSize: "16px", marginBottom: "15px" }}
                    >
                        💰 Inject User Funds
                    </button>
                    
                </div>
            )}
            
        </div>
    );
}