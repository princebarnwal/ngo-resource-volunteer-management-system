import React, { useState, useEffect } from "react";
import { User, Calendar, Filter, Users, X } from "lucide-react";
import { API_BASE_URL } from "../../config";
import AndroidHeader from "../components/shared/AndroidHeader";
import MaterialCard from "../components/shared/MaterialCard";

const AdminEventsScreen = ({ onBack, userData }: { onBack: () => void; userData: any }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [applicants, setApplicants] = useState<any[]>([]);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/all?ngo_id=${userData._id}`);
      const data = await response.json();
      if (data.success) setEvents(data.events || []);
    } catch (error) { console.error("Error fetching events:", error); }
    finally { setLoading(false); }
  };

  const fetchApplicants = async (eventId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/event/${eventId}`);
      const data = await response.json();
      if (data.success) setApplicants(data.applications || []);
    } catch (error) { console.error("Error fetching applicants:", error); }
  };

  const handleDelete = async (eventId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/events/delete/${eventId}`, { method: "DELETE" });
      const data = await response.json();
      if (data.success) fetchEvents();
    } catch (error) { console.error("Error deleting event:", error); }
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
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><User size={20} className="text-blue-600" /></div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-800">{app.volunteer_name}</p>
                    <p className="text-xs text-gray-500">{app.volunteer_email}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${app.status === "pending" ? "bg-orange-100 text-orange-600" : app.status === "accepted" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
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
                    <span className={`text-[10px] font-bold px-2 py-1 rounded ${event.status === "completed" ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                      {event.status === "completed" ? "Completed" : "Upcoming"}
                    </span>
                    <button onClick={() => handleDelete(event._id)} className="p-1 hover:bg-red-50 rounded text-red-500"><X size={16} /></button>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                  {event.location && <span className="flex items-center gap-1"><Filter size={12} /> {event.location}</span>}
                </div>
                {event.description && <p className="text-xs text-gray-500">{event.description}</p>}
                <button onClick={() => { setSelectedEvent(event); fetchApplicants(event._id); }} className="w-full py-2 bg-blue-500 text-white text-sm font-bold rounded-lg mt-2 flex items-center justify-center gap-2">
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

export default AdminEventsScreen;
