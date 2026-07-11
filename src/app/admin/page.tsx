import { AdminClient } from "@/components/AdminClient";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin · Eyes of Home",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  return (
    <div className="min-h-screen bg-black">
      <AdminClient initiallyAuthed={authed} />
    </div>
  );
}
