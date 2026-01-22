import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Search, MessageSquare, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang.toLowerCase());
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex-shrink-0">
            <img src="/logo.png" alt="Academica Hub" className="h-10" />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('navbar.search')}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={i18n.language.toUpperCase()}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="appearance-none bg-gray-50 rounded-lg px-3 py-2 pr-8 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 border border-gray-200"
              >
                <option value="EN">EN</option>
                <option value="RU">RU</option>
                <option value="KK">KK</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Messages Button */}
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Profile Dropdown */}
            <div className="relative group">
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
              </Button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {t('navbar.profile')}
                </Link>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {t('navbar.settings')}
                </Link>
                <hr className="my-2 border-gray-100" />
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  {t('navbar.logout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
