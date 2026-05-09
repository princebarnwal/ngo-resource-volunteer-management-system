import React, { useState, useEffect } from "react";
import { User } from "lucide-react";
import { API_BASE_URL } from "../../config";
import AndroidHeader from "../components/shared/AndroidHeader";
import MaterialCard from "../components/shared/MaterialCard";

const AdminVolunteersScreen = ({ onBack, userData }: { onBack: () => void; userData: any }) => {
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/applications/ngo/${userData._id}`);
        const data = await response.json();
        if (data.success) setVolunteers(data.applications?.filter((app: any) => app.status === "accepted") || []);
      } catch (error) { console.error("Error fetching volunteers:", error); }
      finally { setLoading(false); }
    };
    fetchVolunteers();
  }, []);

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
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><User size={24} className="text-green-600" /></div>
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

export default AdminVolunteersScreen;
