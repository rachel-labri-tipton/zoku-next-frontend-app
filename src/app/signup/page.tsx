'use client'

import React, {useState} from "react"
import {Button, TextField, IconButton } from "@mui/material"
import { z } from "zod"

const registrationSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password must be at least 6 characters"),
})


const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  // function handleSignUp(e: React.FormEvent) {
  //   e.preventDefault();
  //   // Placeholder – integrate with Supabase for real auth
  //   alert("Login functionality is not implemented in this prototype.");
  // }

  // function handleExistingUser(e: React.FormEvent) {
  //   e.preventDefault();
   
  // }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white border shadow-lg rounded-2xl p-8 flex flex-col gap-6">
        <h2 className="text-2xl font-bold font-raleway mb-4 text-center">Sign Up</h2>
        <form  className="flex flex-col gap-4">
          <div>
            <TextField htmlFor="email">Email</TextField>
            <TextField
              type="email"
              id="email"
              autoComplete="email"
              placeholder="you@email.com"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <TextField htmlFor="password">Password</TextField>
            <TextField
              type="password"
              id="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <TextField htmlFor="password">Confirm Password</TextField>
            <TextField
              type="password"
              id="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">Submit</Button>
        </form>
      
        {/* Forgot Password Modal */}
        
      </div>
    </div>
  );
};

export default SignUpPage;

