import StoreLayout from "@/components/store/StoreLayout";

export const metadata = {
    title: "KES HUB - Store Dashboard",
    description: "KES HUB - Store Dashboard",
};

export default function RootAdminLayout({ children }) {

    return (
        <>
            <StoreLayout>
                {children}
            </StoreLayout>
        </>
    );
}
