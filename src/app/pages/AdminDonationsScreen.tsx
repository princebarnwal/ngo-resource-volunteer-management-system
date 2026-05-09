import React from "react";
import AndroidHeader from "../components/shared/AndroidHeader";

const AdminDonationsScreen = ({ onBack, userData }: { onBack: () => void; userData: any }) => (
  <div className="h-full bg-gray-50 flex flex-col">
    <AndroidHeader title="Donations" onBack={onBack} />
    <div className="p-4 space-y-4 overflow-y-auto pb-10">
      <div className="text-center py-8 text-gray-500">Donations feature coming soon</div>
    </div>
  </div>
);

export default AdminDonationsScreen;
