import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { api, type Opportunity } from '@/lib/api';
import OpportunityCard from './OpportunityCard';
import PersonCard from './PersonCard';

const tabs = [
  { id: 'internships', category: 'internship' },
  { id: 'grants', category: 'grant' },
  { id: 'events', category: 'event' },
  { id: 'mentors', category: 'mentor' },
  { id: 'housing', category: null },
  { id: 'clubs', category: null },
];

// Mock data for people looking for teams
const mockPeople = [
  {
    id: 1,
    name: 'Alex Johnson',
    university: 'MIT',
    location: 'Boston, USA',
    skills: ['React', 'Python', 'ML'],
    lookingFor: 'Hackathon team',
  },
  {
    id: 2,
    name: 'Sarah Chen',
    university: 'Stanford',
    location: 'Palo Alto, USA',
    skills: ['UI/UX', 'Figma', 'Research'],
    lookingFor: 'Startup co-founder',
  },
];

// Mock opportunities for when API is empty
const mockOpportunities: Opportunity[] = [
  {
    id: 1,
    title: 'Google STEP Internship 2026',
    description: 'Summer internship program for first and second year students interested in computer science.',
    category: 'internship',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    country: 'USA',
    city: 'Mountain View',
    trust_status: 'official',
    moderation_status: 'approved',
    created_by: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Chevening Scholarship',
    description: 'UK government\'s international scholarships programme for future leaders.',
    category: 'grant',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    country: 'UK',
    city: 'London',
    trust_status: 'official',
    moderation_status: 'approved',
    created_by: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'HackMIT 2026',
    description: 'Annual hackathon at MIT bringing together 1000+ hackers from around the world.',
    category: 'hackathon',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    country: 'USA',
    city: 'Cambridge',
    trust_status: 'trusted',
    moderation_status: 'approved',
    created_by: 1,
    created_at: new Date().toISOString(),
  },
];

export default function MainContent() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'internships');
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      try {
        const tab = tabs.find((t) => t.id === activeTab);
        const data = await api.getOpportunities(tab?.category || undefined);
        setOpportunities(data.length > 0 ? data : mockOpportunities);
      } catch (error) {
        console.error('Failed to fetch opportunities:', error);
        setOpportunities(mockOpportunities);
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, [activeTab]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const tab = tabs.find((t) => t.id === activeTab);
    if (!tab?.category) return true;
    return opp.category === tab.category;
  });

  return (
    <div className="flex-1">
      {/* Tab Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mb-6">
        <div className="flex items-center gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {t(`tabs.${tab.id}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Recommended People Section */}
        {(activeTab === 'internships' || activeTab === 'grants') && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {t('main.recommendedPeople')}
              </h2>
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                {t('main.viewAll')}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockPeople.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </section>
        )}

        {/* Opportunities Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {t('main.recommendedOpportunities')}
            </h2>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              {t('main.filter')}
            </Button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 p-4 animate-pulse"
                >
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-100 rounded w-full mb-4" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-100 rounded w-20" />
                    <div className="h-6 bg-gray-100 rounded w-24" />
                    <div className="h-6 bg-gray-100 rounded w-28" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOpportunities.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))}

              {filteredOpportunities.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  {t('main.noOpportunities')}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
