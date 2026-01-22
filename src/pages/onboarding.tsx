import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Onboarding() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setNeedsOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    target: '',
    skills: '',
    hobbies: '',
  });

  const nextStep = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      // Save profile data to localStorage (no backend call)
      localStorage.setItem('user_profile', JSON.stringify({
        target: formData.target,
        skills: formData.skills,
        hobbies: formData.hobbies,
      }));
      setNeedsOnboarding(false);
      navigate('/dashboard');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang.toLowerCase());
  };

  const currentLang = i18n.language.toUpperCase();

  const stepKeys = ['target', 'skills', 'hobbies'] as const;
  const currentStepKey = stepKeys[step - 1];

  return (
    <div className="relative min-h-screen w-full bg-gray-50 overflow-hidden">
      {/* Background HUB text - outline style, H cut off on the left */}
      <div
        className="absolute top-1/2 -translate-y-1/2 select-none pointer-events-none"
        style={{
          left: '-12rem',
          fontSize: 'clamp(20rem, 45vw, 45rem)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '3px #d1d5db',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        HUB
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center gap-8 p-8">
        {/* Left Card - JOIN THE ACADEMICA HUB */}
        <div
          className="relative h-[520px] w-[380px] rounded-3xl overflow-hidden shadow-2xl"
          style={{
            backgroundImage: 'url(/onboarding.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Gradient overlay 
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
*/}
          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-3xl font-bold text-white leading-tight">
              {t('onboarding.joinTitle')}<br />{t('onboarding.joinSubtitle')}
            </h2>
          </div>
        </div>

        {/* Right Card - Onboarding */}
        <div className="h-[520px] w-[380px] bg-white rounded-3xl shadow-2xl p-6 flex flex-col">
          {/* Top Bar - Logo & Language */}
          <div className="flex justify-between items-center mb-6">
            {/* Logo */}
            
            <img src="/logo.png" alt="Academica Hub" className="h-10" />

            {/* Language Selector */}
            <div className="relative">
              <select
                value={currentLang}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="appearance-none bg-gray-100 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="EN">EN</option>
                <option value="RU">RU</option>
                <option value="KK">KK</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>

          {/* Onboarding Content */}
          <div className="flex-1 flex flex-col">
            <div className="mb-2">
              <span className="text-xs font-medium text-primary uppercase tracking-wide">
                {t('onboarding.step', { current: step, total: 3 })}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {t(`onboarding.steps.${currentStepKey}.title`)}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              {t(`onboarding.steps.${currentStepKey}.description`)}
            </p>

            {step === 1 && (
              <div className="flex-1">
                <input
                  className="w-full border border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  type="text"
                  placeholder={t('onboarding.steps.target.placeholder')}
                  value={formData.target}
                  onChange={(e) => handleInputChange('target', e.target.value)}
                />
              </div>
            )}

            {step === 2 && (
              <div className="flex-1">
                <input
                  className="w-full border border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  type="text"
                  placeholder={t('onboarding.steps.skills.placeholder')}
                  value={formData.skills}
                  onChange={(e) => handleInputChange('skills', e.target.value)}
                />
              </div>
            )}

            {step === 3 && (
              <div className="flex-1">
                <input
                  className="w-full border border-gray-200 rounded-xl p-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  type="text"
                  placeholder={t('onboarding.steps.hobbies.placeholder')}
                  value={formData.hobbies}
                  onChange={(e) => handleInputChange('hobbies', e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Bottom - Progress & Next Button */}
          <div className="mt-auto pt-6">

            {/* Step Indicator */}
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    s <= step ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <Button
              onClick={step === 3 ? handleComplete : nextStep}
              className="w-full h-12 rounded-xl text-base font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? t('onboarding.saving')
                : step === 3
                  ? t('onboarding.complete')
                  : t('onboarding.next')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
