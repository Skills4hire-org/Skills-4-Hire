import { Send, ArrowDownUp, Banknote, Wallet } from "lucide-react";

const WalletBalance = () => {
  const user = {
    balance: 77000,
  };

  const actions = [
    { label: "Send", icon: Send },
    { label: "Receive", icon: ArrowDownUp },
    { label: "Deposit", icon: Banknote },
    { label: "Withdraw", icon: Wallet },
  ];

  return (
    <header
      className="relative bg-[rgb(89,96,200)] text-white rounded-b-3xl shadow-lg pb-6 pt-10 md:pt-12 px-6 md:px-10"
      style={{
        background:
          "linear-gradient(180deg, rgba(89,96,200,1) 0%, rgba(70,77,180,1) 100%)",
      }}
    >
      <div className="mb-4 pl-4 md:pl-10">
        <p className="text-sm text-white/90">Available Balance:</p>
        <h2 className="text-2xl font-bold mt-1">
          ₦{user.balance.toLocaleString()}
        </h2>
      </div>

      <div className="flex justify-between md:justify-center md:gap-x-12 lg:gap-x-16 mt-4">
        {actions.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-2 text-sm focus:outline-none transition-all hover:opacity-90"
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md shadow-sm">
              <Icon size={22} />
            </div>
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </header>
  );
};

export default WalletBalance;
