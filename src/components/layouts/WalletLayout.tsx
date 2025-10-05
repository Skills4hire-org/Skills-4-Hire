import { Outlet } from "react-router-dom";
import WalletBalance from "../wallet/WalletBalance";

const WalletLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <WalletBalance />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default WalletLayout;
