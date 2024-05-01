import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';


// Uso de la librería intersection-observer para triggerear la carga de más cards, generando el deseado infinite scroll.
export function useInViewHandler(onInView: () => void): (node?: Element | null | undefined) => void {
  const [ref, inView] = useInView({
    delay: 100,
    threshold: 0.8
  });

  useEffect(() => {
    if (inView) {
      onInView();
    }
  }, [inView]);

  return ref;
}
