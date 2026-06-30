import AdminLayout from "@/components/admin/AdminLayout";

export const metadata = {
    title: "KES HUB - Admin",
    description: "KES HUB - Admin",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <AdminLayout>
                {children}
            </AdminLayout>
        </>
    );
}
