import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { User, LogOut, Users, HandHeart, ArrowRight, ClipboardList, History, Calendar, Filter, CheckCircle2, X } from "lucide-react";
import { API_BASE_URL } from "../../config";
import { Screen } from "../types";
import AndroidHeader from "../components/shared/AndroidHeader";
import MaterialCard from "../components/shared/MaterialCard";

const VolunteerDashboard = ({ navigate, onLogout, userData }: { navigate: (s: Screen) => void; onLogout: () => void; userData: any }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" });
  const [assignedCount, setAssignedCount] = useState(0);

  useEffect(() => {
    const fetchAssignedEvents = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/applications/volunteer/${userData._id}`);
        const data = await response.json();
        if (data.success) setAssignedCount(data.applications?.filter((app: any) => app.status === "accepted").length || 0);
      } catch (error) { console.error("Error fetching assigned events:", error); }
    };
    fetchAssignedEvents();
  }, []);

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <AndroidHeader
        title="Home"
        rightAction={
          <button onClick={() => setShowProfile(true)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <User size={20} />
          </button>
        }
      />

      {showProfile && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-sm max-h-[90%] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">My Profile</h3>
              <button onClick={() => { setShowProfile(false); setIsEditingProfile(false); }} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} className="text-gray-500" /></button>
            </div>
            {!isEditingProfile ? (
              <>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-3"><User size={40} className="text-[#F97316]" /></div>
                  <h4 className="text-lg font-bold text-gray-800">{userData?.name || "User"}</h4>
                  <p className="text-sm text-gray-500">{userData?.email || "No email"}</p>
                </div>
                <div className="space-y-3 mb-6">
                  {userData?.phone && <div className="bg-gray-50 p-4 rounded-lg"><p className="text-xs text-gray-500 uppercase mb-1">Phone</p><p className="text-sm font-medium text-gray-800">{userData.phone}</p></div>}
                  {userData?.skills?.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase mb-1">Skills</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {userData.skills.map((skill: string) => <span key={skill} className="text-xs bg-orange-100 text-[#F97316] px-2 py-1 rounded">{skill}</span>)}
                      </div>
                    </div>
                  )}
                  {userData?.availability && <div className="bg-gray-50 p-4 rounded-lg"><p className="text-xs text-gray-500 uppercase mb-1">Availability</p><p className="text-sm font-medium text-gray-800">{userData.availability}</p></div>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setIsEditingProfile(true); setEditForm({ name: userData?.name || "", email: userData?.email || "", phone: userData?.phone || "" }); }} className="flex-1 py-3 bg-[#F97316] text-white font-bold rounded-lg hover:bg-[#EA580C] transition-colors">Edit Profile</button>
                  <button onClick={() => { setShowProfile(false); onLogout(); }} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"><LogOut size={18} /> Sign Out</button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {[["Name", "name"], ["Email", "email"], ["Phone", "phone"]].map(([label, key]) => (
                    <div key={key}>
                      <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">{label}</label>
                      <input value={(editForm as any)[key]} onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                    </div>
                  ))}
                </div>
                <button onClick={async () => { try { const res = await fetch(`${API_BASE_URL}/api/users/${userData._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editForm) }); const data = await res.json(); if (data.success) { Object.assign(userData, editForm); setIsEditingProfile(false); } } catch (e) { console.error(e); } }} className="w-full py-3 bg-green-500 text-white font-bold rounded-lg mb-2 hover:bg-green-600 transition-colors">Save Changes</button>
                <button onClick={() => setIsEditingProfile(false)} className="w-full py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
              </>
            )}
          </motion.div>
        </div>
      )}

      <div className="p-4 space-y-6 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-[#F97316] rounded-2xl p-6 text-white shadow-lg shadow-orange-100">
            <h2 className="text-2xl font-bold">Hi, {userData?.name?.split(" ")[0] || "User"}!</h2>
            <p className="opacity-80 mt-1">You have {assignedCount} assigned events.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 flex items-center gap-2 px-2"><Users size={18} className="text-[#F97316]" /> Registered Organizations</h4>
            <button onClick={() => navigate("ngo_details")} className="w-full bg-white p-4 rounded-xl border border-gray-100 hover:border-[#F97316] transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center"><HandHeart size={24} className="text-[#F97316]" /></div>
                <div className="text-left"><p className="font-bold text-gray-800">View NGOs</p><p className="text-xs text-gray-500">Browse registered organizations</p></div>
              </div>
              <ArrowRight size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 flex items-center gap-2 px-2"><ClipboardList size={18} className="text-[#F97316]" /> Assigned Tasks</h4>
            <MaterialCard className="border-l-4 border-l-[#FFA000]">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-bold text-gray-800">Health Camp 2026</h5>
                <span className="text-[10px] font-bold bg-orange-100 text-[#FFA000] px-2 py-1 rounded">TOMORROW</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">Assist medical staff with patient registration and queue management.</p>
              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><Calendar size={12} /> March 15</span>
                <span className="flex items-center gap-1"><Filter size={12} /> Community Center</span>
              </div>
            </MaterialCard>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 flex items-center gap-2 px-2"><History size={18} className="text-[#1976D2]" /> Participation History</h4>
            <div className="space-y-2">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 opacity-60">
                  <CheckCircle2 size={18} className="text-orange-500" />
                  <div className="flex-1"><p className="text-sm font-medium">Food Distribution Drive</p><p className="text-[10px] text-gray-400">Jan 24, 2026</p></div>
                  <span className="text-xs font-bold text-gray-400">4 Hours</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
