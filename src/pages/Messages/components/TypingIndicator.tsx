export default function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-1 rounded-2xl bg-[#eeeeee]">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-[#d1d1d1] animate-bounce"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </div>
  );
}
