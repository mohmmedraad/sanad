import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect } from "react";

type UseInfiniteScrollOptions = {
    threshold?: number;
    root?: Element | null;
    rootMargin?: string;
    onIntersect: () => void;
};

export function useInfiniteScroll({
    threshold = 0,
    root = null,
    rootMargin = "50px",
    onIntersect,
}: UseInfiniteScrollOptions) {
    const [ref, entry] = useIntersectionObserver({
        threshold,
        root,
        rootMargin,
    });

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        if (entry?.isIntersecting) {
            onIntersect();
        }
    }, [entry?.isIntersecting]);

    return { ref };
}
