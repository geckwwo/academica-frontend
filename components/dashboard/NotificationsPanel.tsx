import { useTranslation } from 'react-i18next';
import { Bell, Calendar, Award, Briefcase, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: number;
  title: string;
  subtitle: string;
  type: 'deadline' | 'grant' | 'internship' | 'event';
  time: string;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'Google STEP Internship',
    subtitle: 'Deadline in 3 days',
    type: 'deadline',
    time: '2h ago',
  },
  {
    id: 2,
    title: 'Chevening Scholarship',
    subtitle: 'New grant available',
    type: 'grant',
    time: '5h ago',
  },
  {
    id: 3,
    title: 'Microsoft Explore',
    subtitle: 'Applications open',
    type: 'internship',
    time: '1d ago',
  },
  {
    id: 4,
    title: 'Tech Career Fair',
    subtitle: 'Event tomorrow',
    type: 'event',
    time: '1d ago',
  },
];

const typeIcons = {
  deadline: Calendar,
  grant: Award,
  internship: Briefcase,
  event: Bell,
};

const typeColors = {
  deadline: 'bg-red-50 text-red-600',
  grant: 'bg-green-50 text-green-600',
  internship: 'bg-blue-50 text-blue-600',
  event: 'bg-purple-50 text-purple-600',
};

export default function NotificationsPanel() {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {t('notifications.title')}
        </h2>
        <Bell className="w-5 h-5 text-gray-400" />
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {mockNotifications.map((notification) => {
          const Icon = typeIcons[notification.type];
          const colorClass = typeColors[notification.type];

          return (
            <div
              key={notification.id}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className={`p-2 rounded-lg ${colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {notification.title}
                </p>
                <p className="text-xs text-gray-500">{notification.subtitle}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {notification.time}
              </span>
            </div>
          );
        })}
      </div>

      {/* AI Assistant Button */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <Button className="w-full gap-2 h-12 rounded-xl" variant="outline">
          <Sparkles className="w-5 h-5 text-primary" />
          <span>{t('notifications.askAI')}</span>
        </Button>
      </div>
    </div>
  );
}
