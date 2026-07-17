import { motion } from 'framer-motion';

export default function ShaderBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-blue-950">
      {/* Orb 1: Primary Brand Color */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#2E5BEA] rounded-full filter blur-[80px] md:blur-[120px] opacity-80"
        animate={{
          x: ['0%', '30%', '0%'],
          y: ['0%', '20%', '0%'],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      {/* Orb 2: Light Blue */}
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-400 rounded-full filter blur-[80px] md:blur-[120px] opacity-60"
        animate={{
          x: ['0%', '-40%', '0%'],
          y: ['0%', '-30%', '0%'],
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 18, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Orb 3: Deep Blue */}
      <motion.div
        className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-blue-600 rounded-full filter blur-[80px] md:blur-[100px] opacity-70"
        animate={{
          x: ['0%', '-20%', '0%'],
          y: ['0%', '40%', '0%'],
          scale: [1, 1.3, 1],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 5
        }}
      />

      {/* Orb 4: Subtle Mid Blue */}
      <motion.div
        className="absolute bottom-[10%] left-[20%] w-[50%] h-[50%] bg-blue-500 rounded-full filter blur-[80px] md:blur-[100px] opacity-50"
        animate={{
          x: ['0%', '40%', '0%'],
          y: ['0%', '-20%', '0%'],
          scale: [1, 1.1, 1],
        }}
        transition={{ 
          duration: 22, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 7
        }}
      />
    </div>
  );
}
