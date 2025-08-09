'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Users, Briefcase, LineChart } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Achievements() {
  const originalAchievements = [
    {
      icon: <Trophy size={48} className="text-teal-500 mx-auto" />,
      title: 'Award-Winning Service',
      description: 'Recognized for excellence in recruitment services.',
    },
    {
      icon: <Users size={48} className="text-teal-500 mx-auto" />,
      title: 'Happy Clients',
      description: 'Successfully matched thousands of candidates with top companies.',
      countTarget: 10000,
      countPrefix: '+',
    },
    {
      icon: <Briefcase size={48} className="text-teal-500 mx-auto" />,
      title: 'Diverse Job Placements',
      description: 'Placed candidates in various industries worldwide.',
    },
    {
      icon: <LineChart size={48} className="text-teal-500 mx-auto" />,
      title: 'Consistent Growth',
      description: 'Achieved a 50% growth rate year over year.',
      countTarget: 50,
      countSuffix: '%',
    },
  ];

  const numClonesEachSide = 2;
  const achievements = [
    ...originalAchievements.slice(-numClonesEachSide),
    ...originalAchievements,
    ...originalAchievements.slice(0, numClonesEachSide),
  ];

  const [currentIndex, setCurrentIndex] = useState(numClonesEachSide); // Start at the first 'real' slide
  const [slidesToShow, setSlidesToShow] = useState(3);
  const carouselRef = useRef(null);
  const slideIntervalRef = useRef(null);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  // State for the dynamic counters
  const [counts, setCounts] = useState({
    'Happy Clients': 0,
    'Consistent Growth': 0,
  });

  const getTarget = (title) => {
    const achievement = originalAchievements.find(a => a.title === title);
    return achievement ? achievement.countTarget : 0;
  };
  
  // Counting animation effect
  useEffect(() => {
    let animationFrameId;
    const targets = {
      'Happy Clients': getTarget('Happy Clients'),
      'Consistent Growth': getTarget('Consistent Growth')
    };
    const start = {
      'Happy Clients': 0,
      'Consistent Growth': 0,
    };
    const duration = 1000; // 1 second
    let startTime = null;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const increment = Math.min(1, progress / duration);
      
      setCounts({
        'Happy Clients': Math.floor(increment * targets['Happy Clients']),
        'Consistent Growth': Math.floor(increment * targets['Consistent Growth']),
      });

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setCounts(targets); // Ensure final value is accurate
      }
    };
    
    // Only start animation on component mount
    animationFrameId = requestAnimationFrame(animateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // For draggable functionality
  const isDragging = useRef(false);
  const startPos = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);

  // Determine how many slides to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate transform value for carousel movement
  const getTransformValue = useCallback(() => {
    if (!carouselRef.current) return 'translateX(0px)';
    const itemWidth = carouselRef.current.children[0]?.offsetWidth || 0;
    const offset = -currentIndex * itemWidth;
    return `translateX(${offset}px)`;
  }, [currentIndex]);

  // Logic for jumping to the real slides when entering clone zones
  const handleLoopJump = useCallback(() => {
    if (!carouselRef.current) return;
    setTransitionEnabled(false); // Disable transition for instant jump
    if (currentIndex >= originalAchievements.length + numClonesEachSide) {
      setCurrentIndex(numClonesEachSide + (currentIndex % originalAchievements.length));
    } else if (currentIndex < numClonesEachSide) {
      setCurrentIndex(originalAchievements.length + currentIndex);
    }
    setTimeout(() => setTransitionEnabled(true), 50); // A small delay is needed
  }, [currentIndex, originalAchievements.length, numClonesEachSide]);

  useEffect(() => {
    if (currentIndex >= originalAchievements.length + numClonesEachSide || currentIndex < numClonesEachSide) {
      handleLoopJump();
    }
  }, [currentIndex, originalAchievements.length, numClonesEachSide, handleLoopJump]);

  // Autoplay functionality
  useEffect(() => {
    const startAutoplay = () => {
      slideIntervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 3000);
    };
    const stopAutoplay = () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
    startAutoplay();
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('mouseenter', stopAutoplay);
      carouselElement.addEventListener('mouseleave', startAutoplay);
    }
    return () => {
      stopAutoplay();
      if (carouselElement) {
        carouselElement.removeEventListener('mouseenter', stopAutoplay);
        carouselElement.removeEventListener('mouseleave', startAutoplay);
      }
    };
  }, [originalAchievements.length, numClonesEachSide]);

  // Draggable logic
  const handleMouseDown = useCallback((e) => {
    isDragging.current = true;
    startPos.current = e.pageX || e.touches[0].pageX;
    prevTranslate.current = parseFloat(getComputedStyle(carouselRef.current).transform.split(',')[4]) || 0;
    setTransitionEnabled(false);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const currentPosition = e.pageX || e.touches[0].pageX;
    currentTranslate.current = prevTranslate.current + (currentPosition - startPos.current);
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setTransitionEnabled(true);
    const itemWidth = carouselRef.current?.children[0]?.offsetWidth || 0;
    if (itemWidth === 0) return;
    const movedBy = currentTranslate.current - prevTranslate.current;
    let newIndex = currentIndex;
    if (Math.abs(movedBy) > itemWidth / 4) {
      if (movedBy < 0) {
        newIndex = currentIndex + 1;
      } else {
        newIndex = currentIndex - 1;
      }
    }
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('mousedown', handleMouseDown);
      carouselElement.addEventListener('mousemove', handleMouseMove);
      carouselElement.addEventListener('mouseup', handleMouseUp);
      carouselElement.addEventListener('mouseleave', handleMouseUp);
      carouselElement.addEventListener('touchstart', handleMouseDown);
      carouselElement.addEventListener('touchmove', handleMouseMove);
      carouselElement.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('mousedown', handleMouseDown);
        carouselElement.removeEventListener('mousemove', handleMouseMove);
        carouselElement.removeEventListener('mouseup', handleMouseUp);
        carouselElement.removeEventListener('mouseleave', handleMouseUp);
        carouselElement.removeEventListener('touchstart', handleMouseDown);
        carouselElement.removeEventListener('touchmove', handleMouseMove);
        carouselElement.removeEventListener('touchend', handleMouseUp);
      }
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (!isDragging.current) {
      currentTranslate.current = parseFloat(getTransformValue().replace('translateX(', '').replace('px)', ''));
      prevTranslate.current = currentTranslate.current;
    }
  }, [currentIndex, getTransformValue]);

  const getRealIndex = (index) => {
    if (index < numClonesEachSide) {
      return originalAchievements.length - (numClonesEachSide - index);
    }
    if (index >= originalAchievements.length + numClonesEachSide) {
      return index - (originalAchievements.length + numClonesEachSide);
    }
    return index - numClonesEachSide;
  };
  const activeDotIndex = getRealIndex(currentIndex);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-teal-50">
      <div className="container mx-auto px-4">
        <h2 data-aos="fade-up" className="text-5xl font-extrabold text-center text-gray-800 mb-12">
          Our Achievements
        </h2>

        <div className="relative select-none">
          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex"
              style={{
                transform: getTransformValue(),
                transition: transitionEnabled ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
              }}
            >
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 p-4 cursor-pointer"
                  style={{
                    flexBasis: slidesToShow === 1 ? '100%' : slidesToShow === 2 ? '50%' : '33.3333%',
                  }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                >
                  <div className="bg-white p-8 rounded-3xl shadow-xl text-center flex flex-col items-center space-y-4 transform transition-all duration-500 hover:scale-105 h-full border border-gray-200 hover:border-teal-300">
                    <div className="bg-teal-50 p-4 rounded-full transition-all duration-300 transform hover:scale-110">
                      {achievement.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {achievement.countTarget ? (
                        <>
                          {achievement.countPrefix}{counts[achievement.title].toLocaleString()}
                          {achievement.countSuffix}
                        </>
                      ) : (
                        achievement.title
                      )}
                    </h3>
                    <p className="text-gray-600 font-medium">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots - based on original achievements */}
          <div className="flex justify-center mt-8 space-x-2">
            {originalAchievements.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setCurrentIndex(dotIndex + numClonesEachSide)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  dotIndex === activeDotIndex ? 'bg-teal-600' : 'bg-gray-300'
                } hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600 cursor-pointer`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Achievements;