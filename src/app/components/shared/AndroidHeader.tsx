import React from "react";
import { ChevronLeft } from "lucide-react";

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

export default AndroidHeader;
