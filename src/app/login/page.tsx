"use client"
import React, { useState } from "react";
import { Button, TextField, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";


const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    router.push("/day")
    alert("Login functionality is not implemented in this prototype.");
  }

  function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder – integrate with Supabase for real reset
    setResetSent(true);
  }

  return (
  
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-full max-w-md bg-white border shadow-lg rounded-2xl p-8 flex flex-col gap-6">
          <h2 className="text-2xl font-bold font-raleway mb-4 text-center">Login</h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <TextField
              type="email"
              id="email"
              label="Email"
              variant="outlined"
              autoComplete="email"
              placeholder="you@email.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
            />
            <Button 
              type="submit" 
              variant="contained"
              color="primary"
             onClick ={handleLogin}
            
            >
              Log In
            </Button>
          </form>
          {/* ...existing forgot password button... */}
    
          {/* Forgot Password Modal */}
          {showForgot && (
            <div className="fixed inset-0 flex items-center justify-center z-30 bg-black/25">
              <div className="bg-white rounded-xl shadow-lg p-6 w-80 relative">
                <IconButton
                  aria-label="close"
                  onClick={() => { setShowForgot(false); setResetSent(false); setResetEmail(""); }}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
                <h3 className="font-bold text-lg mb-2">Reset Password</h3>
                {resetSent ? (
                  <div className="text-green-600 text-sm">If your email exists, password reset instructions have been sent.</div>
                ) : (
                  <form onSubmit={handleForgot} className="flex flex-col gap-4">
                    <TextField
                      type="email"
                      id="reset-email"
                      label="Email"
                      variant="outlined"
                      placeholder="you@email.com"
                      required
                      value={resetEmail}
                      onChange={e => setResetEmail(e.target.value)}
                      autoFocus
                      fullWidth
                    />
                    <Button 
                      type="submit" 
                      variant="contained"
                      fullWidth
                    >
                      Send Reset Link
                    </Button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
};

export default LoginPage;
