import React, {useEffect, useRef} from 'react';

/**
 * 滚动揭示容器：进入视口时淡入上移（配合 custom.css 的 .reveal）。
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  scale = false,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('reveal--in');
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--in');
            io.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.1, rootMargin: '0px 0px -6% 0px'},
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal${scale ? ' reveal--scale' : ''} ${className}`.trim()}
      style={{'--reveal-delay': `${delay}ms`}}
      {...rest}>
      {children}
    </Tag>
  );
}
