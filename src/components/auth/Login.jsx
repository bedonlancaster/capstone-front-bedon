import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = ({ onLogin }) => {
    const [employeeName, setEmployeeName] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        fetch(
            `http://localhost:8088/employees?name=${encodeURIComponent(employeeName)}`
        )
            .then((res) => res.json())
            .then((foundEmployees) => {
                if (foundEmployees.length === 1) {
                    const employee = foundEmployees[0]
                    onLogin(employee) // Set logged in employee in App.jsx
                    navigate("/")
                } else {
                    window.alert("Invalid employee name")
                }
            })
    }

    return (
        <main className="login-container">
            <section>
                <form className="form-login" onSubmit={handleLogin}>
                    <h1>Employee Login</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <div className="form-group">
                            <input
                                type="text"
                                value={employeeName}
                                onChange={(evt) => setEmployeeName(evt.target.value)}
                                className="form-control"
                                placeholder="Employee Name"
                                required
                                autoFocus
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <button className="login-btn btn-info" type="submit">
                                Sign in
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}
