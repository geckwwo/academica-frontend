import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MainContent from '@/components/dashboard/MainContent';
import NotificationsPanel from '@/components/dashboard/NotificationsPanel';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Left Block - Main Content */}
            <MainContent />

            {/* Right Block - Notifications */}
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
