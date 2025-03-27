type PropsType = {
  label: string;
  type: string;
  placeholder: string;
};

export default function Input({ label, type, placeholder }: PropsType) {
  return (
    <div>
      <label className="text-sm text-[#2D3748] font-normal capitalize mb-[6px] block">
        {label}
      </label>
      <div className="min-w-[350px] rounded-2xl bg-transparent border border-[#E2E8F0] h-[50px] overflow-hidden px-5">
        <input
          type={type}
          className="h-full w-full focus:outline-none"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
