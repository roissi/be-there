import React, { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Modal: FC<{ onClose: () => void; type: string }> = ({
  onClose,
  type,
}) => {
  const getTitle = () => {
    switch (type) {
      case 'cv':
        return 'Curriculum Vitae';
      case 'technicalFile':
        return 'Technical File';
      case 'offers':
        return 'My Offers';
      case 'portfolio':
        return 'Portfolio';
      default:
        return 'Information';
    }
  };

  const getLinks = () => {
    switch (type) {
      case 'cv':
        return [
          { label: 'EN version', href: '/CV_EN_CyrilDeGraeve.pdf' },
          { label: 'FR version', href: '/CV_FR_CyrilDeGraeve.pdf' },
        ];
      case 'technicalFile':
        return [
          { label: 'EN version', href: '/TekFile_EN.pdf' },
          { label: 'FR version', href: '/TekFile_FR.pdf' },
        ];
      case 'offers':
        return [
          {
            label: 'EN version',
            href: 'https://hyper-free.cyrildegraeve.dev/en',
          },
          {
            label: 'FR version',
            href: 'https://hyper-free.cyrildegraeve.dev/',
          },
        ];
      case 'portfolio':
        return [
          { label: 'EN version', href: 'https://www.cyrildegraeve.dev/en' },
          { label: 'FR version', href: 'https://www.cyrildegraeve.dev/' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg relative overflow-visible"
      >
        {/* Close Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 cursor-pointer absolute top-4 right-4"
          onClick={onClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h2 className="text-lg font-bold mb-4">{getTitle()}</h2>
        <div className="flex flex-col space-y-4">
          {getLinks().map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full bg-blue-light text-link no-underline py-2">
                {link.label}
              </button>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
