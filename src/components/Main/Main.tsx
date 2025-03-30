export default function Main({
  children,
  title
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto pt-7 pb-5 px-5 bg-white rounded-2xl shadow-custom">
      <h3 className="text-lg text-main capitalize font-bold">{title}</h3>
      {children}
    </div>
  );
}
