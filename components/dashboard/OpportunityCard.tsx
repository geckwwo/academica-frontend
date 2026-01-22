import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import type { Opportunity } from '@/lib/api';

interface OpportunityCardProps {
  opportunity: Opportunity;
}

const categoryColors: Record<string, string> = {
  internship: 'bg-blue-50 text-blue-600',
  grant: 'bg-green-50 text-green-600',
  hackathon: 'bg-purple-50 text-purple-600',
  job: 'bg-orange-50 text-orange-600',
  mentor: 'bg-pink-50 text-pink-600',
  event: 'bg-yellow-50 text-yellow-600',
};

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { t } = useTranslation();

  const formatDeadline = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diff < 0) return t('opportunity.expired');
    if (diff === 0) return t('opportunity.today');
    if (diff === 1) return t('opportunity.tomorrow');
    if (diff <= 7) return t('opportunity.daysLeft', { days: diff });
    return date.toLocaleDateString();
  };

  return (
    <Link
      to={`/opportunity/${opportunity.id}`}
      className="block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {opportunity.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {opportunity.description}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        {/* Category Tag */}
        <span
          className={`px-2.5 py-1 rounded-lg text-xs font-medium ${categoryColors[opportunity.category] || 'bg-gray-50 text-gray-600'}`}
        >
          {t(`categories.${opportunity.category}`)}
        </span>

        {/* Deadline Tag */}
        <span className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 rounded-lg text-xs text-gray-600">
          <Calendar className="w-3 h-3" />
          {formatDeadline(opportunity.deadline)}
        </span>

        {/* Location Tag */}
        <span className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 rounded-lg text-xs text-gray-600">
          <MapPin className="w-3 h-3" />
          {opportunity.city ? `${opportunity.city}, ${opportunity.country}` : opportunity.country}
        </span>

        {/* Source Tag */}
        {opportunity.source_url && (
          <span className="flex items-center gap-1 px-2.5 py-1 bg-gray-50 rounded-lg text-xs text-gray-600">
            <ExternalLink className="w-3 h-3" />
            {t(`trust.${opportunity.trust_status}`)}
          </span>
        )}
      </div>
    </Link>
  );
}
