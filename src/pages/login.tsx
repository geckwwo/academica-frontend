import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegisterMode) {
        await register(email, username, password);
        navigate('/onboarding');
      } else {
        await login(email, password);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('auth.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Banner */}
      <div
        className="hidden lg:flex flex-1 flex-col justify-between bg-cover bg-center text-white p-12 items-center"
        style={{
          backgroundImage: 'url(/academica-bg.jpg)',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        <div className="text-3xl font-bold">academica.hub</div>
        <div className="flex flex-col items-center">
          <div className="text-4xl font-semibold leading-tight">
            {t('auth.welcome')}
          </div>
          <button
            type="button"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-lg underline cursor-pointer mt-2 hover:opacity-80 transition-opacity"
          >
            {isRegisterMode ? t('auth.haveAccount') : t('auth.createAccount')}
          </button>
        </div>
        <div />
      </div>

      {/* Right Auth Card */}
      <div className="flex-1 flex items-center justify-center relative bg-gray-50">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm w-96">
          <h2 className="text-2xl mb-6 text-center font-semibold">
            {isRegisterMode ? t('auth.register') : t('auth.login')}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {isRegisterMode && (
            <div className="mb-4 text-left">
              <label className="block text-sm mb-1 font-medium text-gray-700">
                {t('auth.username')}
              </label>
              <input
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-4 text-left">
            <label className="block text-sm mb-1 font-medium text-gray-700">
              {t('auth.email')}
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6 text-left">
            <label className="block text-sm mb-1 font-medium text-gray-700">
              {t('auth.password')}
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading
              ? t('auth.loading')
              : isRegisterMode
                ? t('auth.register')
                : t('auth.login')}
          </Button>

          <button
            type="button"
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="w-full mt-4 text-sm text-gray-600 hover:text-primary transition-colors"
          >
            {isRegisterMode ? t('auth.haveAccount') : t('auth.noAccount')}
          </button>
        </form>

        <div className="absolute bottom-8 text-center text-gray-800 flex flex-col items-center">
          <div className="flex w-full items-center gap-2">
            <Separator className="flex-1" />
            <span>{t('auth.problems')}</span>
            <Separator className="flex-1" />
          </div>
          <a href="#" className="underline text-primary">
            {t('auth.contactSupport')}
          </a>
        </div>
      </div>
    </div>
  );
}
