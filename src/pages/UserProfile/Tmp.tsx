import { useState } from 'react';
import {
  Edit,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Camera,
  Settings,
  User,
  Heart,
  Bookmark,
  Image
} from 'lucide-react';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);

  const userData = {
    name: 'Nguyễn Minh Anh',
    username: '@minhanh.dev',
    bio: 'Frontend Developer • UI/UX Enthusiast • Coffee Lover ☕',
    location: 'Ho Chi Minh City, Vietnam',
    joinDate: 'Tham gia từ tháng 3 năm 2022',
    email: 'minhanh@example.com',
    phone: '+84 901 234 567',
    followers: '2.4K',
    following: '489',
    posts: '127'
  };

  const posts = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
      likes: 42
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop',
      likes: 38
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=400&fit=crop',
      likes: 56
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=400&fit=crop',
      likes: 29
    },
    {
      id: 5,
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
      likes: 73
    },
    {
      id: 6,
      image:
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
      likes: 91
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://i.pinimg.com/736x/59/43/11/594311f521e74b225a268fa03f185cbb.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Cover Image */}
        <div className="relative h-64 rounded-3xl overflow-hidden mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute top-4 right-4">
            <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=300&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
        </div>

        {/* Profile Header */}
        <div className="relative -mt-24 mb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img
                    src="https://i.pinimg.com/736x/59/43/11/594311f521e74b225a268fa03f185cbb.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-purple-600 hover:bg-purple-700 rounded-full shadow-lg transition-all duration-300 group-hover:scale-110">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                    {userData.name}
                  </h1>
                  <p className="text-purple-200 text-lg mb-2">
                    {userData.username}
                  </p>
                  <p className="text-gray-300 max-w-md leading-relaxed">
                    {userData.bio}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 hover:scale-105"
                  >
                    <Edit className="w-4 h-4" />
                    Chỉnh sửa
                  </button>
                  <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 hover:scale-105">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {userData.posts}
                  </div>
                  <div className="text-purple-200 text-sm">Bài viết</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {userData.followers}
                  </div>
                  <div className="text-purple-200 text-sm">Người theo dõi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {userData.following}
                  </div>
                  <div className="text-purple-200 text-sm">Đang theo dõi</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  {userData.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  {userData.joinDate}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 mb-8">
          <div className="flex gap-2">
            {[
              { id: 'posts', label: 'Bài viết', icon: Image },
              { id: 'saved', label: 'Đã lưu', icon: Bookmark },
              { id: 'liked', label: 'Đã thích', icon: Heart },
              { id: 'about', label: 'Giới thiệu', icon: User }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          {activeTab === 'posts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="group relative overflow-hidden rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={post.image}
                      alt={`Post ${post.id}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-2 text-white">
                      <Heart className="w-5 h-5 fill-current" />
                      <span className="font-medium">{post.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6 text-white">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-purple-200">
                    Thông tin liên hệ
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <Mail className="w-5 h-5 text-purple-400" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <Phone className="w-5 h-5 text-purple-400" />
                      <span>{userData.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-purple-200">
                    Sở thích
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'JavaScript',
                      'React',
                      'UI/UX',
                      'Photography',
                      'Travel',
                      'Coffee'
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {(activeTab === 'saved' || activeTab === 'liked') && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === 'saved' ? (
                  <Bookmark className="w-8 h-8 text-purple-400" />
                ) : (
                  <Heart className="w-8 h-8 text-purple-400" />
                )}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {activeTab === 'saved'
                  ? 'Chưa có bài viết đã lưu'
                  : 'Chưa có bài viết đã thích'}
              </h3>
              <p className="text-gray-400">
                {activeTab === 'saved'
                  ? 'Các bài viết bạn lưu sẽ hiển thị tại đây'
                  : 'Các bài viết bạn thích sẽ hiển thị tại đây'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
