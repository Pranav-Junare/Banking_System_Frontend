import { useNavigate } from 'react-router-dom';

export default function Home() {
    // We still need the steering wheel so they can click a button to go log in!
    const navigate = useNavigate();

    return (
        <div style={{ maxWidth: "800px", margin: "40px auto", padding: "30px", fontFamily: "sans-serif", color: "#333" }}>
            
            {/* Header Section */}
            <div style={{ textAlign: "center", marginBottom: "50px" }}>
                <h1 style={{ color: "#0056b3", fontSize: "2.8rem", marginBottom: "10px" }}>Pranav's Banking System</h1>
                <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
                    A secure, full-stack financial application built to handle real-time transactions with strict concurrency and safety.
                </p>
            </div>

            {/* Info Cards Section */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "50px", flexWrap: "wrap" }}>
                
                {/* Features Card */}
                <div style={{ flex: 1, minWidth: "300px", padding: "25px", backgroundColor: "#f8f9fa", borderRadius: "8px", borderTop: "5px solid #0056b3", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                    <h3 style={{ marginTop: 0, color: "#0056b3" }}>System Features</h3>
                    <ul style={{ paddingLeft: "20px", lineHeight: "1.8", fontSize: "1.05rem" }}>
                        <li><strong>Secure Authentication:</strong> Independent user and admin session management.</li>
                        <li><strong>Live Dashboards:</strong> Instant balance updates and secure profile access.</li>
                        <li><strong>Transfer Engine:</strong> Safe, transactional money transfers between accounts.</li>
                        <li><strong>Audit Trails:</strong> Comprehensive transaction history for users and admins.</li>
                    </ul>
                </div>

                {/* Tech Stack Card */}
                <div style={{ flex: 1, minWidth: "300px", padding: "25px", backgroundColor: "#f8f9fa", borderRadius: "8px", borderTop: "5px solid #28a745", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                    <h3 style={{ marginTop: 0, color: "#28a745" }}>Technology Stack</h3>
                    <ul style={{ paddingLeft: "20px", lineHeight: "1.8", fontSize: "1.05rem" }}>
                        <li><strong>Frontend:</strong> React.js, React Router DOM, Raw CSS/Inline Styles</li>
                        <li><strong>Backend:</strong> Java, Spring Boot, Spring Web</li>
                        <li><strong>Database:</strong> Relational DB Repository Architecture</li>
                        <li><strong>API:</strong> RESTful architecture with standard JSON mapping</li>
                    </ul>
                </div>

            </div>

            {/* Call to Action Buttons */}
            <div style={{ textAlign: "center", borderTop: "1px solid #ddd", paddingTop: "30px" }}>
                <h3 style={{ marginBottom: "20px", color: "#444" }}>Access the System</h3>
                
                <button 
                    onClick={() => navigate('/login')}
                    style={{ padding: "12px 24px", fontSize: "1.1rem", backgroundColor: "#0056b3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", marginRight: "15px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
                >
                    Customer Portal
                </button>
                
                <button 
                    onClick={() => navigate('/admin')}
                    style={{ padding: "12px 24px", fontSize: "1.1rem", backgroundColor: "darkred", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
                >
                    Admin Portal
                </button>
            </div>

        </div>
    );
}