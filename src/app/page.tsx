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
import { motion } from 'framer-motion';
import Link from 'next/link';
import { QuoteOpen, QuoteClose } from './components/QuoteIcons';
import Modal from './components/Modal';

const memyselfandi = '/000001.JPG';

// Définir les témoignages
const testimonials = [
  {
    text: 'Cyril is very available, provides regular updates on progress, and the result exceeded initial expectations! I highly recommend this developer.',
    author: 'Emmanuel P.',
    title: 'Event photographer',
  },
  {
    text: 'I asked Cyril to program a Back Office for me so that I could manage my content independently. The result is remarkable, I am more than satisfied and delighted to have used his services once again!',
    author: 'Filo S.',
    title: 'Editor',
  },
  {
    text: 'Cyril managed to instill creative ideas to set me apart from other existing sites. He meets deadlines, he is involved and I was aware of all the steps.',
    author: 'Christel M.',
    title: 'Career coach',
  },
  {
    text: 'Cyril, who was very open to feedback, well organized and autonomous, is a pleasant person to work with. We highly recommend him and will work with him again in the future.',
    author: 'Alejandrina C.',
    title: 'NGO manager',
  },
  {
    text: 'This is the second mission that I have entrusted to Cyril. He had taken over the Front-end of my site and he has just taken over the entire Back-end as well. His full-stack skills are incredible!',
    author: 'Filo S.',
    title: 'Editor',
  },
];

const Home: FC = () => {
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
  }, []);

  const openModal = (type: string) => {
    setShowModal({ open: true, type });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12">
      {showModal.open && (
        <Modal
          type={showModal.type}
          onClose={() => setShowModal({ open: false, type: '' })}
        />
      )}
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-start gap-20 px-6 md:px-12">
        <div className="flex-1">
          <p className="text-3xl text-gray-900 mb-2">
            You&apos;re no longer the one who best talks about yourself. Google
            and AI now tell your story.
          </p>
          <h1 className="text-5xl font-bold mb-10 leading-tight">
            <motion.span
              initial={{ color: '#5780f5' }}
              animate={{ color: ['#5780f5', '#000'] }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            >
              Be there.
              <br />
              Build an amazing website!
            </motion.span>
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            <div className="col-span-2 mb-0">
              <p className="text-lg text-gray-900">
                Are you self-employed, responsible for an SME, or a marketing
                director? Discover my skills, references, and offers:
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Link2 className="text-blue-normal w-6 h-6" />
              <Link
                href="https://hyper-free.cyrildegraeve.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-lg text-link">
                  My offers (Hyper-Free)
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Link2 className="text-blue-normal w-6 h-6" />
              <Link
                href="https://www.cyrildegraeve.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-lg text-link">Portfolio</span>
              </Link>
            </div>
            <div className="col-span-2 mb-0 mt-2">
              <p className="text-lg text-gray-900">
                If you&apos;re building a team of developers, or if you&apos;re
                a CTO, CEO, business engineer, check out my CV and a detailed
                file on my technical achievements for a comprehensive overview
                of my work:
              </p>
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
                className="text-lg text-link no-underlinee"
              >
                Technical File
              </button>
            </div>
          </div>
          <div className="flex space-x-4 mb-10">
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
                  <span>Reserve a slot now!</span>
                </div>
              </motion.button>
            </Link>
          </div>
        </div>
        <div className="relative flex-1 lg:flex-2">
          <Image
            src={memyselfandi}
            alt="Myself"
            width={600}
            height={600}
            className="rounded-lg w-full h-auto"
          />
          <p className="text-center text-xl text-gray-700 mt-4 font-semibold">
            Cyril De Graeve, Fullstack Web & Mobile Web Developer
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Mail className="text-black w-6 h-6" />
            <span className="text-lg text-gray-700 font-normal">
              contact@cyrildegraeve.dev
            </span>
          </div>

          <div className="flex items-center justify-center text-gray-700 space-x-2 mt-4">
            <span className="text-gray-700">Also we&apos;ll meet again :</span>
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
            <p className="text-lg italic mb-4">
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
  );
};

export default Home;
