import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";
import AndroidHeader from "../components/shared/AndroidHeader";
import MaterialCard from "../components/shared/MaterialCard";

const NotificationsScreen = ({ onBack, userData }: { onBack: () => void; userData: any }) => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchApplications(); }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/ngo/${userData._id}`);
      const data = await response.json();
      if (data.success) setApplications(data.applications || []);
    } catch (error) { console.error("Error fetching applications:", error); }
    finally { setLoading(false); }
  };

  const handleStatusUpdate = async (appId: string, status: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/applications/${appId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) fetchApplications();
    } catch (error) { console.error("Error updating status:", error); }
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
                  <span className={`text-[10px] font-bold px-2 py-1 rounded ${app.status === "pending" ? "bg-orange-100 text-orange-600" : app.status === "accepted" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                    {app.status.toUpperCase()}
                  </span>
                </div>
                {app.status === "pending" && (
                  <div className="flex gap-2">
                    <button onClick={() => handleStatusUpdate(app._id, "accepted")} className="flex-1 py-2 bg-green-500 text-white text-sm font-bold rounded-lg">Accept</button>
                    <button onClick={() => handleStatusUpdate(app._id, "rejected")} className="flex-1 py-2 bg-red-500 text-white text-sm font-bold rounded-lg">Reject</button>
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

export default NotificationsScreen;
