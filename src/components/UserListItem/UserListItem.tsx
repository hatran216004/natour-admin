export default function UserListItem({
  name,
  photo,
  email
}: {
  name?: string;
  photo?: string;
  email?: string;
}) {
  return (
    <div className="flex gap-[14px] items-center">
      <img
        className="w-10 h-10 object-cover rounded-xl"
        src={`${import.meta.env.VITE_API_BASE_URL}/img/users/${photo}`}
        alt={name}
      />
      <div>
        <h2 className="text-main text-sm font-bold capitalize">{name}</h2>
        <h2 className="text-[#718096] text-sm">{email}</h2>
      </div>
    </div>
  );
}
