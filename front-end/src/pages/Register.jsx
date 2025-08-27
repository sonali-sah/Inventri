import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import api from "../api/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/auth/register", form);
      login(data.token, data.email);
      nav("/dashboard");
    } catch (e) {
      setError(e?.response?.data?.message || "Register failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)", // blue gradient bg
        padding: "20px",
        color: "white",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
          <UserPlus size={28} color="#fff" />
          Create Account
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
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white/10 text-white
                         placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              placeholder="Password (min 6)"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white/10 text-white
                         placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Error */}
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold
                       shadow-md active:scale-95 transition transform"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-300 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
