import React, { useState, useEffect } from "react";

const DadInMyPocket = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [letters, setLetters] = useState([]);
  const [newLetter, setNewLetter] = useState("");
  const [showLetterForm, setShowLetterForm] = useState(false);
  const [memories, setMemories] = useState([]);
  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [newMemoryTitle, setNewMemoryTitle] = useState("");
  const [newMemoryText, setNewMemoryText] = useState("");
  const [dadResponses] = useState([
    "I am so proud of you.",
    "You have got this, kiddo.",
    "I love you more than all the stars.",
    "You make me smile every day.",
    "You are stronger than you know.",
    "Keep being amazing.",
    "I miss you too, sweetheart.",
    "You light up my world.",
    "I believe in you, always."
  ]);
  const [randomResponse, setRandomResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [dailyPrompt, setDailyPrompt] = useState("");
  const [breatheCount, setBreatheCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [particles, setParticles] = useState([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoCaption, setPhotoCaption] = useState(
    "2025 - Distance means nothing when someone means everything"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [moodHistory, setMoodHistory] = useState([]);
  const [virtualHug, setVirtualHug] = useState(false);
  const [gratitudeList, setGratitudeList] = useState([]);
  const [newGratitude, setNewGratitude] = useState("");
  const [showGratitudeForm, setShowGratitudeForm] = useState(false);

  const prompts = [
    "What would Dad say about your day?",
    "What did Dad teach you that you used today?",
    "What is your favorite memory with Dad?",
    "What makes you smile when you think of Dad?",
    "How are you feeling today?",
    "What would Dad be proud of you for?",
    "What advice from Dad has stuck with you?"
  ];

  const moods = [
    { emoji: "😊", label: "Happy", color: "bg-yellow-400" },
    { emoji: "😢", label: "Missing him", color: "bg-blue-400" },
    { emoji: "💪", label: "Strong", color: "bg-green-400" },
    { emoji: "😔", label: "Sad", color: "bg-gray-400" },
    { emoji: "❤️", label: "Grateful", color: "bg-pink-400" },
    { emoji: "😌", label: "Peaceful", color: "bg-purple-400" }
  ];

  // Load saved data
  useEffect(() => {
    const load = () => {
      const lettersData = localStorage.getItem("letters");
      if (lettersData) setLetters(JSON.parse(lettersData));

      const memoriesData = localStorage.getItem("memories");
      if (memoriesData) setMemories(JSON.parse(memoriesData));

      const photoData = localStorage.getItem("photo");
      if (photoData) setPhotoUrl(photoData);

      const captionData = localStorage.getItem("caption");
      if (captionData) setPhotoCaption(captionData);

      const moodData = localStorage.getItem("moods");
      if (moodData) setMoodHistory(JSON.parse(moodData));

      const gratitudeData = localStorage.getItem("gratitude");
      if (gratitudeData) setGratitudeList(JSON.parse(gratitudeData));
    };

    load();

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    setDailyPrompt(prompts[new Date().getDate() % prompts.length]);

    const p = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6
    }));

    setParticles(p);

    setTimeout(() => setIsLoading(false), 500);

    return () => clearInterval(timer);
  }, []);

  const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const writeLetter = () => {
    if (!newLetter.trim()) return;

    const letter = {
      id: Date.now(),
      text: newLetter,
      date: new Date().toLocaleDateString()
    };

    const updated = [letter, ...letters];
    setLetters(updated);
    save("letters", updated);

    setNewLetter("");
    setShowLetterForm(false);

    setTimeout(() => {
      setRandomResponse(
        dadResponses[Math.floor(Math.random() * dadResponses.length)]
      );
      setShowResponse(true);
      setTimeout(() => setShowResponse(false), 6000);
    }, 800);
  };

  const addMemory = () => {
    if (!newMemoryTitle.trim() || !newMemoryText.trim()) return;

    const memory = {
      id: Date.now(),
      title: newMemoryTitle,
      text: newMemoryText,
      date: new Date().toLocaleDateString()
    };

    const updated = [memory, ...memories];
    setMemories(updated);
    save("memories", updated);

    setNewMemoryTitle("");
    setNewMemoryText("");
    setShowMemoryForm(false);
  };

  const addGratitude = () => {
    if (!newGratitude.trim()) return;

    const g = {
      id: Date.now(),
      text: newGratitude,
      date: new Date().toLocaleDateString()
    };

    const updated = [g, ...gratitudeList];
    setGratitudeList(updated);
    save("gratitude", updated);

    setNewGratitude("");
    setShowGratitudeForm(false);
  };

  const trackMood = (m) => {
    const entry = {
      id: Date.now(),
      mood: m,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    const updated = [entry, ...moodHistory];
    setMoodHistory(updated);
    save("moods", updated);

    setShowMoodTracker(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setPhotoUrl(dataUrl);
      localStorage.setItem("photo", dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const startBreathing = () => {
    setIsBreathing(true);
    setBreatheCount(0);

    const interval = setInterval(() => {
      setBreatheCount((prev) => {
        if (prev >= 5) {
          clearInterval(interval);
          setIsBreathing(false);
          return 0;
        }
        return prev + 1;
      });
    }, 4000);
  };

  const sendVirtualHug = () => {
    setVirtualHug(true);
    setTimeout(() => setVirtualHug(false), 3000);
  };

  const deleteLetter = (id) => {
    const updated = letters.filter((l) => l.id !== id);
    setLetters(updated);
    save("letters", updated);
  };

  const deleteMemory = (id) => {
    const updated = memories.filter((m) => m.id !== id);
    setMemories(updated);
    save("memories", updated);
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
        <div className="text-center">
          <div className="text-6xl mb-4">❤️</div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen p-4 md:p-8 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 overflow-hidden">

      {/* floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-purple-300 pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            opacity: 0.4
          }}
        />
      ))}

      {/* EVERYTHING BELOW THIS IS UI ONLY — removed for length here */}

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50% { transform: translate(-20px, -20px) scale(1.1); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default DadInMyPocket;
