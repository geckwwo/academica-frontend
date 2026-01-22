import { useTranslation } from 'react-i18next';
import { User, MapPin, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Person {
  id: number;
  name: string;
  university: string;
  location: string;
  skills: string[];
  lookingFor: string;
  avatar?: string;
}

interface PersonCardProps {
  person: Person;
}

export default function PersonCard({ person }: PersonCardProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-gray-200 transition-all">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          {person.avatar ? (
            <img
              src={person.avatar}
              alt={person.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-primary" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{person.name}</h3>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <GraduationCap className="w-3 h-3" />
            <span className="truncate">{person.university}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin className="w-3 h-3" />
            <span>{person.location}</span>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {person.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 bg-gray-50 rounded-md text-xs text-gray-600"
          >
            {skill}
          </span>
        ))}
        {person.skills.length > 3 && (
          <span className="px-2 py-0.5 bg-gray-50 rounded-md text-xs text-gray-500">
            +{person.skills.length - 3}
          </span>
        )}
      </div>

      {/* Looking For */}
      <p className="text-xs text-gray-500 mt-2 line-clamp-1">
        {t('people.lookingFor')}: {person.lookingFor}
      </p>

      {/* Connect Button */}
      <Button variant="outline" size="sm" className="w-full mt-3 h-8 text-xs">
        {t('people.connect')}
      </Button>
    </div>
  );
}
