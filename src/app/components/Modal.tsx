import React, { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Modal: FC<{ onClose: () => void, type: string }> = ({ onClose, type }) => {
  const isCv = type === 'cv';
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
        <h2 className="text-lg font-bold mb-4">{isCv ? "Curriculum Vitae" : "Technical File"}</h2>
        <div className="flex flex-col space-y-4">
          <Link href={isCv ? "/CV_EN_CyrilDeGraeve.pdf" : "/TekFile_EN.pdf"} target="_blank" rel="noopener noreferrer">
            <button className="w-full bg-blue-light text-gray-700 py-2 rounded hover:bg-blue-light-trans">
              EN version
            </button>
          </Link>
          <Link href={isCv ? "/CV_FR_CyrilDeGraeve.pdf" : "/TekFile_FR.pdf"} target="_blank" rel="noopener noreferrer">
            <button className="w-full bg-blue-light text-gray-700 py-2 rounded hover:bg-blue-light-trans">
              FR version
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;