import React from "react"
import Signup from "./components/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
import CreateAsset from "./components/CreateAsset"
import TransferAsset from "./components/TransferAsset"

function App() {
  return (
        <Router>
          <AuthProvider>
            <Routes>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/createAsset" component={CreateAsset} />
              <PrivateRoute exact path="/transferAsset" component={TransferAsset} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Routes>
          </AuthProvider>
        </Router>
  )
}

export default App
