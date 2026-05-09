import React, { useState, useEffect } from "react";
import { HandHeart, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "../../config";
import { Screen } from "../types";
import AndroidHeader from "../components/shared/AndroidHeader";
import MaterialCard from "../components/shared/MaterialCard";

const NGODetailsScreen = ({ onBack, navigate, setSelectedNGO }: { onBack: () => void; navigate: (s: Screen) => void; setSelectedNGO: (ngo: any) => void }) => {
  const [ngos, setNgos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNGOs = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/ngos/all`);
        const data = await response.json();
        if (data.success) setNgos(data.ngos || []);
      } catch (error) { console.error("Error fetching NGOs:", error); }
      finally { setLoading(false); }
    };
    fetchNGOs();
  }, []);

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
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0"><HandHeart size={28} className="text-[#F97316]" /></div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{ngo.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{ngo.description || "No description available"}</p>
                  </div>
                </div>
                {(ngo.address || ngo.registrationNumber) && (
                  <div className="space-y-1 pt-2">
                    {ngo.address && <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-gray-400">📍</span><span>{ngo.address}</span></div>}
                    {ngo.registrationNumber && <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-gray-400">🆔</span><span>Reg: {ngo.registrationNumber}</span></div>}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600 pt-2 border-t border-gray-100">
                  <span className="text-gray-400">📧</span><span>{ngo.email}</span>
                </div>
                {ngo.phone && <div className="flex items-center gap-2 text-sm text-gray-600"><span className="text-gray-400">📞</span><span>{ngo.phone}</span></div>}
                <button onClick={() => { setSelectedNGO(ngo); navigate("ngo_profile"); }} className="w-full py-3 bg-[#F97316] text-white font-bold rounded-lg hover:bg-[#EA580C] transition-colors flex items-center justify-center gap-2">
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

export default NGODetailsScreen;
