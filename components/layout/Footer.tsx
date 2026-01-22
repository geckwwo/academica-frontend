import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/dashboard">
              <img src="/logo.png" alt="Academica Hub" className="h-10" />
            </Link>
            <p className="mt-4 text-sm text-gray-500 max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {t('footer.programs')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard?tab=internships"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  {t('footer.internships')}
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard?tab=grants"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  {t('footer.scholarships')}
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard?tab=mentors"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  {t('footer.mentors')}
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard?tab=housing"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  {t('footer.housing')}
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard?tab=clubs"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  {t('footer.clubs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              {t('footer.contacts')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@academica.hub"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  support@academica.hub
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/academicahub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/academicahub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-primary transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Academica Hub. {t('footer.rights')}
            </p>
            <Link
              to="/privacy"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
