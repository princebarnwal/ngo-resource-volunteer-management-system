import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { HandHeart, Heart, Calendar, Filter } from "lucide-react";
import { API_BASE_URL } from "../../config";
import AndroidHeader from "../components/shared/AndroidHeader";
import MaterialCard from "../components/shared/MaterialCard";

const NGOProfileScreen = ({ onBack, selectedNGO, userData }: { onBack: () => void; selectedNGO: any; userData?: any }) => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userApplications, setUserApplications] = useState<any[]>([]);

  useEffect(() => {
    fetchEvents();
    if (userData) fetchUserApplications();
  }, []);

  const fetchUserApplications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/ngo/${selectedNGO._id}`);
      const data = await response.json();
      if (data.success) setUserApplications(data.applications?.filter((app: any) => app.volunteer_id === userData._id) || []);
    } catch (error) { console.error("Error fetching applications:", error); }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/all?ngo_id=${selectedNGO._id}`);
      const data = await response.json();
      if (data.success) setEvents(data.events || []);
    } catch (error) { console.error("Error fetching events:", error); }
    finally { setLoading(false); }
  };

  const getEventApplicationStatus = (eventId: string) => {
    const app = userApplications.find(a => a.event_id === eventId);
    return app ? app.status : null;
  };

  const handleApply = async (eventId: string, eventTitle: string) => {
    if (!userData || getEventApplicationStatus(eventId)) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ volunteer_id: userData._id, volunteer_name: userData.name, volunteer_email: userData.email, event_id: eventId, event_title: eventTitle, ngo_id: selectedNGO._id }),
      });
      const data = await response.json();
      if (data.success) fetchUserApplications();
    } catch (error) { console.error("Error applying:", error); }
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <AndroidHeader title="Organization Details" onBack={onBack} />

      {showDonateModal && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl p-6 w-full max-w-sm text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Donate via UPI</h3>
            {selectedNGO?.paymentDetails?.qrCode ? (
              <div className="w-48 h-48 mx-auto mb-4"><img src={selectedNGO.paymentDetails.qrCode} alt="Payment QR Code" className="w-full h-full object-contain rounded-xl border-2 border-gray-200" /></div>
            ) : (
              <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-4 border-2 border-gray-200"><p className="text-sm text-gray-500">No QR code available</p></div>
            )}
            <div className="bg-orange-50 p-4 rounded-lg mb-4">
              <p className="text-xs text-gray-500 uppercase mb-1">UPI ID</p>
              <p className="text-lg font-bold text-[#F97316]">{selectedNGO?.paymentDetails?.upiId || "Not available"}</p>
            </div>
            <p className="text-sm text-gray-600 mb-4">Scan QR code or use UPI ID to donate</p>
            <button onClick={() => setShowDonateModal(false)} className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium">Close</button>
          </motion.div>
        </div>
      )}

      <div className="p-4 space-y-6 overflow-y-auto pb-10">
        <div className="max-w-4xl mx-auto space-y-6">
          <MaterialCard className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0"><HandHeart size={32} className="text-[#F97316]" /></div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800">{selectedNGO?.name || "Organization"}</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedNGO?.description || "No description available"}</p>
              </div>
            </div>
            <button onClick={() => setShowDonateModal(true)} className="w-full py-3 bg-[#F97316] text-white font-bold rounded-lg flex items-center justify-center gap-2">
              <Heart size={20} /> Donate Now
            </button>
          </MaterialCard>

          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2 px-2"><Calendar size={18} className="text-[#F97316]" /> Events & Camps</h3>
            {loading ? (
              <div className="text-center py-4 text-gray-500">Loading events...</div>
            ) : events.length === 0 ? (
              <div className="text-center py-4 text-gray-500">No events scheduled</div>
            ) : (
              events.map(event => {
                const status = getEventApplicationStatus(event._id);
                return (
                  <MaterialCard key={event._id} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-800">{event.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-100 text-blue-600">{event.status || "Upcoming"}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                      {event.location && <span className="flex items-center gap-1"><Filter size={14} /> {event.location}</span>}
                    </div>
                    {event.description && <p className="text-xs text-gray-500">{event.description}</p>}
                    {userData && (
                      status === "pending" ? (
                        <button disabled className="w-full py-2 bg-orange-100 text-orange-600 text-sm font-bold rounded-lg mt-2 cursor-not-allowed">Application Pending</button>
                      ) : status === "accepted" ? (
                        <button disabled className="w-full py-2 bg-green-100 text-green-600 text-sm font-bold rounded-lg mt-2 cursor-not-allowed">Application Accepted</button>
                      ) : status === "rejected" ? (
                        <button disabled className="w-full py-2 bg-red-100 text-red-600 text-sm font-bold rounded-lg mt-2 cursor-not-allowed">Application Rejected</button>
                      ) : (
                        <button onClick={() => handleApply(event._id, event.title)} className="w-full py-2 bg-[#F97316] text-white text-sm font-bold rounded-lg mt-2">Apply as Volunteer</button>
                      )
                    )}
                  </MaterialCard>
                );
              })
            )}
          </div>

          <MaterialCard className="space-y-3">
            <h3 className="font-bold text-gray-800">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-gray-400">📧</span><span>{selectedNGO?.email || "N/A"}</span></div>
              {selectedNGO?.phone && <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-gray-400">📞</span><span>{selectedNGO.phone}</span></div>}
              {selectedNGO?.address && <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-gray-400">📍</span><span>{selectedNGO.address}</span></div>}
            </div>
          </MaterialCard>
        </div>
      </div>
    </div>
  );
};

export default NGOProfileScreen;
