import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Background3D from '../components/Background3D';
import Terminal from '../components/Terminal';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCommand = (command: string) => {
    // Handle special commands if needed
    if (command === 'clear' || command === 'cls') {
      window.location.reload();
    }
  };

  return (
    <div className="terminal-container">
      <Background3D />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 h-full p-4 flex items-center justify-center"
      >
        <div className="w-full max-w-4xl h-[90vh] max-h-[800px]">
          <Terminal onCommand={handleCommand} />
        </div>
      </motion.div>

      {/* Loading overlay */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="fixed inset-0 bg-background flex items-center justify-center z-50"
        >
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-primary font-mono">Initializing terminal...</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
