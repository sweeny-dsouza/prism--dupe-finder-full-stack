import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { products } from '@/data/products';
import type { Product } from '@/types';
import { useNavigate } from 'react-router-dom';
import SafeImage from '@/components/ui/SafeImage';

interface SearchAutocompleteProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    initialValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    showButton?: boolean;
    inputClassName?: string;
}

export default function SearchAutocomplete({
    onSearch,
    placeholder = "Search a product...",
    initialValue = "",
    value,
    onChange,
    className = "",
    showButton = true,
    inputClassName = ""
}: SearchAutocompleteProps) {
    const [internalQuery, setInternalQuery] = useState(initialValue);
    const query = value !== undefined ? value : internalQuery;

    const setQuery = (newQuery: string) => {
        if (onChange) {
            onChange(newQuery);
        } else {
            setInternalQuery(newQuery);
        }
    };

    const [suggestions, setSuggestions] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.length > 1) {
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.brand.toLowerCase().includes(query.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [query]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            setActiveIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter') {
            if (activeIndex >= 0) {
                selectProduct(suggestions[activeIndex]);
            } else {
                onSearch(query);
                setIsOpen(false);
            }
        } else if (e.key === 'Escape') {
            setIsOpen(false);
        }
    };

    const selectProduct = (product: Product) => {
        setQuery(product.name);
        onSearch(product.name);
        setIsOpen(false);
        navigate(`/dupe-finder?q=${encodeURIComponent(product.name)}`);
    };

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <div className="relative flex items-center">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground z-10" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.length > 1 && setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={`w-full pl-14 pr-6 py-6 rounded-2xl bg-white dark:bg-[#1a1a21] border-2 border-primary/10 dark:border-white/10 text-foreground dark:text-white placeholder:text-muted-foreground/60 dark:placeholder:text-gray-500 text-base focus:border-primary dark:focus:border-[#ffb6c1] focus:ring-2 focus:ring-primary/20 dark:focus:ring-white/10 transition-all outline-none ${showButton ? 'pr-32' : ''} ${inputClassName}`}
                />
                {showButton && (
                    <button
                        onClick={() => onSearch(query)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-4 rounded-xl bg-primary dark:bg-[#ffb6c1] text-white dark:text-[#8B1535] font-semibold hover:bg-primary/90 dark:hover:bg-[#ffc0cb] shadow-medium transition-all"
                    >
                        Search
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && suggestions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#17171c] border border-primary/10 dark:border-white/10 rounded-2xl shadow-strong overflow-hidden z-[100] ml-2 mr-2 transition-all"
                    >
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={suggestion.id}
                                onClick={() => selectProduct(suggestion)}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`flex items-center gap-4 px-6 py-4 cursor-pointer transition-colors ${activeIndex === index ? 'bg-primary/5 dark:bg-white/5' : 'hover:bg-primary/5 dark:hover:bg-white/5'
                                    }`}
                            >
                                <SafeImage
                                    src={suggestion.imageUrl}
                                    alt={suggestion.name}
                                    className="w-10 h-10 object-contain rounded-lg bg-secondary/20 dark:bg-white/5 transition-colors"
                                    fallbackCategory={suggestion.category as any}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-foreground dark:text-white truncate transition-colors">{suggestion.name}</p>
                                    <p className="text-xs text-muted-foreground dark:text-gray-500 uppercase transition-colors">{suggestion.brand} • {suggestion.category}</p>
                                </div>
                                <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                    ₹{suggestion.price}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
