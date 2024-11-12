'use client';
import React, { useState, useEffect } from 'react';
import { FC } from 'react';
import { Link2, CloudDownload, Mail, Phone } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faGithub,
  faSquareXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { QuoteOpen, QuoteClose } from './components/QuoteIcons';
import Modal from './components/Modal';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const memyselfandi = '/000001.JPG';

const Home: FC = () => {
  const t = useTranslations('HomePage');
  const testimonials = t.raw('testimonials') as Array<{
    text: string;
    author: string;
    title: string;
  }>;
  const router = useRouter();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showModal, setShowModal] = useState({ open: false, type: '' });

  // Utiliser useEffect pour changer de témoignage toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const openModal = (type: string) => {
    setShowModal({ open: true, type });
  };

  const changeLanguage = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/`;
    router.refresh(); // Force un rafraîchissement de la page pour appliquer la nouvelle langue
  };

  return (
    <>
      <Head>
        {/* JSON-LD pour Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
        {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Cyril De Graeve",
      "jobTitle": "Fullstack Web & Mobile Developer",
      "url": "https://bethere.cyrildegraeve.dev",
      "sameAs": [
        "https://www.linkedin.com/in/cyril-de-graeve/",
            "https://github.com/roissi"
          ]
        }
      `,
          }}
        />
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
        {showModal.open && (
          <Modal
            type={showModal.type}
            onClose={() => setShowModal({ open: false, type: '' })}
          />
        )}
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-start gap-20 px-6 md:px-12">
          <div className="flex-1">
            {/* Boutons pour changer la langue */}
            <div className="flex space-x-2 mb-6">
              <button
                onClick={() => changeLanguage('en')}
                className="text-xs px-2 py-1 border rounded-lg text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('fr')}
                className="text-xs px-2 py-1 border rounded-lg text-gray-700 border-gray-300 hover:bg-gray-100"
              >
                FR
              </button>
            </div>

            <p className="text-3xl text-gray-900 mb-2">{t('intro')}</p>
            <h1 className="text-5xl font-bold mb-10 leading-tight">
              <motion.span
                initial={{ color: '#5780f5' }}
                animate={{ color: ['#5780f5', '#000'] }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              >
                {t('punchline')
                  .split('\n')
                  .map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
              </motion.span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="col-span-2 mb-0">
                <h2 className="text-lg text-gray-900">{t('package')}</h2>
              </div>
              <div className="flex items-center space-x-3">
                <Link2 className="text-blue-normal w-6 h-6" />
                <button
                  onClick={() => openModal('offers')}
                  className="text-lg text-link no-underline"
                >
                  {t('offers')}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <Link2 className="text-blue-normal w-6 h-6" />
                <button
                  onClick={() => openModal('portfolio')}
                  className="text-lg text-link no-underline"
                >
                  Portfolio
                </button>
              </div>
              <div className="col-span-2 mb-0 mt-2">
                <h2 className="text-lg text-gray-900">{t('tjm')}</h2>
              </div>
              <div className="flex items-center space-x-3">
                <CloudDownload className="text-blue-normal w-6 h-6" />
                <button
                  onClick={() => openModal('cv')}
                  className="text-lg text-link no-underline"
                >
                  Curriculum Vitae
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <CloudDownload className="text-blue-normal w-6 h-6" />
                <button
                  onClick={() => openModal('technicalFile')}
                  className="text-lg text-link no-underline"
                >
                  {t('tekfile')}
                </button>
              </div>
            </div>
            <div className="flex space-x-4 mb-10 justify-center md:justify-start">
              <Link
                href="https://calendly.com/cyrildegraeve/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  className="btn-blue hover:bg-blue text-white px-6 py-3 rounded-lg font-medium"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [1, 0.8, 1],
                    transition: { repeat: 3, duration: 1, ease: 'easeInOut' },
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-2">
                    <Phone className="text-white w-6 h-6" />
                    <span>{t('slot')}</span>
                  </div>
                </motion.button>
              </Link>
            </div>
          </div>
          <div className="relative flex-1 lg:flex-2">
            <Image
              src={memyselfandi}
              alt="Cyril De Graeve - Fullstack Web & Mobile Developer"
              width={600}
              height={600}
              className="rounded-lg w-full h-auto"
            />
            <h3 className="text-center text-xl text-gray-700 mt-12 xs:mt-4 font-semibold">
              {t('me')}
            </h3>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <Mail className="text-black w-6 h-6" />
              <span className="text-lg text-gray-700 font-normal">
                contact@cyrildegraeve.dev
              </span>
            </div>

            <div className="flex items-center justify-center text-gray-700 space-x-2 mt-4">
              <span className="text-gray-700">{t('meetagain')}</span>
              <div className="flex space-x-0">
                <Link
                  href="https://www.linkedin.com/in/cyril-de-graeve/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="text-black w-10 sm:w-12 scale-150"
                  />
                </Link>
                <Link
                  href="https://x.com/roissi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faSquareXTwitter}
                    className="text-black w-10 sm:w-12 scale-150"
                  />
                </Link>
                <Link
                  href="https://github.com/roissi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon
                    icon={faGithub}
                    className="text-black w-10 sm:w-12 scale-150"
                  />
                </Link>
              </div>
            </div>

            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute top-[20px] right-[-10px] md:top-[20px] md:right-[-40px] transform md:translate-x-2 -translate-y-2 bg-blue-normal-trans text-white p-4 rounded-lg shadow-xl w-[220px] text-center"
            >
              <div className="flex items-start justify-start mb-4">
                <QuoteOpen color="#ffffff" />
              </div>
              <p className="text-mds lg:text-lg italic mb-4">
                {testimonials[currentTestimonial].text}
              </p>
              <p className="text-sm mt-4">
                {testimonials[currentTestimonial].author}
              </p>
              <p className="text-sm text-gray-200">
                {testimonials[currentTestimonial].title}
              </p>
              <div className="flex items-end justify-end mt-4">
                <QuoteClose color="#ffffff" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
