import { useEffect, useState } from "react";

export default function History(){
    const[transactionDetails,setTransactionDetails]=useState([]);
    const[error,setError]=useState("");

    useEffect(()=>{
        fetch("http://localhost:8080/history",{
            method:"GET",
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        })
        .then(response=>{
            if(response.ok){
                return response.json().then(data=>{
                    setTransactionDetails(data);
                });
            }
            else{
                return response.json().then(data=>{
                    setError(data.error);
                });
            }

        })
        .catch(error=>{
            setError("Can not connect to the server");
        })
    },[]);

    return (
        <div style={{ maxWidth: "700px", margin: "50px auto", padding: "30px", border: "2px solid #333", borderRadius: "10px", fontFamily: "sans-serif" }}>
            
            <h2 style={{ color: "#333", borderBottom: "2px solid #eee", paddingBottom: "10px" }}>Transaction History</h2>

            {/* If there is an error (like not logged in or no history), show it here */}
            {error && (
                <div style={{ backgroundColor: "#ffe6e6", color: "red", padding: "15px", borderRadius: "5px", marginBottom: "20px" }}>
                    <strong>{error}</strong>
                </div>
            )}

            {/* If there are transactions, draw the table! */}
            {transactionDetails.length > 0 && (
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f8f9fa", textAlign: "left" }}>
                            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Transaction ID</th>
                            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Receiver</th>
                            <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* We use .map() to loop through the array and draw a row for every transaction */}
                        {transactionDetails.map((tx, index) => (
                            <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "12px", color: "#666" }}>{tx.transactionId}</td>
                                <td style={{ padding: "12px", fontWeight: "bold" }}>{tx.receiverName}</td>
                                <td style={{ padding: "12px", color: "#28a745", fontWeight: "bold" }}>₹{tx.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
}