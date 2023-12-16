// useModal.ts
import { useState, useEffect } from "react";

const useModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const openModal = () => {
        setIsVisible(true);
        setIsAnimating(true);
    };

    const closeModal = () => {
        setIsAnimating(false);
        setTimeout(() => setIsVisible(false), 500); // Match the duration of fadeOut
    };

    useEffect(() => {
        if (isVisible && !isAnimating) {
            setTimeout(() => setIsAnimating(true), 10); // Delay for CSS to catch up
        }
    }, [isVisible, isAnimating]);

    return { isVisible, isAnimating, openModal, closeModal };
};

export default useModal;
