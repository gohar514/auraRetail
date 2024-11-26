import { motion } from "framer-motion";
import Image from "next/image";

// ImageSlider Component
export const ImageSlider = ({ currentImageIndex, product, direction }) => {
  return (
    <motion.div
      key={currentImageIndex}
      initial={{ x: direction === 1 ? "100%" : "-100%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      exit={{ x: direction === 1 ? "-100%" : "100%", opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full h-full"
    >
      <Image
        src={product.images[currentImageIndex]}
        alt={product.name}
        layout="responsive"
        width={450}
        height={562}
        objectFit="cover"
        className="group-hover:scale-105 transition-transform duration-300"
        quality={75}
        priority
      />
    </motion.div>
  );
};
