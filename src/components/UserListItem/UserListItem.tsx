export default function UserListItem({
  name,
  photo,
  email,
  lineClamp = true
}: {
  name?: string;
  photo?: string;
  email?: string;
  lineClamp?: boolean;
}) {
  const emailText = lineClamp ? `${email?.slice(0, 10)}...` : email;
  return (
    <div className="flex gap-[14px] items-center">
      <img
        className="w-10 h-10 object-cover rounded-xl"
        src={`${import.meta.env.VITE_IMG_URL}/users/${photo}`}
        alt={name}
      />
      <div>
        <h2 className="text-main text-sm font-bold capitalize">{name}</h2>
        <h2 className="text-[#718096] text-sm">{emailText}</h2>
      </div>
    </div>
  );
}
