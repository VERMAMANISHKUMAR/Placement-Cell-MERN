import React, { useState } from "react";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3808/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.msg || "Invalid email or password!");
        setSuccess(""); // Clear success message if any
        return;
      }

      setSuccess("Login Successful! 🎉 Redirecting...");
      setError(""); // Clear error message if login is successful

      // Save token to localStorage
      localStorage.setItem("token", data.token);

      setTimeout(() => {
        navigate("/studentslist"); // Redirect to dashboard after a brief success message
      }, 2000);
    } catch (error) {
      setError("Server error! Please try again later.");
      setSuccess(""); // Clear success message in case of error
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h2 className="text-center mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <div className="text-center mt-3">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </Card>
    </Container>
  );
};

export default Login;

// ------------------------------------------


// import React, { useState } from "react";
// import { Form, Button, Container, Card, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       setError("All fields are required!");
//     } else {
//       setError("");
//       localStorage.setItem("token", "fake-jwt-token");
//       navigate("/");
//     }
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center vh-100">
//       <Card style={{ width: "400px" }} className="p-4 shadow">
//         <h2 className="text-center mb-4">Login</h2>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           </Form.Group>
//           <Button variant="primary" type="submit" className="w-100">Login</Button>
//         </Form>
//       </Card>
//     </Container>
//   );
// };

// export default Login;
