import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (options = {}) => {
    const [hasIntersected, setHasIntersected] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const currentRef = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasIntersected) {
                    setHasIntersected(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -100px 0px",
                ...options,
            }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [hasIntersected, options]);

    return [ref, hasIntersected];
};
