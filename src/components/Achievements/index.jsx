'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Users, Briefcase, LineChart, Star, Award, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Achievements() {
  const originalAchievements = [
    {
      icon: <Trophy size={40} className="text-yellow-500" />,
      title: 'Award-Winning Service',
      description: 'Recognized for excellence in recruitment services.',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: <Users size={40} className="text-blue-500" />,
      title: 'Happy Clients',
      description: 'Successfully matched thousands of candidates with top companies.',
      countTarget: 10000,
      countPrefix: '+',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: <Briefcase size={40} className="text-emerald-500" />,
      title: 'Diverse Job Placements',
      description: 'Placed candidates in various industries worldwide.',
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: <LineChart size={40} className="text-purple-500" />,
      title: 'Consistent Growth',
      description: 'Achieved a 50% growth rate year over year.',
      countTarget: 50,
      countSuffix: '%',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
  ];

  const numClonesEachSide = 2;
  const achievements = [
    ...originalAchievements.slice(-numClonesEachSide),
    ...originalAchievements,
    ...originalAchievements.slice(0, numClonesEachSide),
  ];

  const [currentIndex, setCurrentIndex] = useState(numClonesEachSide);
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
    const duration = 1000;
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
        setCounts(targets);
      }
    };
    
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
    handleResize();
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
    setTransitionEnabled(false);
    if (currentIndex >= originalAchievements.length + numClonesEachSide) {
      setCurrentIndex(numClonesEachSide + (currentIndex % originalAchievements.length));
    } else if (currentIndex < numClonesEachSide) {
      setCurrentIndex(originalAchievements.length + currentIndex);
    }
    setTimeout(() => setTransitionEnabled(true), 50);
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
    <section className="relative py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Award className="w-4 h-4" />
            <span>Recognition & Success</span>
          </motion.div>
          
          <motion.h2 
            data-aos="fade-up" 
            className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Our{' '}
            <span className="text-gray-800">
              Achievements
            </span>
          </motion.h2>
          
          <motion.p
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Celebrating milestones and success stories that define our commitment to excellence in recruitment.
          </motion.p>
        </motion.div>

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
                  <motion.div 
                    className="relative h-full"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Card Content */}
                    <div className="relative bg-white border border-gray-200 p-6 rounded-xl shadow-sm text-center flex flex-col items-center space-y-4 transform transition-all duration-300 hover:shadow-md h-full">
                      <motion.div 
                        className={`w-16 h-16 rounded-xl ${achievement.bgColor} p-4 shadow-sm transition-all duration-300 transform hover:scale-110`}
                        whileHover={{ 
                          rotate: 360,
                          transition: { duration: 0.6 }
                        }}
                      >
                        {achievement.icon}
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-gray-800">
                        {achievement.countTarget ? (
                          <span className="text-gray-800">
                            {achievement.countPrefix}{counts[achievement.title].toLocaleString()}
                            {achievement.countSuffix}
                          </span>
                        ) : (
                          achievement.title
                        )}
                      </h3>
                      
                      <p className="text-gray-600 font-medium leading-relaxed flex-grow">
                        {achievement.description}
                      </p>
                      
                      {/* Achievement Badge */}
                      <motion.div 
                        className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Star className="w-4 h-4 fill-current" />
                        <span>Excellence</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {originalAchievements.map((_, dotIndex) => (
              <motion.button
                key={dotIndex}
                onClick={() => setCurrentIndex(dotIndex + numClonesEachSide)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer ${
                  dotIndex === activeDotIndex 
                    ? 'bg-gray-800 shadow-sm' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Achievements;