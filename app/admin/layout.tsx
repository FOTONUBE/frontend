import AdminHeader from "@/components/Admin/AdminHeader";
import AdminSidebar from "@/components/Admin/AdminSidebar";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />

      <AdminSidebar />

      <main className="md:ml-[16.6667%] flex-1 p-6 overflow-y-auto min-h-screen pt-24">
        {children}
      </main>
    </div>
  );
}
