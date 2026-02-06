import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Cherry, Star, Sparkles, Music, 
  ArrowRight, Gift, Smile, Camera, Play, Pause, SkipForward
} from 'lucide-react';

const App = () => {
  const [yesPressed, setYesPressed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef(null);
  
  // Control audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);
  
  // Handle "No" button running away
  const moveNoButton = () => {
    // Calculate movement based on viewport size (40% of width/height for aggressive dodging)
    const maxX = window.innerWidth * 0.4;
    const maxY = window.innerHeight * 0.3;
    
    const x = Math.random() * maxX * 2 - maxX; // Random position within range
    const y = Math.random() * maxY * 2 - maxY;
    setNoBtnPosition({ x, y });
  };

  const handleYesClick = () => {
    setYesPressed(true);
    setShowConfetti(true);
  };

  const polaroids = [
    {
      caption: "My Pretty Cherry 🍒",
      date: "Every single day",
      img: "/6442300d-85a6-497d-8204-9085f5f9f877.jpg",
      rotation: "rotate-2"
    },
    {
      caption: "That Smile tho...",
      date: "My favorite view",
      img: "/DSC05285.jpg",
      rotation: "-rotate-3"
    },
    {
      caption: "Us <3",
      date: "Forever kind of thing",
      img: "/DSC05061.jpg",
      rotation: "rotate-6"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF0F5] text-rose-950 font-sans selection:bg-rose-200 overflow-x-hidden relative">
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/goldensoundlabs-doodle-294642.mp3" type="audio/mpeg" />
      </audio>
      
      {/* Background Texture / Grain */}
      <div className="fixed inset-0 opacity-40 pointer-events-none z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")` }}>
      </div>

      {/* Floating Cherry & Heart Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-[10%] text-rose-300 animate-float-slow"><Heart size={24} fill="currentColor" /></div>
        <div className="absolute top-40 right-[15%] text-red-400 opacity-60 animate-float-delayed"><Cherry size={32} /></div>
        <div className="absolute bottom-32 left-[20%] text-pink-300 opacity-50 animate-pulse"><Sparkles size={40} /></div>
        <div className="absolute top-1/2 right-[5%] text-rose-200 rotate-12"><Heart size={64} fill="currentColor" /></div>
      </div>

      {/* Music Player Widget */}
      <div className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md border border-white p-3 rounded-2xl shadow-lg flex items-center gap-4 animate-in slide-in-from-top duration-700">
        <div className={`w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 ${isPlaying ? 'animate-spin-slow' : ''}`}>
          <Music size={18} />
        </div>
        <div className="hidden md:block">
          <p className="text-xs font-bold text-rose-900">Cutie for Cutiee</p>
          <p className="text-[10px] text-rose-500">Playing now...</p>
        </div>
        <button onClick={() => setIsPlaying(!isPlaying)} className="text-rose-900 hover:text-rose-500 transition-colors">
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>

      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 z-10 pt-20">
        
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/70 backdrop-blur-xl rounded-full shadow-sm mb-8 border border-white ring-4 ring-rose-50 animate-fade-in-up">
          <Cherry className="text-rose-500" size={16} />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-rose-600">Specially for my Cherry</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-medium text-rose-900 mb-6 leading-[0.9] tracking-tight relative">
          Hello, <br/>
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-500 relative z-10">
            Dārin
          </span>
          {/* Decorative halo behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-rose-200/30 blur-3xl -z-10 rounded-full"></div>
        </h1>
        
        <p className="text-lg md:text-xl text-rose-800/80 max-w-lg leading-relaxed mb-12 font-light">
          I made this because a simple text isn't enough for someone as pretty as you.
        </p>

        <div className="animate-bounce">
          <div className="w-12 h-20 border-2 border-rose-300 rounded-full flex justify-center p-2">
            <div className="w-1.5 h-3 bg-rose-400 rounded-full animate-scroll-down"></div>
          </div>
        </div>
      </header>

      {/* Marquee "Love Notes" */}
      <div className="py-4 bg-rose-500 text-white overflow-hidden relative z-20 -rotate-1 shadow-lg border-y-4 border-white">
        <div className="animate-marquee whitespace-nowrap flex gap-12 font-bold uppercase tracking-widest text-sm">
          <span>You are the prettiest</span>
          <span>★</span>
          <span>My favorite person</span>
          <span>★</span>
          <span>Cherry on top</span>
          <span>★</span>
          <span>Cute Smile</span>
          <span>★</span>
          <span>My Baby</span>
          <span>★</span>
          <span>You are the prettiest</span>
          <span>★</span>
          <span>My favorite person</span>
          <span>★</span>
          <span>Cherry on top</span>
        </div>
      </div>

      {/* Polaroid Gallery */}
      <section className="py-32 px-6 md:px-12 relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-serif text-rose-900 mb-4">My Favorite Views</h2>
          <p className="text-rose-500 italic">Every angle is a masterpiece.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 justify-items-center">
          {polaroids.map((item, idx) => (
            <div 
              key={idx}
              className={`bg-white p-4 pb-16 shadow-xl w-full max-w-sm transform transition-all duration-500 ${item.rotation} relative`}
            >
              {/* Tape Effect */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-rose-100/80 rotate-2 shadow-sm"></div>
              
              <div className="aspect-[4/5] bg-stone-100 mb-4 overflow-hidden transition-all duration-700">
                <img src={item.img} alt="Her" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 active:scale-105" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-serif text-xl text-rose-900">{item.caption}</p>
                <p className="text-xs text-rose-400 font-mono mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The Letter */}
      <section className="py-24 relative z-10 px-6">
        <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white shadow-xl relative">
          <div className="absolute -top-6 -left-6 text-rose-400 animate-spin-slow"><Star size={48} fill="#fda4af" /></div>
          <h2 className="text-3xl font-serif text-rose-900 mb-6">Dear darin,</h2>
          <p className="text-rose-900/80 text-lg leading-loose font-light">
            I don't say it enough, but thank you. Thank you for being the sweetest part of my life. You are literally the <span className="font-bold text-rose-500 bg-rose-100 px-1 rounded">cherry on top</span> of my every day. I love your smile, your laugh, and even the way you get mad sometimes (still cute though). 
            <br/><br/>
            I appreciate everything you are. You make me want to be better. I love you so much, Baby.
          </p>
          <div className="mt-8 flex justify-end">
             <div className="font-serif italic text-xl text-rose-500">- dada</div>
          </div>
        </div>
      </section>

      {/* The Proposal */}
      <section className="min-h-screen flex items-center justify-center px-6 relative z-10 pb-24 overflow-hidden">
        {!yesPressed ? (
          <div className="relative text-center max-w-2xl w-full">
            <div className="mb-8 relative inline-block">
              <Heart size={100} className="text-red-500 fill-red-500 animate-pulse drop-shadow-2xl" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-serif text-rose-900 mb-6 leading-tight">
              Will you be my <br/> <span className="text-red-500 italic">Valentine?</span>
            </h2>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center mt-12 h-32 relative">
              <button 
                onClick={handleYesClick}
                className="px-12 py-4 bg-red-500 text-white rounded-full font-bold text-xl hover:bg-red-600 hover:scale-110 hover:shadow-2xl hover:shadow-red-500/40 transition-all duration-300 z-20"
              >
                YES, Of Course! 🍒
              </button>
              
              <button 
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                onTouchMove={moveNoButton}
                onClick={handleYesClick} // Fallback if she manages to click it
                style={{ 
                  transform: `translate(${noBtnPosition.x}px, ${noBtnPosition.y}px)`,
                  transition: 'all 0.1s ease-out'
                }}
                className="px-12 py-4 bg-white text-rose-400 border-2 border-rose-200 rounded-full font-bold text-xl hover:bg-rose-50 active:bg-rose-100 transition-all z-10"
              >
                No
              </button>
            </div>
            <p className="text-rose-300 text-sm mt-12 animate-pulse">
              (Warning: The "No" button is broken 😉)
            </p>
          </div>
        ) : (
          <div className="text-center animate-in zoom-in duration-700 relative z-50">
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 animate-bounce">🥰🍒💖</div>
            <h2 className="text-5xl md:text-8xl font-serif text-rose-900 mb-6 drop-shadow-sm">
              YAAAAAY!
            </h2>
            <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-white inline-block">
                <p className="text-2xl text-rose-600 leading-relaxed font-medium">
                It's a date, Baby! <br/>
                Get ready to be spoiled.
                </p>
                <p className="text-sm text-rose-400 mt-4 uppercase tracking-widest">
                    Screenshot this and send it to me!
                </p>
            </div>
          </div>
        )}

        {/* Confetti Effect (Simple CSS implementation) */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div 
                key={i}
                className="absolute animate-fall"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animationDuration: `${Math.random() * 3 + 2}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              >
                {Math.random() > 0.5 ? '❤️' : '🍒'}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Custom Styles for Tailwind */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes scroll-down {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(12px); opacity: 0; }
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(360deg); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite 2s; }
        .animate-scroll-down { animation: scroll-down 2s infinite; }
        .animate-marquee { animation: marquee 20s linear infinite; }
        .animate-spin-slow { animation: spin 8s linear infinite; }
        .animate-fall { animation: fall linear forwards; }
      `}</style>

    </div>
  );
};

export default App;
