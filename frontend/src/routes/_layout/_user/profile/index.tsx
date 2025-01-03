import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Edit, Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinedDate: string;
  occupation: string;
  bio: string;
  avatar: string;
}

export const Route = createFileRoute('/_layout/_user/profile/')({
  component: ProfileComponent,
});

function ProfileComponent() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserProfile | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('user');
    if (data) {
      const userData = JSON.parse(data);
      // Assuming the user data needs to be transformed to match our UserProfile interface
      setProfile({
        id: userData.id || '',
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        location: userData.location || '',
        joinedDate: userData.joinedDate || new Date().toISOString(),
        occupation: userData.occupation || '',
        bio: userData.bio || '',
        avatar: userData.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      });
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm(profile);
  };

  const handleSave = () => {
    if (editForm) {
      setProfile(editForm);
      localStorage.setItem('user', JSON.stringify(editForm));
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm(profile);
  };

  if (!profile) {
    return (
      <div className="w-full min-h-screen mt-[65px] flex items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen mt-[65px] bg-gray-500 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white text-black rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="absolute -bottom-20 left-8">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-24 px-8 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-gray-600">{profile.occupation}</p>
            </div>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Edit size={16} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Profile Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={20} />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={20} />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin size={20} />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar size={20} />
                <span>Joined {new Date(profile.joinedDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-600">{profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}