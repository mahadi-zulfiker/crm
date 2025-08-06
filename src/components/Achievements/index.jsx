"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Users, Briefcase, LineChart } from 'lucide-react'; 

function Achievements() {
  const originalAchievements = [
    {
      icon: <Trophy size={48} className="text-teal-600 mx-auto" />,
      title: 'Award-Winning Service',
      description: 'Recognized for excellence in recruitment services.',
    },
    {
      icon: <Users size={48} className="text-teal-600 mx-auto" />,
      title: '10,000+ Happy Clients',
      description: 'Successfully matched thousands of candidates with top companies.',
    },
    {
      icon: <Briefcase size={48} className="text-teal-600 mx-auto" />,
      title: 'Diverse Job Placements',
      description: 'Placed candidates in various industries worldwide.',
    },
    {
      icon: <LineChart size={48} className="text-teal-600 mx-auto" />,
      title: 'Consistent Growth',
      description: 'Achieved a 50% growth rate year over year.',
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

  // For draggable functionality
  const isDragging = useRef(false);
  const startPos = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const animationFrameId = useRef(null);

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


  const getSlideWidthAndGap = useCallback(() => {
    if (!carouselRef.current || !carouselRef.current.children[0]) return { itemWidthWithGap: 0 };
    const slideElement = carouselRef.current.children[0];
    const slideWidth = slideElement.offsetWidth;
    // p-4 on the item means 16px padding left and right.
    // If there's no margin/gap explicitly set, the 'gap' comes from this padding.
    // When items are flexed, the total width consumed per item is its content width + its own padding.
    // The "gap" between visible items is implicitly handled by `flex-shrink-0` and `width` on the container.
    // When calculating total scroll distance, we need the actual width of the item plus its horizontal padding.
    const gap = 32; // 16px left + 16px right padding from p-4
    const itemWidthWithGap = slideWidth + gap; // slideWidth is content width + border if any
    return { itemWidthWithGap };
  }, []);


  // Calculate transform style for carousel movement
  const getTransformValue = useCallback(() => {
    const { itemWidthWithGap } = getSlideWidthAndGap();
    if (itemWidthWithGap === 0) return 'translateX(0px)';

    let offset = -currentIndex * itemWidthWithGap;
    return `translateX(${offset}px)`;
  }, [currentIndex, getSlideWidthAndGap]);


  // Logic for jumping to the real slides when entering clone zones
  const handleLoopJump = useCallback(() => {
    if (!carouselRef.current) return;

    setTransitionEnabled(false); // Disable transition for instant jump

    if (currentIndex >= originalAchievements.length + numClonesEachSide) {
      // Jump from end clones to beginning of real slides
      setCurrentIndex(numClonesEachSide + (currentIndex - (originalAchievements.length + numClonesEachSide)));
    } else if (currentIndex < numClonesEachSide) {
      // Jump from beginning clones to end of real slides
      setCurrentIndex(originalAchievements.length + currentIndex);
    }
    // Re-enable transition after a very short delay to allow the DOM update to render
    setTimeout(() => {
      setTransitionEnabled(true);
    }, 50); // A small delay is often needed for the browser to register the non-transitioned jump
  }, [currentIndex, originalAchievements.length, numClonesEachSide]);

  useEffect(() => {
    // This effect runs when currentIndex changes, allowing us to perform the loop jump
    if (currentIndex >= originalAchievements.length + numClonesEachSide || currentIndex < numClonesEachSide) {
      handleLoopJump();
    }
  }, [currentIndex, originalAchievements.length, numClonesEachSide, handleLoopJump]);


  // Autoplay functionality
  useEffect(() => {
    const startAutoplay = () => {
      slideIntervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1); // Just increment, loop jump handles bounds
      }, 3000); // 3000ms = 3 seconds
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
  }, [originalAchievements.length, numClonesEachSide]); // Dependencies include cloning values for logic

  // Draggable logic
  const handleMouseDown = useCallback((e) => {
    isDragging.current = true;
    startPos.current = e.pageX || e.touches[0].pageX;
    prevTranslate.current = parseFloat(getComputedStyle(carouselRef.current).transform.split(',')[4]) || 0;
    setTransitionEnabled(false); // Disable transition during drag
    cancelAnimationFrame(animationFrameId.current);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;

    const currentPosition = e.pageX || e.touches[0].pageX;
    currentTranslate.current = prevTranslate.current + (currentPosition - startPos.current);

    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.style.transform = `translateX(${currentTranslate.current}px)`;
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const carouselElement = carouselRef.current;
    if (!carouselElement || !carouselElement.children[0]) return;

    setTransitionEnabled(true); // Re-enable transition

    const { itemWidthWithGap } = getSlideWidthAndGap();
    if (itemWidthWithGap === 0) return;

    const movedBy = currentTranslate.current - prevTranslate.current;
    let newIndex = currentIndex;

    if (Math.abs(movedBy) > itemWidthWithGap / 4) { // Threshold for a "swipe"
      if (movedBy < 0) { // Swiped left (towards higher index)
        newIndex = currentIndex + 1;
      } else { // Swiped right (towards lower index)
        newIndex = currentIndex - 1;
      }
    }

    // Snap to the calculated new index, let the getTransformValue and loop jump handle the rest
    setCurrentIndex(newIndex);
  }, [currentIndex, getSlideWidthAndGap]);


  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('mousedown', handleMouseDown);
      carouselElement.addEventListener('mousemove', handleMouseMove);
      carouselElement.addEventListener('mouseup', handleMouseUp);
      carouselElement.addEventListener('mouseleave', handleMouseUp); // End drag if mouse leaves carousel
      // For touch devices
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


  // Adjust currentTranslate when currentIndex changes (e.g., after autoplay or dot click)
  // This ensures the visual position aligns with the logical index
  useEffect(() => {
    if (!isDragging.current) { // Only update if not currently dragging
        currentTranslate.current = parseFloat(getTransformValue().replace('translateX(', '').replace('px)', ''));
        prevTranslate.current = currentTranslate.current;
    }
  }, [currentIndex, getTransformValue]);


  // Calculate the "real" index for the dots
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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
          Our Achievements
        </h2>

        <div className="relative select-none cursor-grab active:cursor-grabbing">
          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex"
              // Apply transition only when not dragging, for instant jumps
              style={{
                transform: getTransformValue(),
                transition: transitionEnabled ? 'transform 0.5s ease-in-out' : 'none',
              }}
            >
              {achievements.map((achievement, index) => (
                <div
                  key={index} // Use index, as keys need to be unique within the mapped array
                  className="flex-shrink-0 p-4"
                  style={{
                    width: slidesToShow === 1 ? '100%' :
                           slidesToShow === 2 ? '50%' :
                           '33.3333%', // Tailwind's w-1/3 equivalent
                  }}
                >
                  <div className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col items-center space-y-4 transform transition duration-500 hover:scale-105 h-full">
                    {achievement.icon}
                    <h3 className="text-xl font-semibold text-gray-800">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots - based on original achievements */}
          <div className="flex justify-center mt-4 space-x-2">
            {originalAchievements.map((_, dotIndex) => (
              <button
                key={dotIndex}
                // When clicking a dot, jump to the corresponding 'real' slide in the cloned array
                onClick={() => setCurrentIndex(dotIndex + numClonesEachSide)}
                className={`w-3 h-3 rounded-full ${
                  dotIndex === activeDotIndex ? 'bg-teal-600' : 'bg-gray-300'
                } hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Achievements;