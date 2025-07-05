import { useEffect, useState } from "react";

const teamMembers = [
  {
    name: "Always use a stop-loss",
    role: "Rule 1",
    desc: "Using a stop-loss ensures that you limit your potential losses during volatile market conditions. It’s a risk management tool that automatically exits a position once it reaches a predetermined price, protecting your capital from severe drawdowns and emotional decision-making.",
  },
  {
    name: "Risk only what you can afford",
    role: "Rule 2",
    desc: "Only invest money that you are willing and financially able to lose. Crypto markets are highly unpredictable, and putting your savings or essential funds at risk can lead to financial distress and emotional pressure, affecting your trading discipline and decisions.",
  },
  {
    name: "Never chase losses",
    role: "Rule 3",
    desc: "After a loss, it’s tempting to try and win back what you lost immediately. However, revenge trading usually leads to bigger losses. Stick to your strategy, take a break if needed, and avoid emotionally driven decisions to maintain long-term consistency.",
  },
  {
    name: "Use proper position sizing",
    role: "Rule 4",
    desc: "Calculating your position size helps manage risk more effectively. If you risk too much on a single trade, one bad decision could wipe out your account. Consistently using a percentage-based size ensures your portfolio stays protected through ups and downs.",
  },
  {
    name: "Keep emotions out of trading",
    role: "Rule 5",
    desc: "Emotions like fear, greed, and FOMO can ruin a solid trading plan. Developing discipline and sticking to pre-defined entry and exit points is crucial for success. Calm and calculated decisions will help you stay focused and avoid unnecessary risks.",
  },
  {
    name: "Stay updated with news",
    role: "Rule 6",
    desc: "Cryptocurrency prices are often affected by major global events, regulatory announcements, and news. Staying informed can help you anticipate market movements and adjust your strategy accordingly. Ignoring news can leave you exposed to unexpected and avoidable losses.",
  },
  {
    name: "Diversify your portfolio",
    role: "Rule 7",
    desc: "Spreading your investments across different crypto assets reduces overall risk. If one asset performs poorly, others might perform well and balance your portfolio. Relying on a single token increases exposure and vulnerability to sudden, project-specific failures or hacks.",
  },
  {
    name: "Have a trading plan",
    role: "Rule 8",
    desc: "A trading plan outlines your strategy, goals, risk tolerance, and rules for entering and exiting trades. Without a plan, you’re more likely to make impulsive decisions. A well-structured plan helps keep you consistent and focused on long-term success.",
  },
  {
    name: "Learn technical analysis",
    role: "Rule 9",
    desc: "Understanding charts, indicators, and patterns enables traders to make data-driven decisions. Technical analysis provides insight into potential price movements based on historical data. While not foolproof, it’s a critical tool in anticipating market trends and timing your trades properly.",
  },
  {
    name: "Avoid overtrading",
    role: "Rule 10",
    desc: "Taking too many trades in a short time increases your exposure to risk, fees, and emotional burnout. Quality matters more than quantity. Only trade when your strategy gives a clear signal and conditions are favorable—patience is a profitable trait.",
  },
];

const Contact = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 5;

  useEffect(() => {
    if (window.innerWidth < 768 || teamMembers.length <= visibleCards) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.ceil(teamMembers.length / visibleCards) - 1;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden py-12" id="contact">
      {/* Desktop Auto Sliding */}
      <div className="hidden md:flex transition-transform duration-[2000ms] ease-in-out gap-6"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${(teamMembers.length / visibleCards) * 100}%`,
        }}
      >
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-black rounded-xl shadow-lg text-center px-6 py-8 flex-shrink-0 w-[calc(100%/5)]"
          >
            <h3 className="text-xl font-semibold mb-1">{member.role}</h3>
            <p className="text-purple-600 mb-2 font-medium">{member.name}</p>
            <p className="text-gray-600 text-sm leading-relaxed text-left min-h-[120px]">
              {member.desc}
            </p>
            <button className="mt-6 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full text-sm">
              View More
            </button>
          </div>
        ))}
      </div>

      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden flex gap-4 overflow-x-auto scroll-smooth px-4">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-black rounded-xl shadow-lg text-center px-4 py-6 min-w-[85%] max-w-[85%] flex-shrink-0"
          >
            <h3 className="text-lg font-semibold mb-1">{member.role}</h3>
            <p className="text-purple-600 mb-2 font-medium">{member.name}</p>
            <p className="text-gray-600 text-sm leading-relaxed text-left min-h-[100px]">
              {member.desc}
            </p>
            <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-full text-sm">
              View More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
