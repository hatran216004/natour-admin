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
    <div className="flex items-center">
      <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
        <img
          className="w-10 h-10 object-cover rounded-xl"
          src={`${import.meta.env.VITE_IMG_URL}/users/${photo}`}
          alt={name}
        />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{name}</div>
        <div className="text-sm text-gray-500">{emailText}</div>
      </div>
    </div>
  );
}
