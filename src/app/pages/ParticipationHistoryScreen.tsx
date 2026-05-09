import React, { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { API_BASE_URL } from "../../config";
import AndroidHeader from "../components/shared/AndroidHeader";

const ParticipationHistoryScreen = ({ onBack, userData }: { onBack: () => void; userData: any }) => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/applications/volunteer/${userData._id}`);
        const data = await response.json();
        if (data.success) setHistory(data.applications?.filter((app: any) => app.status === "accepted") || []);
      } catch (error) { console.error("Error fetching history:", error); }
      finally { setLoading(false); }
    };
    fetchHistory();
  }, []);

  const isEventCompleted = (eventDate: string) => eventDate ? new Date(eventDate) < new Date() : false;

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
                  <p className="text-xs text-gray-500 mt-0.5">{app.ngo_name || "Organization Event"}</p>
                  <p className="text-[10px] text-gray-400 mt-1">Accepted</p>
                </div>
                <span className="text-xs font-bold text-gray-400">{isEventCompleted(app.event_date) ? "Completed" : "Upcoming"}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipationHistoryScreen;
