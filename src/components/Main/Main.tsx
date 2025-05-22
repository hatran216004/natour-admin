export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex-1 flex flex-col py-6 px-5 bg-white rounded-2xl shadow-custom">
      {children}
    </div>
  );
}
