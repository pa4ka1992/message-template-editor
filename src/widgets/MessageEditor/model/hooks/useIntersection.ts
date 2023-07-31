import { Dispatch, MutableRefObject, SetStateAction, useEffect } from 'react';

type Props = {
  ref: MutableRefObject<HTMLElement | null>;
  setIsToolsHidden: Dispatch<SetStateAction<boolean>>;
};

export const useIntersection = ({ ref, setIsToolsHidden }: Props) => {
  useEffect(() => {
    if (ref.current) {
      const callback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          setIsToolsHidden(entry.isIntersecting);
        });
      };

      const observer = new IntersectionObserver(callback);

      observer.observe(ref.current);
    }
  }, [ref]);
};
