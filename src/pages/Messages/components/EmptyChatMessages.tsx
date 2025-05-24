import { LuMessageSquareText } from 'react-icons/lu';

export default function EmptyChatMessages({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-[calc(100%-32px)] flex items-center justify-center">
      <div>
        <LuMessageSquareText size={220} className="mx-auto" color="#4fd1c5" />
        <p className="text-center mt-2 font-medium text-slate-400">
          {children}
        </p>
      </div>
    </div>
  );
}
