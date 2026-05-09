import React, { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { API_BASE_URL } from "../../config";
import AndroidHeader from "../components/shared/AndroidHeader";

const availableSkills = ["Community Outreach", "Event Planning", "Fundraising", "Teaching & Mentoring", "Healthcare Support", "Food Distribution", "Disaster Relief", "Environmental Conservation", "Child Welfare", "Elderly Care", "Social Media Management", "Content Writing", "Photography & Videography", "Graphic Design", "Web Development", "Legal Aid", "Financial Management", "Translation Services", "Counseling & Support", "Administrative Support"];

const RegistrationScreen = ({ onBack, onRegister }: { onBack: () => void; onRegister: () => void }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "", skills: [] as string[] });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter(s => s !== skill) : [...prev.skills, skill],
    }));
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill in all required fields");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "volunteer" }),
      });
      if (!response.ok) {
        const data = await response.json();
        alert("Registration failed: " + (data.error || "Unknown error"));
        return;
      }
      const data = await response.json();
      if (data.success) {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => onRegister(), 2000);
      } else {
        alert("Registration failed: " + data.error);
      }
    } catch (error) {
      alert("Cannot connect to server. Please start the backend server.");
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <AndroidHeader title="Register" onBack={onBack} />

      {successMessage && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-8 mx-6 text-center shadow-2xl"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-[#F97316]" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Success!</h3>
            <p className="text-gray-600">{successMessage}</p>
          </motion.div>
        </div>
      )}

      <div className="p-6 space-y-4 overflow-y-auto pb-10">
        <div className="max-w-2xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Volunteer Application</h3>
          <p className="text-sm text-gray-500">Join our community of change-makers.</p>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase">Full Name</label>
              <input placeholder="John Doe" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase">Email</label>
              <input placeholder="john@example.com" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase">Phone</label>
              <input placeholder="+1 234 567 890" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase">Skills</label>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {availableSkills.map(skill => (
                  <label key={skill} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                    <input type="checkbox" checked={formData.skills.includes(skill)} onChange={() => toggleSkill(skill)} className="w-4 h-4 text-[#F97316] border-gray-300 rounded focus:ring-[#F97316] flex-shrink-0" />
                    <span className="text-xs font-medium text-gray-700 leading-tight">{skill}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase">Availability</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg appearance-none">
                <option>Weekends</option>
                <option>Weekdays</option>
                <option>Evenings</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg pr-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <button onClick={handleRegister} className="w-full py-4 bg-[#FFA000] text-white font-bold rounded-xl mt-6 shadow-md">
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;
