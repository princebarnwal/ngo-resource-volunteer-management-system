import React, { useState } from "react";
import { motion } from "motion/react";
import { HandHeart, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "../../config";
import { Role } from "../types";

const LoginScreen = ({ onLogin, onRegister, onNGORegister }: { onLogin: (role: Role, userData: any) => void; onRegister: () => void; onNGORegister: () => void }) => {
  const [role, setRole] = useState<Role>("volunteer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      setTimeout(() => setError(""), 3000);
      return;
    }
    try {
      const endpoint = role === "admin"
        ? `${API_BASE_URL}/api/ngos/login`
        : `${API_BASE_URL}/api/auth/login`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Login failed");
        setTimeout(() => setError(""), 3000);
        return;
      }
      const data = await response.json();
      if (data.success) {
        onLogin(role, data.user || data.ngo);
      } else {
        setError(data.error || "Login failed");
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      setError("Cannot connect to server. Please start the backend server.");
      setTimeout(() => setError(""), 5000);
    }
  };

  return (
    <div className="h-full w-full flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#F97316] to-[#EA580C] flex-col items-center justify-center p-12 text-white">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-lg"
        >
          <div className="bg-white p-8 rounded-3xl shadow-2xl mb-8 inline-block">
            <HandHeart size={100} className="text-[#F97316]" />
          </div>
          <h1 className="text-5xl font-bold mb-4">NGOConnect</h1>
          <p className="text-xl font-light opacity-90">Digitalizing Compassion</p>
          <p className="text-base mt-6 opacity-80">Connecting communities with NGOs to create meaningful social impact</p>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">{error}</span>
            </motion.div>
          )}

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Sign in to continue your mission</p>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Login as</label>
              <div className="grid grid-cols-2 gap-3 bg-gray-100 p-1.5 rounded-xl">
                <button
                  onClick={() => setRole("volunteer")}
                  className={`py-2.5 rounded-lg text-sm font-medium transition-all ${role === "volunteer" ? "bg-white text-[#F97316] shadow-md" : "text-gray-500"}`}
                >
                  User
                </button>
                <button
                  onClick={() => setRole("admin")}
                  className={`py-2.5 rounded-lg text-sm font-medium transition-all ${role === "admin" ? "bg-white text-[#F97316] shadow-md" : "text-gray-500"}`}
                >
                  Organization
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3.5 text-base bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3.5 text-base bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316] outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-3.5 text-base bg-[#F97316] text-white font-bold rounded-xl shadow-lg hover:bg-[#EA580C] transition-all hover:shadow-xl flex items-center justify-center gap-2"
            >
              LOGIN <ArrowRight size={20} />
            </button>

            <div className="text-center pt-3">
              {role === "volunteer" ? (
                <button onClick={onRegister} className="text-[#1976D2] font-medium text-sm hover:underline">
                  New user? Register here
                </button>
              ) : (
                <button onClick={onNGORegister} className="text-[#1976D2] font-medium text-sm hover:underline">
                  Register your organization or NGO
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
