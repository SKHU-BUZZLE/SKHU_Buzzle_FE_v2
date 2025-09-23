import { useEffect, useRef } from 'react';

/**
 * @description 무한 스크롤을 위한 Intersection Observer 커스텀 훅
 *
 * @param {() => void} callback - 타겟 요소가 화면에 들어왔을 때 실행할 함수
 * @param {boolean} isLoading - 데이터를 로딩 중인지 여부 (true일 경우 observe하지 않음)
 * @param {boolean} isLastPage - 더 이상 로드할 페이지가 없는지 여부 (true일 경우 observe하지 않음)
 * @param {Element | null} [root] - IntersectionObserver의 root 요소 (기본값: null → 뷰포트 기준)
 * @param {unknown} [watch] - 관찰 재등록을 위한 외부 상태 (예: Popover open 상태 등)
 *
 *
 * @example
 * ```tsx
 * const scrollContainerRef = useRef(null);
 * const observerRef = useIntersectionObserver(
 *   () => fetchNextPage(),
 *   isLoading,
 *   isLastPage,
 *   scrollContainerRef.current,
 *   open,
 * );
 *
 * return <div ref={observerRef} />;
 * ```
 */
export default function useIntersectionObserver(
  callback: () => void,
  isLoading: boolean,
  isLastPage: boolean,
  root?: Element | null,
  watch?: unknown,
) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const target = observerRef.current;
      if (!target) return;
      if (isLoading || isLastPage) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            callback();
          }
        },
        {
          threshold: 0.1,
          root: root ?? null,
        },
      );

      observer.observe(target);

      return () => {
        observer.disconnect();
      };
    }, 10); // Portal이 DOM에 렌더 후 등록되도록 지연 (Portal이 아닌 상황에서도 0.01초로 영향이 크지 않음)

    return () => clearTimeout(timeout);
  }, [callback, isLoading, isLastPage, root, watch]);

  return observerRef;
}
