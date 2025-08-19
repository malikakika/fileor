import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Instagram, Send } from 'lucide-react';

export default function ContactPage() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call  API here
    alert(t('contact.thanks'));
    setName(''); setEmail(''); setMsg('');
  };

  return (
    <div className="min-h-screen bg-sand text-ink">
      <div className="bg-gradient-to-br from-sunset to-berry py-16 px-4 text-center text-white">
        <h1 className="text-4xl font-extrabold mb-3">{t('contact.title')}</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">{t('contact.subtitle')}</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-lg font-semibold mb-3">{t('contact.reachUs')}</h2>
            <ul className="space-y-3 text-ink">
              <li className="flex items-center gap-2"><Mail size={18}/> <a href="mailto:contact@fileor.local" className="hover:underline">contact@fileor.local</a></li>
              <li className="flex items-center gap-2"><Phone size={18}/> <a href="tel:+33000000000" className="hover:underline">+33 0 00 00 00 00</a></li>
              <li className="flex items-center gap-2"><MapPin size={18}/> <span>{t('contact.cityCountry')}</span></li>
              <li className="flex items-center gap-2"><Instagram size={18}/> <a className="hover:underline" href="https://www.instagram.com/fileor_kika/" target="_blank" rel="noreferrer">@fileor_kika</a></li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-5">
            <h3 className="font-semibold mb-2">{t('contact.hoursTitle')}</h3>
            <p className="text-sm leading-6 text-gray-700">{t('contact.hours')}</p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{t('contact.formTitle')}</h2>
            <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                required
                value={name}
                onChange={e=>setName(e.target.value)}
                placeholder={t('contact.name')}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sunset"
              />
              <input
                required
                type="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                placeholder={t('contact.email')}
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sunset"
              />
              <textarea
                required
                value={msg}
                onChange={e=>setMsg(e.target.value)}
                placeholder={t('contact.message')}
                className="md:col-span-2 border rounded px-3 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-sunset"
              />
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-sunset text-white px-5 py-2 rounded-full hover:bg-berry transition inline-flex items-center gap-2"
                >
                  <Send size={18}/> {t('contact.send')}
                </button>
              </div>
            </form>
          </div>

       
        </div>
      </div>
    </div>
  );
}
