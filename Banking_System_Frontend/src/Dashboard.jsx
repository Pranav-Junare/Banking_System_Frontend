import { useEffect, useState } from "react";

export default function Dashboard(){
    const[name,setName]=useState("");
    const[balance,setBalance]=useState("");

    const[error, setError]=useState("");

    useEffect(()=>{
        fetch("http://localhost:8080/dashboard",{
            method:"GET",
            headers:{'Content-Type':'application/json'},
            credentials:'include'
            // needed only for post
            // body:JSON.stringify({name:name,balance:balance})
        })
        .then(response=>{
            if(response.ok){
                return response.json().then(data=>{
                    setBalance(data.balance);
                    setName(data.name);
                });
            }
            else{
                return response.json().then(data=>{
                    setError(data.error);
                });
            }
        })
        .catch(error=>{
            setError("Can not connect to the server right now");
        });
        // Square brackets let react know that only to run when the page loads
    },[]);

    return (
        <div style={{ maxWidth: "500px", margin: "50px auto", padding: "30px", border: "2px solid #28a745", borderRadius: "10px", fontFamily: "sans-serif", textAlign: "center" }}>
            
            {/* If there is an error, show the error screen */}
            {error ? (
                <div>
                    <h2 style={{ color: "red" }}>🚨 Access Denied</h2>
                    <p><strong>{error}</strong></p>
                    <p>Please return to the login page.</p>
                </div>
            ) : (
                /* If there is no error, show the actual Dashboard! */
                <div>
                    <h2 style={{ color: "#28a745", marginBottom: "5px" }}>Customer Dashboard</h2>
                    <h1 style={{ marginTop: "0" }}>Welcome, {name}!</h1>
                    
                    <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", marginTop: "20px" }}>
                        <p style={{ fontSize: "18px", margin: "0" }}>Current Account Balance</p>
                        <h2 style={{ fontSize: "36px", color: "#333", margin: "10px 0 0 0" }}>
                            ₹{balance}
                        </h2>
                    </div>
                </div>
            )}
            
        </div>
    );
}
