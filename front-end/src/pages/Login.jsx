import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import api from "../api/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/login", form);
      login(data.token, data.email);
      nav("/dashboard");
    } catch (e) {
      setError(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1e3c72, #2a5298)", // blue gradient bg
        color: "white",
        width: "500px",
        margin: "60px auto",
        padding: "40px",
        textAlign: "center",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition duration-200"
            />
          </div>

<br />
          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition duration-200"
            />
          </div>
<br />
          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl shadow-md 
                       hover:bg-blue-700 active:scale-95 transition transform"
          >
            Login
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
