import { TypeAnimation } from "react-type-animation";

const TypingAnimation = () => {
  return (
    <div className="top-20 italic  rounded-full border border-white shadow-lg shadow-black p-4 bg-white   absolute">
      <TypeAnimation
         sequence={[
          "Track your expenses effortlessly 🚀",
          1000, 
          "Gain control over your finances 💸",
          1000,
          "Achieve your financial goals 🎯",
          1000,
          "Manage your money like a pro 😎",
          1000,
        ]}
        wrapper="span"
        speed={50}
        className="text-3xl font-bold text-gray-800"
        repeat={Infinity}
      />
    </div>
  );
};

export default TypingAnimation;