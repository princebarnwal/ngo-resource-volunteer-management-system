import React, { useState, useEffect } from "react";
import { BarChart3, CheckCircle2, Calendar, ClipboardList, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { API_BASE_URL } from "../../config";
import AndroidHeader from "../components/shared/AndroidHeader";

const AdminAnalyticsScreen = ({ onBack, userData }: { onBack: () => void; userData: any }) => {
  const [stats, setStats] = useState({ totalEvents: 0, completedEvents: 0, volunteers: 0, applications: 0, pending: 0, rejected: 0 });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const eventsRes = await fetch(`${API_BASE_URL}/api/events/all?ngo_id=${userData._id}`);
        const eventsData = await eventsRes.json();
        const totalEvents = eventsData.success ? (eventsData.events?.length || 0) : 0;
        const completedEvents = eventsData.success ? (eventsData.events?.filter((e: any) => e.status === "completed").length || 0) : 0;

        const appsRes = await fetch(`${API_BASE_URL}/api/applications/ngo/${userData._id}`);
        const appsData = await appsRes.json();
        const volunteers = appsData.success ? (appsData.applications?.filter((a: any) => a.status === "accepted").length || 0) : 0;
        const applications = appsData.success ? (appsData.applications?.length || 0) : 0;
        const pending = appsData.success ? (appsData.applications?.filter((a: any) => a.status === "pending").length || 0) : 0;
        const rejected = appsData.success ? (appsData.applications?.filter((a: any) => a.status === "rejected").length || 0) : 0;

        setStats({ totalEvents, completedEvents, volunteers, applications, pending, rejected });
      } catch (error) { console.error("Error fetching analytics:", error); }
    };
    fetchAnalytics();
  }, []);

  const completionRate = stats.totalEvents > 0 ? Math.round((stats.completedEvents / stats.totalEvents) * 100) : 0;
  const acceptanceRate = stats.applications > 0 ? Math.round((stats.volunteers / stats.applications) * 100) : 0;

  const pieData = [
    { name: "Accepted", value: stats.volunteers, color: "#10B981" },
    { name: "Pending", value: stats.pending, color: "#F59E0B" },
    { name: "Rejected", value: stats.rejected, color: "#EF4444" },
  ];

  const barData = [
    { name: "Completed", value: stats.completedEvents, color: "#10B981" },
    { name: "Upcoming", value: stats.totalEvents - stats.completedEvents, color: "#3B82F6" },
  ];

  return (
    <div className="h-full bg-gradient-to-br from-orange-50 via-white to-blue-50 flex flex-col">
      <AndroidHeader title="Analytics Dashboard" onBack={onBack} />
      <div className="p-4 space-y-5 overflow-y-auto pb-10">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-2xl p-6 text-white shadow-lg">
            <h3 className="text-sm font-medium opacity-90 mb-3">Organization Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-3xl font-bold">{stats.totalEvents}</p><p className="text-xs opacity-80 mt-1">Total Events</p></div>
              <div><p className="text-3xl font-bold">{stats.volunteers}</p><p className="text-xs opacity-80 mt-1">Active Volunteers</p></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <CheckCircle2 size={20} className="text-green-600" />, bg: "bg-green-100", value: stats.completedEvents, label: "Completed Events", rate: completionRate, rateColor: "text-green-600" },
              { icon: <Calendar size={20} className="text-blue-600" />, bg: "bg-blue-100", value: stats.totalEvents - stats.completedEvents, label: "Upcoming Events", rate: stats.totalEvents - stats.completedEvents, rateColor: "text-blue-600" },
              { icon: <ClipboardList size={20} className="text-purple-600" />, bg: "bg-purple-100", value: stats.applications, label: "Total Applications", rate: acceptanceRate, rateColor: "text-purple-600" },
              { icon: <Users size={20} className="text-[#F97316]" />, bg: "bg-orange-100", value: stats.pending, label: "Pending Review", rate: stats.pending, rateColor: "text-[#F97316]" },
            ].map(({ icon, bg, value, label, rate, rateColor }, i) => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>{icon}</div>
                  <span className={`text-xs font-bold ${rateColor}`}>{rate}{i === 0 || i === 2 ? "%" : ""}</span>
                </div>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><BarChart3 size={18} className="text-[#F97316]" /> Application Distribution</h4>
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

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Calendar size={18} className="text-[#F97316]" /> Events Overview</h4>
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

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white shadow-md">
              <p className="text-xs opacity-90 mb-1">Completion Rate</p>
              <p className="text-3xl font-bold">{completionRate}%</p>
              <div className="mt-3 bg-white/20 rounded-full h-2"><div className="bg-white h-2 rounded-full" style={{ width: `${completionRate}%` }} /></div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white shadow-md">
              <p className="text-xs opacity-90 mb-1">Acceptance Rate</p>
              <p className="text-3xl font-bold">{acceptanceRate}%</p>
              <div className="mt-3 bg-white/20 rounded-full h-2"><div className="bg-white h-2 rounded-full" style={{ width: `${acceptanceRate}%` }} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsScreen;
