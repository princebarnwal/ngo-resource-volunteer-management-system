import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Settings, Calendar, Users, BarChart3, ClipboardList, HandHeart, History, LogOut } from "lucide-react";
import { Screen, Role } from "./types";
import SplashScreen from "./pages/SplashScreen";
import LoginScreen from "./pages/LoginScreen";
import RegistrationScreen from "./pages/RegistrationScreen";
import NGORegistrationScreen from "./pages/NGORegistrationScreen";
import AdminDashboard from "./pages/AdminDashboard";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import AdminEventsScreen from "./pages/AdminEventsScreen";
import AdminVolunteersScreen from "./pages/AdminVolunteersScreen";
import AdminDonationsScreen from "./pages/AdminDonationsScreen";
import AdminAnalyticsScreen from "./pages/AdminAnalyticsScreen";
import NotificationsScreen from "./pages/NotificationsScreen";
import NGODetailsScreen from "./pages/NGODetailsScreen";
import NGOProfileScreen from "./pages/NGOProfileScreen";
import ParticipationHistoryScreen from "./pages/ParticipationHistoryScreen";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [role, setRole] = useState<Role>("admin");
  const [userData, setUserData] = useState<any>(null);
  const [assignments] = useState<any[]>([]);
  const [selectedNGO, setSelectedNGO] = useState<any>(null);

  const navigate = (s: Screen) => setScreen(s);
  const handleLogin = (userRole: Role, data: any) => {
    setRole(userRole);
    setUserData(data);
    navigate(userRole === "admin" ? "admin_home" : "volunteer_home");
  };
  const handleLogout = () => navigate("login");

  const renderScreen = () => {
    switch (screen) {
      case "splash": return <SplashScreen onFinish={() => navigate("login")} />;
      case "login": return <LoginScreen onLogin={handleLogin} onRegister={() => navigate("register")} onNGORegister={() => navigate("ngo_register")} />;
      case "register": return <RegistrationScreen onBack={() => navigate("login")} onRegister={() => navigate("login")} />;
      case "ngo_register": return <NGORegistrationScreen onBack={() => navigate("login")} onRegister={() => navigate("login")} />;
      case "admin_home": return <AdminDashboard navigate={navigate} assignments={assignments} userData={userData} onLogout={handleLogout} />;
      case "admin_notifications": return <NotificationsScreen onBack={() => navigate("admin_home")} userData={userData} />;
      case "admin_events": return <AdminEventsScreen onBack={() => navigate("admin_home")} userData={userData} />;
      case "admin_volunteers": return <AdminVolunteersScreen onBack={() => navigate("admin_home")} userData={userData} />;
      case "admin_donations": return <AdminDonationsScreen onBack={() => navigate("admin_home")} userData={userData} />;
      case "admin_analytics": return <AdminAnalyticsScreen onBack={() => navigate("admin_home")} userData={userData} />;
      case "volunteer_home": return <VolunteerDashboard navigate={navigate} onLogout={handleLogout} userData={userData} />;
      case "ngo_details": return <NGODetailsScreen onBack={() => navigate("volunteer_home")} navigate={navigate} setSelectedNGO={setSelectedNGO} />;
      case "ngo_profile": return <NGOProfileScreen onBack={() => navigate("ngo_details")} selectedNGO={selectedNGO} userData={userData} />;
      case "participation_history": return <ParticipationHistoryScreen onBack={() => navigate("volunteer_home")} userData={userData} />;
      default: return <LoginScreen onLogin={handleLogin} onRegister={() => navigate("register")} onNGORegister={() => navigate("ngo_register")} />;
    }
  };

  const showNav = !["splash", "login", "register", "ngo_register"].includes(screen);

  return (
    <div className="min-h-screen bg-gray-100 font-sans selection:bg-orange-100 selection:text-orange-900">
      <div className="h-screen overflow-hidden relative flex flex-col">
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {showNav && (
          <div className="bg-white border-t border-gray-100 px-6 py-4 flex justify-around items-center">
            {role === "admin" ? (
              <>
                <button onClick={() => navigate("admin_home")} className={`p-2 rounded-full transition-colors ${screen === "admin_home" ? "text-[#F97316] bg-orange-50" : "text-gray-400"}`}><Settings size={22} /></button>
                <button onClick={() => navigate("admin_events")} className={`p-2 rounded-full transition-colors ${screen === "admin_events" ? "text-[#F97316] bg-orange-50" : "text-gray-400"}`}><Calendar size={22} /></button>
                <button onClick={() => navigate("admin_volunteers")} className={`p-2 rounded-full transition-colors ${screen === "admin_volunteers" ? "text-[#F97316] bg-orange-50" : "text-gray-400"}`}><Users size={22} /></button>
                <button onClick={() => navigate("admin_analytics")} className={`p-2 rounded-full transition-colors ${screen === "admin_analytics" ? "text-[#F97316] bg-orange-50" : "text-gray-400"}`}><BarChart3 size={22} /></button>
              </>
            ) : (
              <>
                <button onClick={() => navigate("volunteer_home")} className={`p-2 rounded-full transition-colors ${screen === "volunteer_home" ? "text-[#F97316] bg-orange-50" : "text-gray-400"}`}><ClipboardList size={22} /></button>
                <button onClick={() => navigate("ngo_details")} className={`p-2 rounded-full transition-colors ${["ngo_details", "ngo_profile"].includes(screen) ? "text-[#F97316] bg-orange-50" : "text-gray-400"}`}><HandHeart size={22} /></button>
                <button onClick={() => navigate("participation_history")} className={`p-2 rounded-full transition-colors ${screen === "participation_history" ? "text-[#F97316] bg-orange-50" : "text-gray-400"}`}><History size={22} /></button>
                <button onClick={handleLogout} className="p-2 rounded-full text-gray-400"><LogOut size={22} /></button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
