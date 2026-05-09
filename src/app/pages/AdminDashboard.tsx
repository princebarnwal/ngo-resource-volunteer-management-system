import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Bell, User, Calendar, Filter, Users, Package, QrCode, Upload, X, HandHeart, LogOut } from "lucide-react";
import { API_BASE_URL } from "../../config";
import { Screen } from "../types";
import AndroidHeader from "../components/shared/AndroidHeader";
import MaterialCard from "../components/shared/MaterialCard";

const AdminDashboard = ({ navigate, assignments, userData, onLogout }: { navigate: (s: Screen) => void; assignments: any[]; userData: any; onLogout: () => void }) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [eventForm, setEventForm] = useState({ title: "", date: "", location: "", description: "" });
  const [paymentForm, setPaymentForm] = useState({ upiId: "", qrCode: null as File | null });
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
      const volResponse = await fetch(`${API_BASE_URL}/api/applications/ngo/${userData._id}`);
      const volData = await volResponse.json();
      const volunteersCount = volData.success ? (volData.applications?.filter((app: any) => app.status === "accepted").length || 0) : 0;
      const eventsResponse = await fetch(`${API_BASE_URL}/api/events/all?ngo_id=${userData._id}`);
      const eventsData = await eventsResponse.json();
      const eventsCount = eventsData.success ? (eventsData.events?.length || 0) : 0;
      setStats({ volunteers: volunteersCount, donations: 0, events: eventsCount });
    } catch (error) { console.error("Error fetching stats:", error); }
  };

  const fetchAcceptedVolunteers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/ngo/${userData._id}`);
      const data = await response.json();
      if (data.success) setAcceptedVolunteers(data.applications?.filter((app: any) => app.status === "accepted") || []);
    } catch (error) { console.error("Error fetching volunteers:", error); }
  };

  const fetchNotificationCount = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/ngo/${userData._id}`);
      const data = await response.json();
      if (data.success) setNotificationCount(data.applications?.filter((app: any) => app.status === "pending").length || 0);
    } catch (error) { console.error("Error fetching notifications:", error); }
  };

  const fetchScheduledEvents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/all?ngo_id=${userData._id}`);
      const data = await response.json();
      if (data.success) setScheduledEvents(data.events?.filter((event: any) => event.status !== "completed") || []);
    } catch (error) { console.error("Error fetching events:", error); }
  };

  const fetchCompletedEvents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/all?ngo_id=${userData._id}`);
      const data = await response.json();
      if (data.success) setCompletedEvents(data.events?.filter((event: any) => event.status === "completed") || []);
    } catch (error) { console.error("Error fetching completed events:", error); }
  };

  const handleScheduleEvent = async () => {
    if (eventForm.title && eventForm.date) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/events/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...eventForm, ngo_id: userData._id }),
        });
        const data = await response.json();
        if (data.success) {
          fetchScheduledEvents(); fetchCompletedEvents();
          setShowScheduleModal(false);
          setEventForm({ title: "", date: "", location: "", description: "" });
        }
      } catch (error) { console.error("Error creating event:", error); }
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/delete/${eventId}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) { fetchScheduledEvents(); fetchCompletedEvents(); }
    } catch (error) { console.error("Error deleting event:", error); }
  };

  const handlePaymentUpload = async () => {
    if (!paymentForm.upiId) { alert("Please enter UPI ID"); return; }
    try {
      let qrCodeBase64 = "";
      if (paymentForm.qrCode) {
        const reader = new FileReader();
        qrCodeBase64 = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(paymentForm.qrCode!);
        });
      }
      const response = await fetch(`${API_BASE_URL}/api/ngos/${userData._id}/payment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ upiId: paymentForm.upiId, qrCode: qrCodeBase64 }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Payment details saved successfully!");
        setShowPaymentModal(false);
        setPaymentForm({ upiId: "", qrCode: null });
      }
    } catch (error) { alert("Failed to save payment details"); }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <AndroidHeader
        title={userData?.name || "Home"}
        rightAction={
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("admin_notifications")} className="p-1 hover:bg-white/10 rounded-full transition-colors relative">
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
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-sm max-h-[90%] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Organization Profile</h3>
              <button onClick={() => { setShowProfile(false); setIsEditingProfile(false); }} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} className="text-gray-500" /></button>
            </div>
            {!isEditingProfile ? (
              <>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-3"><HandHeart size={40} className="text-[#F97316]" /></div>
                  <h4 className="text-lg font-bold text-gray-800">{userData?.name || "Organization"}</h4>
                  <p className="text-sm text-gray-500">{userData?.email || "No email"}</p>
                </div>
                <div className="space-y-3 mb-6">
                  {userData?.phone && <div className="bg-gray-50 p-4 rounded-lg"><p className="text-xs text-gray-500 uppercase mb-1">Phone</p><p className="text-sm font-medium text-gray-800">{userData.phone}</p></div>}
                  {userData?.address && <div className="bg-gray-50 p-4 rounded-lg"><p className="text-xs text-gray-500 uppercase mb-1">Address</p><p className="text-sm font-medium text-gray-800">{userData.address}</p></div>}
                  {userData?.registrationNumber && <div className="bg-gray-50 p-4 rounded-lg"><p className="text-xs text-gray-500 uppercase mb-1">Registration Number</p><p className="text-sm font-medium text-gray-800">{userData.registrationNumber}</p></div>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setIsEditingProfile(true); setEditForm({ name: userData?.name || "", email: userData?.email || "", phone: userData?.phone || "", address: userData?.address || "" }); }} className="flex-1 py-3 bg-[#F97316] text-white font-bold rounded-lg hover:bg-[#EA580C] transition-colors">Edit Profile</button>
                  <button onClick={() => { setShowProfile(false); onLogout(); }} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-colors"><LogOut size={18} /> Sign Out</button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {[["Organization Name", "name"], ["Email", "email"], ["Phone", "phone"], ["Address", "address"]].map(([label, key]) => (
                    <div key={key}>
                      <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">{label}</label>
                      <input value={(editForm as any)[key]} onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" />
                    </div>
                  ))}
                </div>
                <button onClick={async () => { try { const res = await fetch(`${API_BASE_URL}/api/ngos/${userData._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editForm) }); const data = await res.json(); if (data.success) { Object.assign(userData, editForm); setIsEditingProfile(false); } } catch (e) { console.error(e); } }} className="w-full py-3 bg-green-500 text-white font-bold rounded-lg mb-2 hover:bg-green-600 transition-colors">Save Changes</button>
                <button onClick={() => setIsEditingProfile(false)} className="w-full py-3 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Schedule Event Modal */}
      {showScheduleModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-sm max-h-[90%] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Schedule Event</h3>
              <button onClick={() => setShowScheduleModal(false)} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Event Name", key: "title", placeholder: "Health Camp 2026", type: "text" },
                { label: "Date", key: "date", placeholder: "", type: "date" },
                { label: "Location", key: "location", placeholder: "Community Center", type: "text" },
              ].map(({ label, key, placeholder, type }) => (
                <div key={key}>
                  <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">{label}</label>
                  <input type={type} placeholder={placeholder} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" value={(eventForm as any)[key]} onChange={(e) => setEventForm({ ...eventForm, [key]: e.target.value })} />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">Description</label>
                <textarea placeholder="Event details..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-24" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} />
              </div>
              <button onClick={handleScheduleEvent} className="w-full py-3 bg-[#F97316] text-white font-bold rounded-lg">Schedule Event</button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Payment Settings Modal */}
      {showPaymentModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Payment Settings</h3>
              <button onClick={() => setShowPaymentModal(false)} className="p-1 hover:bg-gray-100 rounded-full"><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase block mb-1">UPI ID</label>
                <input placeholder="yourorg@upi" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg" value={paymentForm.upiId} onChange={(e) => setPaymentForm({ ...paymentForm, upiId: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase block mb-2">QR Code</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input type="file" accept="image/*" className="hidden" id="qr-upload" onChange={(e) => setPaymentForm({ ...paymentForm, qrCode: e.target.files?.[0] || null })} />
                  <label htmlFor="qr-upload" className="cursor-pointer">
                    <QrCode size={40} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600">{paymentForm.qrCode ? paymentForm.qrCode.name : "Click to upload QR code"}</p>
                  </label>
                </div>
              </div>
              <button onClick={handlePaymentUpload} className="w-full py-3 bg-[#F97316] text-white font-bold rounded-lg flex items-center justify-center gap-2">
                <Upload size={18} /> Save Payment Details
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="p-4 space-y-6 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setShowScheduleModal(true)} className="bg-white p-4 rounded-xl border border-gray-100 hover:border-[#F97316] transition-colors flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"><Calendar size={20} className="text-[#F97316]" /></div>
              <div className="text-left"><p className="text-sm font-bold text-gray-800">Schedule</p><p className="text-[10px] text-gray-500">New Event</p></div>
            </button>
            <button onClick={() => setShowPaymentModal(true)} className="bg-white p-4 rounded-xl border border-gray-100 hover:border-[#F97316] transition-colors flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"><QrCode size={20} className="text-[#1976D2]" /></div>
              <div className="text-left"><p className="text-sm font-bold text-gray-800">Payment</p><p className="text-[10px] text-gray-500">QR & UPI</p></div>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => navigate("admin_volunteers")} className="w-full">
              <MaterialCard className="text-center p-2 flex flex-col items-center hover:border-[#F97316] transition-colors cursor-pointer">
                <div className="text-[#F97316] bg-orange-50 p-2 rounded-lg mb-1"><Users size={20} /></div>
                <span className="text-xl font-bold">{stats.volunteers}</span>
                <span className="text-[10px] text-gray-500 uppercase">Volunteers</span>
              </MaterialCard>
            </button>
            <button onClick={() => navigate("admin_donations")} className="w-full">
              <MaterialCard className="text-center p-2 flex flex-col items-center hover:border-[#F97316] transition-colors cursor-pointer">
                <div className="text-[#1976D2] bg-blue-50 p-2 rounded-lg mb-1"><Package size={20} /></div>
                <span className="text-xl font-bold">{stats.donations}</span>
                <span className="text-[10px] text-gray-500 uppercase">Donations</span>
              </MaterialCard>
            </button>
            <button onClick={() => navigate("admin_events")} className="w-full">
              <MaterialCard className="text-center p-2 flex flex-col items-center hover:border-[#F97316] transition-colors cursor-pointer">
                <div className="text-[#FFA000] bg-orange-50 p-2 rounded-lg mb-1"><Calendar size={20} /></div>
                <span className="text-xl font-bold">{stats.events}</span>
                <span className="text-[10px] text-gray-500 uppercase">Events</span>
              </MaterialCard>
            </button>
          </div>

          {scheduledEvents.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <h4 className="font-bold text-gray-800">Scheduled Events</h4>
                <button onClick={() => navigate("admin_events")} className="text-xs text-[#F97316] font-medium">See All</button>
              </div>
              <div className="space-y-3">
                {scheduledEvents.slice(0, 2).map(event => (
                  <MaterialCard key={event._id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-gray-800">{event.title}</h5>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded">{event.status || "Upcoming"}</span>
                        <button onClick={() => handleDeleteEvent(event._id)} className="p-1 hover:bg-red-50 rounded text-red-500"><X size={16} /></button>
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

          {completedEvents.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <h4 className="font-bold text-gray-800">Completed Events</h4>
                <button onClick={() => navigate("admin_events")} className="text-xs text-[#F97316] font-medium">See All</button>
              </div>
              <div className="space-y-3">
                {completedEvents.slice(0, 2).map(event => (
                  <MaterialCard key={event._id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-gray-800">{event.title}</h5>
                      <span className="text-[10px] font-bold bg-green-100 text-green-600 px-2 py-1 rounded">Completed</span>
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

          {acceptedVolunteers.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <h4 className="font-bold text-gray-800">Accepted Volunteers</h4>
                <button onClick={() => navigate("admin_volunteers")} className="text-xs text-[#F97316] font-medium">See All</button>
              </div>
              <div className="space-y-3">
                {acceptedVolunteers.slice(0, 3).map(app => (
                  <MaterialCard key={app._id} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><User size={20} className="text-green-600" /></div>
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
