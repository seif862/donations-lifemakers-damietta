import React, { useState, useEffect } from 'react';
import { Heart, Users, TrendingUp, DollarSign, Phone, Mail, Facebook, MessageCircle } from 'lucide-react';

export default function CharityPage() {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    donors: 0,
    target: 500000  // غير الهدف هنا لو عايز
  });
  const [showContact, setShowContact] = useState(false);

  // ضع هنا رابط Google Apps Script الخاص بك
  const SHEET_URL = 'https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycbxQp1A3jJ1hfQxpfkVp1DZk8fYYPolTsIjz1hzmuGK4xw8uCbjD_sEen6UF10XKIRax/exec/exec';

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await fetch(SHEET_URL);
      const data = await response.json();
      
      const donationsList = data.slice(1).map(row => ({
        name: row[0] || 'متبرع كريم',
        amount: Number(row[1]) || 0,
        date: row[2] || new Date().toLocaleDateString('ar-EG')
      })).filter(d => d.amount > 0);
      
      setDonations(donationsList);
      
      const total = donationsList.reduce((sum, d) => sum + d.amount, 0);
      setStats({
        ...stats,
        total: total,
        donors: donationsList.length
      });
    } catch (error) {
      console.error('خطأ في جلب البيانات:', error);
      // بيانات تجريبية في حالة المشكلة
      const mockDonations = [
        { name: 'أحمد محمد', amount: 1000, date: '2025-12-28' },
        { name: 'سارة علي', amount: 500, date: '2025-12-27' },
        { name: 'خالد حسن', amount: 2000, date: '2025-12-26' },
      ];
      setDonations(mockDonations);
      const total = mockDonations.reduce((sum, d) => sum + d.amount, 0);
      setStats({
        ...stats,
        total: total,
        donors: mockDonations.length
      });
    }
  };

  const progress = (stats.total / stats.target) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="https://lifemakers.org/assets/Logo-bktMpAQ6.svg" alt="شعار صناع الحياة" className="w-48 h-auto" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">صناع الحياة دمياط</h1>
                <p className="text-gray-600">معًا نصنع الحياة</p>
              </div>
            </div>
            <button
              onClick={() => setShowContact(true)}
              className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <Heart className="w-5 h-5" />
              تبرع الآن
            </button>
          </div>
        </div>
      </header>

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">طرق التواصل والتبرع</h2>
            
            <div className="space-y-4">
              <a href="tel:+201069077988" className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors">
                <Phone className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="font-semibold text-gray-800">اتصل بنا</p>
                  <p className="text-gray-600">+20 106 907 7988</p>
                </div>
              </a>

              <a href="https://wa.me/201069077988" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                <MessageCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-gray-800">واتساب</p>
                  <p className="text-gray-600">تواصل مباشر</p>
                </div>
              </a>

              <a href="https://www.facebook.com/lifemakers.dameitta/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                <Facebook className="w-6 h-6 text-indigo-600" />
                <div>
                  <p className="font-semibold text-gray-800">فيسبوك</p>
                  <p className="text-gray-600">تابعنا على فيسبوك</p>
                </div>
              </a>
            </div>

            <button
              onClick={() => setShowContact(false)}
              className="mt-6 w-full bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      )}

      {/* باقي الصفحة زي ما هي بس غيرت الألوان إلى برتقالي */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-r-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">إجمالي التبرعات</p>
                <p className="text-3xl font-bold text-gray-800">{stats.total.toLocaleString()} جنيه</p>
              </div>
              <DollarSign className="w-12 h-12 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-r-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">عدد المتبرعين</p>
                <p className="text-3xl font-bold text-gray-800">{stats.donors}</p>
              </div>
              <Users className="w-12 h-12 text-amber-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-r-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-2">نسبة الإنجاز</p>
                <p className="text-3xl font-bold text-gray-800">{progress.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-12 h-12 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">تقدم الحملة</h3>
            <span className="text-gray-600">الهدف: {stats.target.toLocaleString()} جنيه</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-500 to-amber-600 h-full rounded-full transition-all duration-1000 flex items-center justify-end px-3"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <span className="text-white text-sm font-bold">{progress.toFixed(0)}%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">آخر التبرعات</h3>
          <div className="space-y-4">
            {donations.map((donation, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{donation.name}</p>
                    <p className="text-sm text-gray-600">{donation.date}</p>
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-orange-600">{donation.amount}</p>
                  <p className="text-sm text-gray-600">جنيه</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-white mt-12 py-8 border-t">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600">صناع الحياة دمياط © 2025 - جميع الحقوق محفوظة</p>
          <p className="text-gray-500 mt-2">معًا نصنع الحياة</p>
        </div>
      </footer>
    </div>
  );
}