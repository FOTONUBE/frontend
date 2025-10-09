import DashboardHeader from "@/components/dashboard/DashboardHeader/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/Sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <DashboardSidebar />
      <main className="flex-1 p-6 overflow-y-auto min-h-screen pt-24 md:ml-[16.6667%]">
        {children}
      </main>
    </div>
  );
}
