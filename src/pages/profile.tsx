import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Calendar,
  MessageSquare,
  Edit3,
  GraduationCap,
  Award,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import NotificationsPanel from '@/components/dashboard/NotificationsPanel';
import { api } from '@/lib/api';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  bio?: string;
  country?: string;
  city?: string;
  university?: string;
  level?: 'school' | 'bachelor' | 'master';
  avatar?: string;
  banner?: string;
  created_at?: string;
  skills?: string[];
  education?: Education[];
  achievements?: Achievement[];
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear?: number;
  logo?: string;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  date: string;
  icon?: string;
}

// Mock data for demonstration
const mockCurrentUser: UserProfile = {
  id: 1,
  username: 'johndoe',
  email: 'john@example.com',
  full_name: 'John Doe',
  bio: 'Passionate software engineer and lifelong learner. Interested in AI, web development, and building products that make a difference. Currently seeking internship opportunities in tech.',
  country: 'USA',
  city: 'San Francisco',
  university: 'Stanford University',
  level: 'bachelor',
  skills: ['JavaScript', 'React', 'Python', 'Machine Learning', 'UI/UX Design', 'Node.js', 'PostgreSQL', 'Git'],
  education: [
    {
      id: 1,
      institution: 'Stanford University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startYear: 2023,
      endYear: 2027,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Seal_of_Leland_Stanford_Junior_University.svg/150px-Seal_of_Leland_Stanford_Junior_University.svg.png',
    },
    {
      id: 2,
      institution: 'Palo Alto High School',
      degree: 'High School Diploma',
      field: 'General Studies',
      startYear: 2019,
      endYear: 2023,
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Palo_Alto_High_School_logo.svg/150px-Palo_Alto_High_School_logo.svg.png',
    },
  ],
  achievements: [
    {
      id: 1,
      title: 'HackMIT 2025 Winner',
      description: 'First place in the AI/ML track for building an accessibility tool',
      date: '2025-09',
    },
    {
      id: 2,
      title: 'Dean\'s List',
      description: 'Academic excellence recognition for Fall 2024',
      date: '2024-12',
    },
    {
      id: 3,
      title: 'Google STEP Intern',
      description: 'Summer internship at Google working on Search infrastructure',
      date: '2025-06',
    },
  ],
};

const mockOtherUser: UserProfile = {
  id: 2,
  username: 'sarahchen',
  email: 'sarah@example.com',
  full_name: 'Sarah Chen',
  bio: 'Product designer passionate about creating intuitive user experiences. Love collaborating with engineers to bring ideas to life. Open to mentorship opportunities.',
  country: 'USA',
  city: 'New York',
  university: 'MIT',
  level: 'master',
  skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping', 'Design Systems', 'Adobe Creative Suite'],
  education: [
    {
      id: 1,
      institution: 'MIT',
      degree: 'Master of Science',
      field: 'Human-Computer Interaction',
      startYear: 2024,
      endYear: 2026,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/MIT_logo.svg/150px-MIT_logo.svg.png',
    },
    {
      id: 2,
      institution: 'UC Berkeley',
      degree: 'Bachelor of Arts',
      field: 'Cognitive Science',
      startYear: 2020,
      endYear: 2024,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/150px-Seal_of_University_of_California%2C_Berkeley.svg.png',
    },
  ],
  achievements: [
    {
      id: 1,
      title: 'Adobe Design Achievement Award',
      description: 'Finalist in the UX Design category',
      date: '2024-05',
    },
    {
      id: 2,
      title: 'Published Research',
      description: 'Co-authored paper on accessible design patterns in CHI 2025',
      date: '2025-04',
    },
  ],
};

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        if (!id) {
          // Fetch current user's profile
          const data = await api.getProfile();
          setProfile({ ...mockCurrentUser, ...data });
          setIsOwnProfile(true);
        } else {
          // Fetch other user's profile - would be api.getUserProfile(id) in real app
          // For now, use mock data
          setProfile(mockOtherUser);
          setIsOwnProfile(false);
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        // Use mock data as fallback
        setProfile(id ? mockOtherUser : mockCurrentUser);
        setIsOwnProfile(!id);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t('profile.notFound')}
            </h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Left Content */}
            <div className="flex-1 space-y-6">
              {/* Profile Header Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Banner */}
                <div
                  className="h-40 bg-gradient-to-r from-primary/80 to-primary"
                  style={
                    profile.banner
                      ? { backgroundImage: `url(${profile.banner})`, backgroundSize: 'cover' }
                      : undefined
                  }
                />

                {/* Profile Info */}
                <div className="px-6 pb-6">
                  {/* Avatar */}
                  <div className="relative -mt-16 mb-4">
                    <div className="w-32 h-32 rounded-2xl bg-white border-4 border-white shadow-lg overflow-hidden">
                      {profile.avatar ? (
                        <img
                          src={profile.avatar}
                          alt={profile.full_name || profile.username}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                          <span className="text-4xl font-bold text-primary">
                            {(profile.full_name || profile.username).charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name and Actions */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {profile.full_name || profile.username}
                      </h1>
                      <p className="text-gray-500">@{profile.username}</p>
                    </div>

                    {isOwnProfile ? (
                      <Button variant="outline" className="gap-2">
                        <Edit3 className="w-4 h-4" />
                        {t('profile.edit')}
                      </Button>
                    ) : (
                      <Button className="gap-2">
                        <MessageSquare className="w-4 h-4" />
                        {t('profile.startChat')}
                      </Button>
                    )}
                  </div>

                  {/* Bio */}
                  {profile.bio && (
                    <p className="mt-4 text-gray-600 leading-relaxed">{profile.bio}</p>
                  )}

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                    {(profile.city || profile.country) && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {profile.city && profile.country
                            ? `${profile.city}, ${profile.country}`
                            : profile.city || profile.country}
                        </span>
                      </div>
                    )}
                    {profile.university && (
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-4 h-4" />
                        <span>{profile.university}</span>
                      </div>
                    )}
                    {profile.created_at && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {t('profile.joined')} {new Date(profile.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Education Card */}
              {profile.education && profile.education.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      {t('profile.education')}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {profile.education.map((edu) => (
                      <div
                        key={edu.id}
                        className="flex items-start gap-4 p-4 rounded-xl bg-gray-50"
                      >
                        {/* Logo */}
                        <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {edu.logo ? (
                            <img
                              src={edu.logo}
                              alt={edu.institution}
                              className="w-10 h-10 object-contain"
                            />
                          ) : (
                            <GraduationCap className="w-6 h-6 text-gray-400" />
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {edu.institution}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {edu.degree} in {edu.field}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {edu.startYear} - {edu.endYear || t('profile.present')}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Card */}
              {profile.skills && profile.skills.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      {t('profile.skills')}
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-primary/5 text-primary rounded-xl text-sm font-medium hover:bg-primary/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements Card */}
              {profile.achievements && profile.achievements.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Award className="w-5 h-5 text-primary" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      {t('profile.achievements')}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {profile.achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="flex items-start gap-4 p-4 rounded-xl bg-gray-50"
                      >
                        {/* Icon */}
                        <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center flex-shrink-0">
                          <Award className="w-5 h-5 text-yellow-600" />
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {achievement.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {achievement.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(achievement.date).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="w-80 flex-shrink-0 hidden lg:block">
              <div className="sticky top-24">
                <NotificationsPanel />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
