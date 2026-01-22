import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, MapPin, ExternalLink, Share2, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { api, type Opportunity } from '@/lib/api';

const categoryColors: Record<string, string> = {
  internship: 'bg-blue-50 text-blue-600',
  grant: 'bg-green-50 text-green-600',
  hackathon: 'bg-purple-50 text-purple-600',
  job: 'bg-orange-50 text-orange-600',
  mentor: 'bg-pink-50 text-pink-600',
  event: 'bg-yellow-50 text-yellow-600',
};

export default function OpportunityPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpportunity = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await api.getOpportunity(Number.parseInt(id));
        setOpportunity(data);
      } catch (error) {
        console.error('Failed to fetch opportunity:', error);
        // Mock data for demo
        setOpportunity({
          id: Number.parseInt(id),
          title: 'Google STEP Internship 2026',
          description: `The STEP Internship is a developmental internship for first and second-year undergraduate students with a passion for computer science. The program focuses on providing development opportunities to students from groups historically underrepresented in tech.

Through the program, you will get hands-on experience working on software engineering projects, develop technical skills through mentorship, and build a community with other STEP interns.

What you'll do:
• Work on a software project with other interns and full-time Googlers
• Get assigned a mentor who will support your professional development
• Attend speaker sessions and social events with other interns
• Present your project work at the end of the internship`,
          requirements: `Minimum qualifications:
• Currently enrolled in a Bachelor's degree program in Computer Science or related field
• First or second year standing at time of application
• Available for a 12-week internship during summer 2026

Preferred qualifications:
• Experience in one or more programming languages (e.g., Python, Java, C++)
• Strong problem-solving skills
• Passion for technology and innovation`,
          category: 'internship',
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          country: 'USA',
          city: 'Mountain View',
          source_url: 'https://careers.google.com/jobs/results/12345',
          trust_status: 'official',
          moderation_status: 'approved',
          created_by: 1,
          created_at: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunity();
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

  if (!opportunity) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {t('opportunity.notFound')}
            </h1>
            <Link to="/dashboard" className="text-primary hover:underline">
              {t('opportunity.backToDashboard')}
            </Link>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('opportunity.back')}
          </Link>

          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${categoryColors[opportunity.category] || 'bg-gray-50 text-gray-600'}`}
                  >
                    {t(`categories.${opportunity.category}`)}
                  </span>
                  <span className="px-3 py-1 bg-gray-50 rounded-lg text-sm text-gray-600">
                    {t(`trust.${opportunity.trust_status}`)}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {opportunity.title}
                </h1>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 mb-8 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>
                  {t('opportunity.deadline')}: {new Date(opportunity.deadline).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>
                  {opportunity.city ? `${opportunity.city}, ${opportunity.country}` : opportunity.country}
                </span>
              </div>
              {opportunity.source_url && (
                <a
                  href={opportunity.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ExternalLink className="w-5 h-5" />
                  {t('opportunity.source')}
                </a>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {t('opportunity.description')}
              </h2>
              <div className="prose prose-gray max-w-none">
                {opportunity.description.split('\n').map((paragraph, i) => (
                  <p key={i} className="text-gray-600 mb-3">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Requirements */}
            {opportunity.requirements && (
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {t('opportunity.requirements')}
                </h2>
                <div className="prose prose-gray max-w-none">
                  {opportunity.requirements.split('\n').map((line, i) => (
                    <p key={i} className="text-gray-600 mb-2">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Apply Button */}
            <div className="pt-6 border-t border-gray-100">
              {opportunity.source_url ? (
                <a
                  href={opportunity.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full sm:w-auto h-12 px-8">
                    {t('opportunity.apply')}
                  </Button>
                </a>
              ) : (
                <Button className="w-full sm:w-auto h-12 px-8">
                  {t('opportunity.apply')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
