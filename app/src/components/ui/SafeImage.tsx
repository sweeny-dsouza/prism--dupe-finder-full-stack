import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageOff } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackCategory?: 'skincare' | 'haircare' | 'bodycare' | 'all';
}

const categoryIcons = {
    skincare: '🧴',
    haircare: '💇',
    bodycare: '🫧',
    all: '✨',
};

export const SafeImage: React.FC<SafeImageProps> = ({
    src,
    alt,
    className,
    fallbackCategory = 'all',
    ...props
}) => {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const handleError = () => {
        setError(true);
    };

    const handleLoad = () => {
        setLoaded(true);
    };

    return (
        <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
            <AnimatePresence>
                {!loaded && !error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-secondary/20 animate-pulse flex items-center justify-center"
                    >
                        <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>

            {error || !src ? (
                <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#f8f5f2] to-[#f0e8e8] dark:from-[#1a1a21] dark:to-[#121217] w-full h-full p-6 text-center border border-primary/5 dark:border-white/5">
                    <div className="w-16 h-16 rounded-full bg-white dark:bg-white/5 shadow-soft flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500">
                        <span className="text-4xl">{categoryIcons[fallbackCategory]}</span>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-30">
                        <ImageOff className="w-3 h-3" />
                        <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Not found</span>
                    </div>
                </div>
            ) : (
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: loaded ? 1 : 0 }}
                    src={src}
                    alt={alt}
                    onError={handleError}
                    onLoad={handleLoad}
                    className={`${className} ${loaded ? 'block' : 'hidden'}`}
                    {...(props as any)}
                />
            )}
        </div>
    );
};
export default SafeImage;
