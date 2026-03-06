import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { API_BASE_URL } from '../config';
import { 
  Users, 
  Heart, 
  Calendar, 
  BarChart3, 
  LogOut, 
  ChevronLeft, 
  Plus, 
  Filter,
  UserPlus,
  ClipboardList,
  CheckCircle2,
  Settings,
  Bell,
  Search,
  MoreVertical,
  ArrowRight,
  HandHeart,
  Package,
  History,
  User,
  X,
  Upload,
  QrCode
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// --- Types ---
type Role = "admin" | "volunteer";
type Screen = 
  | "splash" 
  | "login" 
  | "register" 
  | "ngo_register"
  | "admin_home" 
  | "admin_notifications"
  | "admin_events"
  | "admin_volunteers"
  | "admin_donations"
  | "admin_analytics"
  | "volunteer_home" 
  | "ngo_details"
  | "ngo_profile"
  | "participation_history";



// --- Sub-components ---

const AndroidHeader = ({ title, onBack, rightAction }: { title: string; onBack?: () => void; rightAction?: React.ReactNode }) => (
  <div className="bg-[#F97316] text-white p-4 flex items-center justify-between shadow-md">
    <div className="flex items-center gap-3">
      {onBack && (
        <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors">
          <ChevronLeft size={24} />
        </button>
      )}
      <h1 className="text-xl font-medium">{title}</h1>
    </div>
    {rightAction && <div>{rightAction}</div>}
  </div>
);

const MaterialCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${className}`}>
    {children}
  </div>
);



// --- Screen Components ---

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-full bg-[#F97316] flex flex-col items-center justify-center text-white">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-4"
      >
        <div className="bg-white p-6 rounded-3xl shadow-2xl">
          <HandHeart size={80} className="text-[#F97316]" />
        </div>
      </motion.div>
      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-4xl font-bold tracking-tight"
      >
        NGOConnect
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1 }}
        className="mt-2 text-lg font-light"
      >
        Digitalizing Compassion
      </motion.p>
    </div>
  );
};

const LoginScreen = ({ onLogin, onRegister, onNGORegister }: { onLogin: (role: Role, userData: any) => void; onRegister: () => void; onNGORegister: () => void }) => {
  const [role, setRole] = useState<Role>("volunteer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter email and password');
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const endpoint = role === 'admin' 
        ? `${API_BASE_URL}/api/ngos/login`
        : `${API_BASE_URL}/api/auth/login`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Login failed');
        setTimeout(() => setError(""), 3000);
        return;
      }
      
      const data = await response.json();
      if (data.success) {
        onLogin(role, data.user || data.ngo);
      } else {
        setError(data.error || 'Login failed');
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      console.error('Connection error:', error);
      setError('Cannot connect to server. Please start the backend server.');
      setTimeout(() => setError(""), 5000);
    }
  };
  
  return (
    <div className="h-full w-full flex">
      {/* Left Side - Branding */}
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

      {/* Right Side - Login Form */}
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
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
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

const RegistrationScreen = ({ onBack, onRegister }: { onBack: () => void; onRegister: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    skills: [] as string[]
  });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const availableSkills = ["Community Outreach", "Event Planning", "Fundraising", "Teaching & Mentoring", "Healthcare Support", "Food Distribution", "Disaster Relief", "Environmental Conservation", "Child Welfare", "Elderly Care", "Social Media Management", "Content Writing", "Photography & Videography", "Graphic Design", "Web Development", "Legal Aid", "Financial Management", "Translation Services", "Counseling & Support", "Administrative Support"];

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...formData, role: 'volunteer'})
      });
      
      if (!response.ok) {
        const data = await response.json();
        alert('Registration failed: ' + (data.error || 'Unknown error'));
        return;
      }
      
      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          onRegister();
        }, 2000);
      } else {
        alert('Registration failed: ' + data.error);
      }
    } catch (error) {
      console.error('Connection error:', error);
      alert('Cannot connect to server. Please start the backend server.');
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
              <input 
                placeholder="John Doe" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase">Email</label>
              <input 
                placeholder="john@example.com" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase">Phone</label>
              <input 
                placeholder="+1 234 567 890" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase">Skills</label>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {availableSkills.map(skill => (
                  <label key={skill} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill)}
                      onChange={() => toggleSkill(skill)}
                      className="w-4 h-4 text-[#F97316] border-gray-300 rounded focus:ring-[#F97316] flex-shrink-0"
                    />
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
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleRegister}
            className="w-full py-4 bg-[#FFA000] text-white font-bold rounded-xl mt-6 shadow-md"
          >
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
};

const NGORegistrationScreen = ({ onBack, onRegister }: { onBack: () => void; onRegister: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    registrationNumber: '',
    description: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/ngos/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const data = await response.json();
        alert('Registration failed: ' + (data.error || 'Unknown error'));
        return;
      }
      
      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Organization registered successfully! Redirecting to login...');
        setTimeout(() => {
          onRegister();
        }, 2000);
      } else {
        alert('Registration failed: ' + data.error);
      }
    } catch (error) {
      console.error('Connection error:', error);
      alert('Cannot connect to server. Please start the backend server.');
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      <AndroidHeader title="Register Organization" onBack={onBack} />
      
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
        <h3 className="text-xl font-bold text-gray-800">Organization Registration</h3>
        <p className="text-sm text-gray-500">Register your NGO to connect with volunteers.</p>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Organization Name *</label>
            <input 
              placeholder="ABC Foundation" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Email *</label>
            <input 
              type="email"
              placeholder="contact@abcfoundation.org" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Phone</label>
            <input 
              placeholder="+1 234 567 890" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Registration Number</label>
            <input 
              placeholder="REG-12345" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              value={formData.registrationNumber}
              onChange={(e) => setFormData({...formData, registrationNumber: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Address</label>
            <input 
              placeholder="123 Main Street, City" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Description</label>
            <textarea 
              placeholder="Brief description of your organization..." 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-24"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-400 uppercase">Password *</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="••••••••" 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg pr-10"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={handleRegister}
          className="w-full py-4 bg-[#F97316] text-white font-bold rounded-xl mt-6 shadow-md"
        >
          REGISTER ORGANIZATION
        </button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ navigate, assignments, userData, onLogout }: { navigate: (s: Screen) => void; assignments: any[]; userData: any; onLogout: () => void }) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [eventForm, setEventForm] = useState({ title: '', date: '', location: '', description: '' });
  const [paymentForm, setPaymentForm] = useState({ upiId: '', qrCode: null as File | null });
  const [scheduledEvents, setScheduledEvents] = useState<any[]>([]);
  const [completedEvents, setCompletedEvents] = useState<any[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [acceptedVolunteers, setAcceptedVolunteers] = useState<any[]>([]);
  const [stats, setStats] = useState({ volunteers: 0, donations: 0, events: 0 });

  useEffect(() => {
    fetchScheduledEvents();
    fetchCompletedEvents();
    fetchNotificationCount();
    fetchAcceptedVolunteers();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch volunteers count
      const volResponse = await fetch(`${API_BASE_URL}/api/applications/ngo/${userData._id}`);
      const volData = await volResponse.json();
      const volunteersCount = volData.success ? (volData.applications?.filter((app: any) => app.status === 'accepted').length || 0) : 0;

      // Fetch events count
      const eventsResponse = await fetch(`${API_BASE_URL}/api/events/all?ngo_id=${userData._id}`);
      const eventsData = await eventsResponse.json();
      const eventsCount = eventsData.success ? (eventsData.events?.length || 0) : 0;

      setStats({ volunteers: volunteersCount, donations: 0, events: eventsCount });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchAcceptedVolunteers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/ngo/${userData._id}`);
      const data = await response.json();
      if (data.success) {
        const accepted = data.applications?.filter((app: any) => app.status === 'accepted') || [];
        setAcceptedVolunteers(accepted);
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  const fetchNotificationCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/ngo/${userData._id}`);
      const data = await response.json();
      if (data.success) {
        const pending = data.applications?.filter((app: any) => app.status === 'pending').length || 0;
        setNotificationCount(pending);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const fetchScheduledEvents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/all?ngo_id=${userData._id}`);
      const data = await response.json();
      if (data.success) {
        const upcoming = data.events?.filter((event: any) => event.status !== 'completed') || [];
        setScheduledEvents(upcoming);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchCompletedEvents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/all?ngo_id=${userData._id}`);
      const data = await response.json();
      if (data.success) {
        const completed = data.events?.filter((event: any) => event.status === 'completed') || [];
        setCompletedEvents(completed);
      }
    } catch (error) {
      console.error('Error fetching completed events:', error);
    }
  };

  const handleScheduleEvent = async () => {
    if (eventForm.title && eventForm.date) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/events/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...eventForm, ngo_id: userData._id })
        });
        const data = await response.json();
        if (data.success) {
          fetchScheduledEvents();
          fetchCompletedEvents();
          setShowScheduleModal(false);
          setEventForm({ title: '', date: '', location: '', description: '' });
        }
      } catch (error) {
        console.error('Error creating event:', error);
      }
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/delete/${eventId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.success) {
        fetchScheduledEvents();
        fetchCompletedEvents();
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handlePaymentUpload = async () => {
    if (!paymentForm.upiId) {
      alert('Please enter UPI ID');
      return;
    }

    try {
      let qrCodeBase64 = '';
      if (paymentForm.qrCode) {
        const reader = new FileReader();
        qrCodeBase64 = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(paymentForm.qrCode!);
        });
      }

      const response = await fetch(`${API_BASE_URL}/api/ngos/${userData._id}/payment`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          upiId: paymentForm.upiId,
          qrCode: qrCodeBase64
        })
      });

      const data = await response.json();
      if (data.success) {
        alert('Payment details saved successfully!');
        setShowPaymentModal(false);
        setPaymentForm({ upiId: '', qrCode: null });
      }
    } catch (error) {
      console.error('Error uploading payment details:', error);
      alert('Failed to save payment details');
    }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <AndroidHeader 
        title={userData?.name || "Home"} 
        rightAction={
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('admin_notifications')} className="p-1 hover:bg-white/10 rounded-full transition-colors relative">
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            <button onClick={() => setShowProfile(true)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
              <User size={20} />
            </button>
          </div>
        } 
      />
      
      {/* Profile Modal */}
      {showProfile && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-sm max-h-[90%] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Organization Profile</h3>
              <button onClick={() => { setShowProfile(false); setIsEditingProfile(false); }} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            {!isEditingProfile ? (
              <>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                    <HandHeart size={40} className="text-[#F97316]" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">{userData?.name || 'Organization'}</h4>
                  <p className="text-sm text-gray-500">{userData?.email || 'No email'}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {userData?.phone && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase mb-1">Phone</p>
                      <p className="text-sm font-medium text-gray-800">{userData.phone}</p>
                    </div>
                  )}
                  {userData?.address && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase mb-1">Address</p>
                      <p className="text-sm font-medium text-gray-800">{userData.address}</p>
                    </div>
                  )}
                  {userData?.registrationNumber && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase mb-1">Registration Number</p>
                      <p className="text-sm font-medium text-gray-800">{userData.registrationNumber}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => { setIsEditingProfile(true); setEditForm({ name: userData?.name || '', email: userData?.email || '', phone: userData?.phone || '', address: userData?.address || '' }); }}
                    className="flex-1 py-3 bg-[#F97316] text-white font-bold rounded-lg hover:bg-[#EA580C] transition-colors"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => { setShowProfile(false); onLogout(); }}
                    className="flex-1 py-3 bg-red-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Organization Name</label>
                    <input value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Email</label>
                    <input value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Phone</label>
                    <input value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Address</label>
                    <input value={editForm.address} onChange={(e) => setEditForm({...editForm, address: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                  </div>
                </div>
                <button onClick={async () => { try { const res = await fetch(`${API_BASE_URL}/api/ngos/${userData._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm) }); const data = await res.json(); if (data.success) { Object.assign(userData, editForm); setIsEditingProfile(false); } } catch (e) { console.error(e); } }} className="w-full py-3 bg-green-500 text-white font-bold rounded-lg mb-2 hover:bg-green-600 transition-colors">Save Changes</button>
                <button onClick={() => setIsEditingProfile(false)} className="w-full py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
              </>
            )}
          </motion.div>
        </div>
      )}
      
      {/* Schedule Event Modal */}
      {showScheduleModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-sm max-h-[90%] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Schedule Event</h3>
              <button onClick={() => setShowScheduleModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Event Name</label>
                <input 
                  placeholder="Health Camp 2026" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Date</label>
                <input 
                  type="date"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  value={eventForm.date}
                  onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Location</label>
                <input 
                  placeholder="Community Center" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Description</label>
                <textarea 
                  placeholder="Event details..." 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-24"
                  value={eventForm.description}
                  onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                />
              </div>
              <button
                onClick={handleScheduleEvent}
                className="w-full py-3 bg-[#F97316] text-white font-bold rounded-lg"
              >
                Schedule Event
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Payment Settings Modal */}
      {showPaymentModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Payment Settings</h3>
              <button onClick={() => setShowPaymentModal(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">UPI ID</label>
                <input 
                  placeholder="yourorg@upi" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg"
                  value={paymentForm.upiId}
                  onChange={(e) => setPaymentForm({...paymentForm, upiId: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase block mb-2">QR Code</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden" 
                    id="qr-upload"
                    onChange={(e) => setPaymentForm({...paymentForm, qrCode: e.target.files?.[0] || null})}
                  />
                  <label htmlFor="qr-upload" className="cursor-pointer">
                    <QrCode size={40} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">
                      {paymentForm.qrCode ? paymentForm.qrCode.name : 'Click to upload QR code'}
                    </p>
                  </label>
                </div>
              </div>
              <button
                onClick={handlePaymentUpload}
                className="w-full py-3 bg-[#F97316] text-white font-bold rounded-lg flex items-center justify-center gap-2"
              >
                <Upload size={18} /> Save Payment Details
              </button>
            </div>
          </motion.div>
        </div>
      )}
      <div className="p-4 space-y-6 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setShowScheduleModal(true)}
            className="bg-white p-4 rounded-xl border border-gray-100 hover:border-[#F97316] transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar size={20} className="text-[#F97316]" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-800">Schedule</p>
              <p className="text-[10px] text-gray-500">New Event</p>
            </div>
          </button>
          <button
            onClick={() => setShowPaymentModal(true)}
            className="bg-white p-4 rounded-xl border border-gray-100 hover:border-[#F97316] transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <QrCode size={20} className="text-[#1976D2]" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-800">Payment</p>
              <p className="text-[10px] text-gray-500">QR & UPI</p>
            </div>
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <button onClick={() => navigate('admin_volunteers')} className="w-full">
            <MaterialCard className="text-center p-2 flex flex-col items-center hover:border-[#F97316] transition-colors cursor-pointer">
              <div className="text-[#F97316] bg-orange-50 p-2 rounded-lg mb-1">
                <Users size={20} />
              </div>
              <span className="text-xl font-bold">{stats.volunteers}</span>
              <span className="text-[10px] text-gray-500 uppercase">Volunteers</span>
            </MaterialCard>
          </button>
          <button onClick={() => navigate('admin_donations')} className="w-full">
            <MaterialCard className="text-center p-2 flex flex-col items-center hover:border-[#F97316] transition-colors cursor-pointer">
              <div className="text-[#1976D2] bg-blue-50 p-2 rounded-lg mb-1">
                <Package size={20} />
              </div>
              <span className="text-xl font-bold">{stats.donations}</span>
              <span className="text-[10px] text-gray-500 uppercase">Donations</span>
            </MaterialCard>
          </button>
          <button onClick={() => navigate('admin_events')} className="w-full">
            <MaterialCard className="text-center p-2 flex flex-col items-center hover:border-[#F97316] transition-colors cursor-pointer">
              <div className="text-[#FFA000] bg-orange-50 p-2 rounded-lg mb-1">
                <Calendar size={20} />
              </div>
              <span className="text-xl font-bold">{stats.events}</span>
              <span className="text-[10px] text-gray-500 uppercase">Events</span>
            </MaterialCard>
          </button>
        </div>

        {/* Navigation Grid */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500 px-2">Quick access to management features</p>
        </div>

        {/* Scheduled Events */}
        {scheduledEvents.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <h4 className="font-bold text-gray-800">Scheduled Events</h4>
              <button onClick={() => navigate('admin_events')} className="text-xs text-[#F97316] font-medium">
                See All
              </button>
            </div>
            <div className="space-y-3">
              {scheduledEvents.slice(0, 2).map(event => (
                <MaterialCard key={event._id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h5 className="font-bold text-gray-800">{event.title}</h5>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        {event.status || 'Upcoming'}
                      </span>
                      <button
                        onClick={() => handleDeleteEvent(event._id)}
                        className="p-1 hover:bg-red-50 rounded text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                    {event.location && <span className="flex items-center gap-1"><Filter size={12} /> {event.location}</span>}
                  </div>
                  {event.description && <p className="text-xs text-gray-500">{event.description}</p>}
                </MaterialCard>
              ))}
            </div>
          </div>
        )}

        {/* Completed Events */}
        {completedEvents.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <h4 className="font-bold text-gray-800">Completed Events</h4>
              <button onClick={() => navigate('admin_events')} className="text-xs text-[#F97316] font-medium">
                See All
              </button>
            </div>
            <div className="space-y-3">
              {completedEvents.slice(0, 2).map(event => (
                <MaterialCard key={event._id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h5 className="font-bold text-gray-800">{event.title}</h5>
                    <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-1 rounded">
                      Completed
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                    {event.location && <span className="flex items-center gap-1"><Filter size={12} /> {event.location}</span>}
                  </div>
                  {event.description && <p className="text-xs text-gray-500">{event.description}</p>}
                </MaterialCard>
              ))}
            </div>
          </div>
        )}

        {/* Accepted Volunteers */}
        {acceptedVolunteers.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <h4 className="font-bold text-gray-800">Accepted Volunteers</h4>
              <button onClick={() => navigate('admin_volunteers')} className="text-xs text-[#F97316] font-medium">
                See All
              </button>
            </div>
            <div className="space-y-3">
              {acceptedVolunteers.slice(0, 3).map(app => (
                <MaterialCard key={app._id} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-800">{app.volunteer_name}</p>
                    <p className="text-xs text-gray-500">{app.volunteer_email}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Event: {app.event_title}</p>
                  </div>
                  <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-1 rounded">ACCEPTED</span>
                </MaterialCard>
              ))}
            </div>
          </div>
        )}

        {/* Recent Assignments */}
        <div className="space-y-3">
          <p className="text-sm text-gray-500 px-2">Manage volunteer assignments from scheduled events</p>
        </div>
        </div>
      </div>
    </div>
  );
};

const VolunteerDashboard = ({ navigate, onLogout, userData }: { navigate: (s: Screen) => void; onLogout: () => void; userData: any }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '' });
  const [assignedCount, setAssignedCount] = useState(0);

  useEffect(() => {
    fetchAssignedEvents();
  }, []);

  const fetchAssignedEvents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/volunteer/${userData._id}`);
      const data = await response.json();
      if (data.success) {
        const accepted = data.applications?.filter((app: any) => app.status === 'accepted').length || 0;
        setAssignedCount(accepted);
      }
    } catch (error) {
      console.error('Error fetching assigned events:', error);
    }
  };

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
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-sm max-h-[90%] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">My Profile</h3>
              <button onClick={() => { setShowProfile(false); setIsEditingProfile(false); }} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            
            {!isEditingProfile ? (
              <>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                    <User size={40} className="text-[#F97316]" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">{userData?.name || 'User'}</h4>
                  <p className="text-sm text-gray-500">{userData?.email || 'No email'}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {userData?.phone && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase mb-1">Phone</p>
                      <p className="text-sm font-medium text-gray-800">{userData.phone}</p>
                    </div>
                  )}
                  {userData?.skills && userData.skills.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase mb-1">Skills</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {userData.skills.map((skill: string) => (
                          <span key={skill} className="text-xs bg-orange-100 text-[#F97316] px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {userData?.availability && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-xs text-gray-500 uppercase mb-1">Availability</p>
                      <p className="text-sm font-medium text-gray-800">{userData.availability}</p>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => { setIsEditingProfile(true); setEditForm({ name: userData?.name || '', email: userData?.email || '', phone: userData?.phone || '' }); }}
                    className="flex-1 py-3 bg-[#F97316] text-white font-bold rounded-lg hover:bg-[#EA580C] transition-colors"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => { setShowProfile(false); onLogout(); }}
                    className="flex-1 py-3 bg-red-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Name</label>
                    <input value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Email</label>
                    <input value={editForm.email} onChange={(e) => setEditForm({...editForm, email: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Phone</label>
                    <input value={editForm.phone} onChange={(e) => setEditForm({...editForm, phone: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                  </div>
                </div>
                <button onClick={async () => { try { const res = await fetch(`${API_BASE_URL}/api/users/${userData._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editForm) }); const data = await res.json(); if (data.success) { Object.assign(userData, editForm); setIsEditingProfile(false); } } catch (e) { console.error(e); } }} className="w-full py-3 bg-green-500 text-white font-bold rounded-lg mb-2 hover:bg-green-600 transition-colors">Save Changes</button>
                <button onClick={() => setIsEditingProfile(false)} className="w-full py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
              </>
            )}
          </motion.div>
        </div>
      )}
      <div className="p-4 space-y-6 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Header */}
          <div className="bg-[#F97316] rounded-2xl p-6 text-white shadow-lg shadow-orange-100">
            <h2 className="text-2xl font-bold">Hi, {userData?.name?.split(' ')[0] || 'User'}!</h2>
            <p className="opacity-80 mt-1">You have {assignedCount} assigned events.</p>
          </div>

          {/* Browse NGOs */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 flex items-center gap-2 px-2">
              <Users size={18} className="text-[#F97316]" />
              Registered Organizations
            </h4>
            <button 
              onClick={() => navigate("ngo_details")}
              className="w-full bg-white p-4 rounded-xl border border-gray-100 hover:border-[#F97316] transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <HandHeart size={24} className="text-[#F97316]" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-800">View NGOs</p>
                  <p className="text-xs text-gray-500">Browse registered organizations</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Assigned Events */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 flex items-center gap-2 px-2">
              <ClipboardList size={18} className="text-[#F97316]" />
              Assigned Tasks
            </h4>
            <div className="space-y-3">
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
          </div>

          {/* History */}
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 flex items-center gap-2 px-2">
              <History size={18} className="text-[#1976D2]" />
              Participation History
            </h4>
            <div className="space-y-2">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 opacity-60">
                  <CheckCircle2 size={18} className="text-orange-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Food Distribution Drive</p>
                    <p className="text-[10px] text-gray-400">Jan 24, 2026</p>
                  </div>
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

const AdminEventsScreen = ({ onBack, userData }: { onBack: () => void; userData: any }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [applicants, setApplicants] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/all?ngo_id=${userData._id}`);
      const data = await response.json();
      if (data.success) {
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplicants = async (eventId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/event/${eventId}`);
      const data = await response.json();
      if (data.success) {
        setApplicants(data.applications || []);
      }
    } catch (error) {
      console.error('Error fetching applicants:', error);
    }
  };

  const handleViewApplicants = (event: any) => {
    setSelectedEvent(event);
    fetchApplicants(event._id);
  };

  const handleDelete = async (eventId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/delete/${eventId}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  if (selectedEvent) {
    return (
      <div className="h-full bg-gray-50 flex flex-col">
        <AndroidHeader title={`Applicants: ${selectedEvent.title}`} onBack={() => setSelectedEvent(null)} />
        <div className="p-4 space-y-4 overflow-y-auto pb-10">
          <div className="max-w-4xl mx-auto space-y-4">
            {applicants.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No applicants yet</div>
            ) : (
              applicants.map(app => (
                <MaterialCard key={app._id} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-800">{app.volunteer_name}</p>
                    <p className="text-xs text-gray-500">{app.volunteer_email}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                    app.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                    app.status === 'accepted' ? 'bg-green-100 text-green-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {app.status.toUpperCase()}
                  </span>
                </MaterialCard>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <AndroidHeader title="Events" onBack={onBack} />
      <div className="p-4 space-y-4 overflow-y-auto pb-10">
        <div className="max-w-4xl mx-auto space-y-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : events.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No events scheduled</div>
          ) : (
            events.map(event => (
              <MaterialCard key={event._id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <h5 className="font-bold text-gray-800">{event.title}</h5>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                      event.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {event.status === 'completed' ? 'Completed' : 'Upcoming'}
                    </span>
                    <button onClick={() => handleDelete(event._id)} className="p-1 hover:bg-red-50 rounded text-red-500">
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                  {event.location && <span className="flex items-center gap-1"><Filter size={12} /> {event.location}</span>}
                </div>
                {event.description && <p className="text-xs text-gray-500">{event.description}</p>}
                <button
                  onClick={() => handleViewApplicants(event)}
                  className="w-full py-2 bg-blue-500 text-white text-sm font-bold rounded-lg mt-2 flex items-center justify-center gap-2"
                >
                  <Users size={16} /> View Applicants
                </button>
              </MaterialCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const AdminVolunteersScreen = ({ onBack, userData }: { onBack: () => void; userData: any }) => {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/ngo/${userData._id}`);
      const data = await response.json();
      if (data.success) {
        const accepted = data.applications?.filter((app: any) => app.status === 'accepted') || [];
        setVolunteers(accepted);
      }
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <AndroidHeader title="Volunteers" onBack={onBack} />
      <div className="p-4 space-y-4 overflow-y-auto pb-10">
        <div className="max-w-4xl mx-auto space-y-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : volunteers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No accepted volunteers yet</div>
          ) : (
            volunteers.map(app => (
              <MaterialCard key={app._id} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <User size={24} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{app.volunteer_name}</p>
                  <p className="text-xs text-gray-500">{app.volunteer_email}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Event: {app.event_title}</p>
                </div>
                <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-1 rounded">ACCEPTED</span>
              </MaterialCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const AdminDonationsScreen = ({ onBack, userData }: { onBack: () => void; userData: any }) => {
  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <AndroidHeader title="Donations" onBack={onBack} />
      <div className="p-4 space-y-4 overflow-y-auto pb-10">
        <div className="text-center py-8 text-gray-500">Donations feature coming soon</div>
      </div>
    </div>
  );
};

const AdminAnalyticsScreen = ({ onBack, userData }: { onBack: () => void; userData: any }) => {
  const [stats, setStats] = useState({ totalEvents: 0, completedEvents: 0, volunteers: 0, applications: 0, pending: 0, rejected: 0 });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const eventsRes = await fetch(`${API_BASE_URL}/api/events/all?ngo_id=${userData._id}`);
      const eventsData = await eventsRes.json();
      const totalEvents = eventsData.success ? (eventsData.events?.length || 0) : 0;
      const completedEvents = eventsData.success ? (eventsData.events?.filter((e: any) => e.status === 'completed').length || 0) : 0;

      const appsRes = await fetch(`${API_BASE_URL}/api/applications/ngo/${userData._id}`);
      const appsData = await appsRes.json();
      const volunteers = appsData.success ? (appsData.applications?.filter((a: any) => a.status === 'accepted').length || 0) : 0;
      const applications = appsData.success ? (appsData.applications?.length || 0) : 0;
      const pending = appsData.success ? (appsData.applications?.filter((a: any) => a.status === 'pending').length || 0) : 0;
      const rejected = appsData.success ? (appsData.applications?.filter((a: any) => a.status === 'rejected').length || 0) : 0;

      setStats({ totalEvents, completedEvents, volunteers, applications, pending, rejected });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const completionRate = stats.totalEvents > 0 ? Math.round((stats.completedEvents / stats.totalEvents) * 100) : 0;
  const acceptanceRate = stats.applications > 0 ? Math.round((stats.volunteers / stats.applications) * 100) : 0;

  const pieData = [
    { name: 'Accepted', value: stats.volunteers, color: '#10B981' },
    { name: 'Pending', value: stats.pending, color: '#F59E0B' },
    { name: 'Rejected', value: stats.rejected, color: '#EF4444' }
  ];

  const barData = [
    { name: 'Completed', value: stats.completedEvents, color: '#10B981' },
    { name: 'Upcoming', value: stats.totalEvents - stats.completedEvents, color: '#3B82F6' }
  ];

  return (
    <div className="h-full bg-gradient-to-br from-orange-50 via-white to-blue-50 flex flex-col">
      <AndroidHeader title="Analytics Dashboard" onBack={onBack} />
      <div className="p-4 space-y-5 overflow-y-auto pb-10">
        <div className="max-w-4xl mx-auto space-y-5">
        {/* Hero Stats */}
        <div className="bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-2xl p-6 text-white shadow-lg">
          <h3 className="text-sm font-medium opacity-90 mb-3">Organization Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-3xl font-bold">{stats.totalEvents}</p>
              <p className="text-xs opacity-80 mt-1">Total Events</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{stats.volunteers}</p>
              <p className="text-xs opacity-80 mt-1">Active Volunteers</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 size={20} className="text-green-600" />
              </div>
              <span className="text-xs font-bold text-green-600">{completionRate}%</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.completedEvents}</p>
            <p className="text-xs text-gray-500 mt-1">Completed Events</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar size={20} className="text-blue-600" />
              </div>
              <span className="text-xs font-bold text-blue-600">{stats.totalEvents - stats.completedEvents}</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.totalEvents - stats.completedEvents}</p>
            <p className="text-xs text-gray-500 mt-1">Upcoming Events</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <ClipboardList size={20} className="text-purple-600" />
              </div>
              <span className="text-xs font-bold text-purple-600">{acceptanceRate}%</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.applications}</p>
            <p className="text-xs text-gray-500 mt-1">Total Applications</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-[#F97316]" />
              </div>
              <span className="text-xs font-bold text-[#F97316]">{stats.pending}</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
            <p className="text-xs text-gray-500 mt-1">Pending Review</p>
          </div>
        </div>

        {/* Pie Chart - Application Status */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <BarChart3 size={18} className="text-[#F97316]" />
            Application Distribution
          </h4>
          {stats.applications > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-gray-400 text-sm">No data available</div>
          )}
          <div className="flex justify-center gap-4 mt-3">
            {pieData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-600">{item.name} ({item.value})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart - Events Status */}
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Calendar size={18} className="text-[#F97316]" />
            Events Overview
          </h4>
          {stats.totalEvents > 0 ? (
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {barData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[180px] flex items-center justify-center text-gray-400 text-sm">No events scheduled</div>
          )}
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-md">
            <p className="text-xs opacity-90 mb-1">Completion Rate</p>
            <p className="text-3xl font-bold">{completionRate}%</p>
            <div className="mt-3 bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: `${completionRate}%` }} />
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-md">
            <p className="text-xs opacity-90 mb-1">Acceptance Rate</p>
            <p className="text-3xl font-bold">{acceptanceRate}%</p>
            <div className="mt-3 bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: `${acceptanceRate}%` }} />
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsScreen = ({ onBack, userData }: { onBack: () => void; userData: any }) => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/ngo/${userData._id}`);
      const data = await response.json();
      if (data.success) {
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appId: string, status: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/${appId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await response.json();
      if (data.success) {
        fetchApplications();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <AndroidHeader title="Notifications" onBack={onBack} />
      <div className="p-4 space-y-4 overflow-y-auto pb-10">
        <div className="max-w-4xl mx-auto space-y-4">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : applications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No applications yet</div>
          ) : (
            applications.map(app => (
              <MaterialCard key={app._id} className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800">{app.volunteer_name}</h3>
                    <p className="text-sm text-gray-600">{app.volunteer_email}</p>
                    <p className="text-xs text-gray-500 mt-1">Applied for: {app.event_title}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${
                    app.status === 'pending' ? 'bg-orange-100 text-orange-600' :
                    app.status === 'accepted' ? 'bg-green-100 text-green-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {app.status.toUpperCase()}
                  </span>
                </div>
                {app.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate(app._id, 'accepted')}
                      className="flex-1 py-2 bg-green-500 text-white text-sm font-bold rounded-lg"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(app._id, 'rejected')}
                      className="flex-1 py-2 bg-red-500 text-white text-sm font-bold rounded-lg"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </MaterialCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const NGODetailsScreen = ({ onBack, navigate, setSelectedNGO }: { onBack: () => void; navigate: (s: Screen) => void; setSelectedNGO: (ngo: any) => void }) => {
  const [ngos, setNgos] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/ngos/all`);
        const data = await response.json();
        if (data.success) {
          setNgos(data.ngos || []);
        }
      } catch (error) {
        console.error('Error fetching NGOs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNGOs();
  }, []);

  const handleViewDetails = (ngo: any) => {
    setSelectedNGO(ngo);
    navigate('ngo_profile');
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <AndroidHeader title="Registered NGOs" onBack={onBack} />
      <div className="p-4 space-y-4 overflow-y-auto pb-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-sm text-gray-500 px-2">Browse registered organizations</p>
          
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading NGOs...</div>
          ) : ngos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No NGOs registered yet</div>
          ) : (
            ngos.map(ngo => (
              <MaterialCard key={ngo._id} className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <HandHeart size={28} className="text-[#F97316]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{ngo.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{ngo.description || 'No description available'}</p>
                  </div>
                </div>
                
                {(ngo.address || ngo.registrationNumber) && (
                  <div className="space-y-1 pt-2">
                    {ngo.address && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-gray-400">📍</span>
                        <span>{ngo.address}</span>
                      </div>
                    )}
                    {ngo.registrationNumber && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-gray-400">🆔</span>
                        <span>Reg: {ngo.registrationNumber}</span>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 border-t border-gray-100">
                  <span className="text-gray-400">📧</span>
                  <span>{ngo.email}</span>
                </div>
                
                {ngo.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-gray-400">📞</span>
                    <span>{ngo.phone}</span>
                  </div>
                )}
                
                <button 
                  onClick={() => handleViewDetails(ngo)}
                  className="w-full py-3 bg-[#F97316] text-white font-bold rounded-lg hover:bg-[#EA580C] transition-colors flex items-center justify-center gap-2"
                >
                  View Details <ArrowRight size={18} />
                </button>
              </MaterialCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const ParticipationHistoryScreen = ({ onBack, userData }: { onBack: () => void; userData: any }) => {
  const [history, setHistory] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/volunteer/${userData._id}`);
      const data = await response.json();
      if (data.success) {
        const accepted = data.applications?.filter((app: any) => app.status === 'accepted') || [];
        setHistory(accepted);
      }
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  const isEventCompleted = (eventDate: string) => {
    if (!eventDate) return false;
    return new Date(eventDate) < new Date();
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <AndroidHeader title="Participation History" onBack={onBack} />
      <div className="p-4 space-y-4 overflow-y-auto pb-10">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-sm text-gray-500 px-2">Your volunteering journey</p>
          
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading history...</div>
          ) : history.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No participation history yet</div>
          ) : (
            history.map(app => (
              <div key={app._id} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                <CheckCircle2 size={20} className="text-orange-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">{app.event_title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{app.ngo_name || 'Organization Event'}</p>
                  <p className="text-[10px] text-gray-400 mt-1">Accepted</p>
                </div>
                <span className="text-xs font-bold text-gray-400">{isEventCompleted(app.event_date) ? 'Completed' : 'Upcoming'}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const NGOProfileScreen = ({ onBack, selectedNGO, userData }: { onBack: () => void; selectedNGO: any; userData?: any }) => {
  const [showDonateModal, setShowDonateModal] = React.useState(false);
  const [events, setEvents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [userApplications, setUserApplications] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchEvents();
    if (userData) fetchUserApplications();
  }, []);

  const fetchUserApplications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/ngo/${selectedNGO._id}`);
      const data = await response.json();
      if (data.success) {
        const userApps = data.applications?.filter((app: any) => app.volunteer_id === userData._id) || [];
        setUserApplications(userApps);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const getEventApplicationStatus = (eventId: string) => {
    const app = userApplications.find(a => a.event_id === eventId);
    return app ? app.status : null;
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/all?ngo_id=${selectedNGO._id}`);
      const data = await response.json();
      if (data.success) {
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (eventId: string, eventTitle: string) => {
    if (!userData) {
      return;
    }

    if (getEventApplicationStatus(eventId)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          volunteer_id: userData._id,
          volunteer_name: userData.name,
          volunteer_email: userData.email,
          event_id: eventId,
          event_title: eventTitle,
          ngo_id: selectedNGO._id
        })
      });
      const data = await response.json();
      if (data.success) {
        fetchUserApplications();
      }
    } catch (error) {
      console.error('Error applying:', error);
    }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <AndroidHeader title="Organization Details" onBack={onBack} />
      
      {showDonateModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-sm text-center"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Donate via UPI</h3>
            
            {selectedNGO?.paymentDetails?.qrCode ? (
              <div className="w-48 h-48 mx-auto mb-4">
                <img 
                  src={selectedNGO.paymentDetails.qrCode} 
                  alt="Payment QR Code" 
                  className="w-full h-full object-contain rounded-xl border-2 border-gray-200"
                />
              </div>
            ) : (
              <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-4 border-2 border-gray-200">
                <p className="text-sm text-gray-500">No QR code available</p>
              </div>
            )}
            
            <div className="bg-orange-50 p-4 rounded-lg mb-4">
              <p className="text-xs text-gray-500 uppercase mb-1">UPI ID</p>
              <p className="text-lg font-bold text-[#F97316]">
                {selectedNGO?.paymentDetails?.upiId || 'Not available'}
              </p>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">Scan QR code or use UPI ID to donate</p>
            
            <button
              onClick={() => setShowDonateModal(false)}
              className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
      
      <div className="p-4 space-y-6 overflow-y-auto pb-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* NGO Header */}
          <MaterialCard className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <HandHeart size={32} className="text-[#F97316]" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">{selectedNGO?.name || 'Organization'}</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedNGO?.description || 'No description available'}</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowDonateModal(true)}
              className="w-full py-3 bg-[#F97316] text-white font-bold rounded-lg flex items-center justify-center gap-2"
            >
              <Heart size={20} /> Donate Now
            </button>
          </MaterialCard>

          {/* Events & Camps */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 px-2">
              <Calendar size={18} className="text-[#F97316]" />
              Events & Camps
            </h3>
            
            {loading ? (
              <div className="text-center py-4 text-gray-500">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="text-center py-4 text-gray-500">No events scheduled</div>
            ) : (
              events.map(event => (
                <MaterialCard key={event._id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-800">{event.title}</h4>
                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-100 text-blue-600">
                      {event.status || 'Upcoming'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {event.date}
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <Filter size={14} /> {event.location}
                      </span>
                    )}
                  </div>
                  {event.description && <p className="text-xs text-gray-500">{event.description}</p>}
                  {userData && (() => {
                    const status = getEventApplicationStatus(event._id);
                    if (status === 'pending') {
                      return (
                        <button disabled className="w-full py-2 bg-orange-100 text-orange-600 text-sm font-bold rounded-lg mt-2 cursor-not-allowed">
                          Application Pending
                        </button>
                      );
                    } else if (status === 'accepted') {
                      return (
                        <button disabled className="w-full py-2 bg-green-100 text-green-600 text-sm font-bold rounded-lg mt-2 cursor-not-allowed">
                          Application Accepted
                        </button>
                      );
                    } else if (status === 'rejected') {
                      return (
                        <button disabled className="w-full py-2 bg-red-100 text-red-600 text-sm font-bold rounded-lg mt-2 cursor-not-allowed">
                          Application Rejected
                        </button>
                      );
                    } else {
                      return (
                        <button
                          onClick={() => handleApply(event._id, event.title)}
                          className="w-full py-2 bg-[#F97316] text-white text-sm font-bold rounded-lg mt-2"
                        >
                          Apply as Volunteer
                        </button>
                      );
                    }
                  })()}
                </MaterialCard>
              ))
            )}
          </div>

          {/* Contact Info */}
          <MaterialCard className="space-y-3">
            <h3 className="font-bold text-gray-800">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-gray-400">📧</span>
                <span>{selectedNGO?.email || 'N/A'}</span>
              </div>
              {selectedNGO?.phone && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-gray-400">📞</span>
                  <span>{selectedNGO.phone}</span>
                </div>
              )}
              {selectedNGO?.address && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-gray-400">📍</span>
                  <span>{selectedNGO.address}</span>
                </div>
              )}
            </div>
          </MaterialCard>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [role, setRole] = useState<Role>("admin");
  const [userData, setUserData] = useState<any>(null);
  const [assignments, setAssignments] = useState<any[]>([]);
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
      case "admin_analytics": return <AdminAnalyticsScreen onBack={() => navigate("admin_home")} userData={userData} />;
      case "volunteer_home": return <VolunteerDashboard navigate={navigate} onLogout={handleLogout} userData={userData} />;
      case "ngo_details": return <NGODetailsScreen onBack={() => navigate("volunteer_home")} navigate={navigate} setSelectedNGO={setSelectedNGO} />;
      case "ngo_profile": return <NGOProfileScreen onBack={() => navigate("ngo_details")} selectedNGO={selectedNGO} userData={userData} />;
      case "participation_history": return <ParticipationHistoryScreen onBack={() => navigate("volunteer_home")} userData={userData} />;
      default: return <LoginScreen onLogin={handleLogin} onRegister={() => navigate("register")} onNGORegister={() => navigate("ngo_register")} />;
    }
  };

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

        {/* Bottom Navigation (Conditional) */}
        {(screen !== "splash" && screen !== "login" && screen !== "register" && screen !== "ngo_register") && (
          <div className="bg-white border-t border-gray-100 px-6 py-4 flex justify-around items-center">
            {role === "admin" ? (
              <>
                <button 
                  onClick={() => navigate("admin_home")}
                  className={`p-2 rounded-full transition-colors ${screen === "admin_home" ? "text-[#F97316] bg-orange-50" : "text-gray-400"}`}
                >
                  <Settings size={22} />
                </button>
                <button 
                  onClick={() => navigate("admin_events")}
                  className={`p-2 rounded-full transition-colors ${screen === "admin_events" ? "text-[#F97316] bg-orange-50" : "text-gray-400"}`}
                >
                  <Calendar size={22} />
                </button>
                <button 
                  onClick={() => navigate("admin_volunteers")}
                  className={`p-2 rounded-full transition-colors ${screen === "admin_volunteers" ? "text-[#F97316] bg-orange-50" : "text-gray-400"}`}
                >
                  <Users size={22} />
                </button>
                <button 
                  onClick={() => navigate("admin_analytics")}
                  className={`p-2 rounded-full transition-colors ${screen === "admin_analytics" ? "text-[#F97316] bg-orange-50" : "text-gray-400"}`}
                >
                  <BarChart3 size={22} />
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate("volunteer_home")}
                  className={`p-2 rounded-full transition-colors ${screen === "volunteer_home" ? "text-[#F97316] bg-orange-50" : "text-gray-400"}`}
                >
                  <ClipboardList size={22} />
                </button>
                <button 
                  onClick={() => navigate("ngo_details")}
                  className={`p-2 rounded-full transition-colors ${["ngo_details", "ngo_profile"].includes(screen) ? "text-[#F97316] bg-orange-50" : "text-gray-400"}`}
                >
                  <HandHeart size={22} />
                </button>
                <button 
                  onClick={() => navigate("participation_history")}
                  className={`p-2 rounded-full transition-colors ${screen === "participation_history" ? "text-[#F97316] bg-orange-50" : "text-gray-400"}`}
                >
                  <History size={22} />
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-full text-gray-400"
                >
                  <LogOut size={22} />
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
