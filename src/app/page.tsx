import Logo from "@/app/components/Logo";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 dark:bg-black">
      <div className="flex flex-col items-center space-y-8">
        <Logo 
          className="transform transition-transform hover:scale-110" 
          height={200} 
          width={150} 
        />
      
        <h1
          className="text-black dark:text-white font-bold tracking-tight leading-none text-center"
          style={{
            fontSize: "clamp(3rem, 12vw, 7rem)",
            textRendering: "optimizeLegibility",
            textShadow: "1.5px 1.5px 0 rgba(68, 68, 68, 0.067), 2px 2px 5px rgba(221, 221, 221, 0.467)",
          }}
        >
          Zoku
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300">
          a minimalist calendar app
        </p>
      </div>
    </div>
  );
}


