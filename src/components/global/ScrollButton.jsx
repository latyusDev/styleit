import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 7000) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
 
    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
  {/* Scroll to Top Button */}
  {isVisible && (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-4 cursor-pointer rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-6 z-50 border-4 border-white animate-bounce"
      style={{
        backgroundColor: '#FF617C'
      }}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-8 h-8 text-white" strokeWidth={3} />
    </button>
  )}
</div>
  );
}