export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-auto bg-gray-50">
      {children}
    </div>
  );
}
