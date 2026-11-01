import React, { useLayoutEffect, useRef } from 'react';

type LowFidelityPrototypeProps = { children: React.ReactNode; screen: string };

const annotations = [
  { number: 1, screens: ['v2_search', 'v2_compare'], className: 'top-[255px] right-[24px]', title: 'Compare was easy to miss', text: 'Parents had difficulty finding Compare on their own at first; some also missed or questioned the filters.' },
  { number: 2, screens: ['v2_tutor_profile'], className: 'top-[265px] right-[24px]', title: 'Trust needed more context', text: 'Parents asked who verified tutor credentials, whether reviews came from completed lessons, and what the tutor was like with children.' },
  { number: 3, screens: ['v2_checkout', 'v2_payment_qr', 'v2_payment_transfer'], className: 'top-[580px] right-[24px]', title: 'Payment and policies raised questions', text: 'Some parents stopped when only card payment was available. Parents also asked about cancellation, refunds, or support.' },
];

function isKeyFlowButton(element: Element | null) {
  if (!element) return false;
  const ariaLabel = element.getAttribute('aria-label') || '';
  const visibleLabel = element.textContent?.trim() || '';
  const className = typeof element.className === 'string' ? element.className : '';
  return ariaLabel === 'Tìm gia sư' || ariaLabel.startsWith('So sánh') ||
    /^Xem\b/i.test(visibleLabel) ||
    /bg-emerald-(600|700|800)/.test(className);
}

export function LowFidelityPrototype({ children, screen }: LowFidelityPrototypeProps) {
  const screenRef = useRef<HTMLDivElement>(null);
  const activeAnnotations = annotations.filter(annotation => annotation.screens.includes(screen));

  useLayoutEffect(() => {
    const root = screenRef.current;
    if (!root) return;
    const replaceText = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      while ((node = walker.nextNode())) {
        const textNode = node as Text;
        const original = textNode.nodeValue?.trim();
        if (!original || textNode.parentElement?.closest('[role="tooltip"]')) continue;
        const parent = textNode.parentElement;
        if (parent?.closest('[role="alert"],[role="status"]')) continue;
        if (parent?.closest('header,nav,h1,h2,h3,h4,[data-lowfi-keep]')) continue;
        // Keep real prices in the wireframe so the booking and payment flow stays legible.
        if (/\d[\d.,]*\s*(?:đ|₫|vnd|vnđ)(?:\b|$)/i.test(original)) continue;
        // Preserve bold labels used as titles inside selectable plan/card options.
        if (parent && /(?:^|\s)font-(?:bold|semibold|extrabold)(?:\s|$)/.test(parent.className.toString()) && parent.closest('button,[role="button"],article,[class*="rounded"]')) continue;
        const button = parent?.closest('button,[role="button"]') || null;
        if (button && isKeyFlowButton(button)) continue;
        const placeholder = button ? 'Lorem'
          : parent?.closest('h1,h2') ? 'Lorem Ipsum Dolor'
          : parent?.closest('h3,h4') ? 'Name Middle Name Last Name'
          : parent?.closest('p') ? 'Lorem ipsum dolor sit amet...'
            : parent?.closest('label') ? 'Lorem ipsum' : 'Lorem ipsum';
        let genericText = placeholder;
        if (!button) {
          while (genericText.length < original.length && genericText.length < 120) genericText += ` ${placeholder}`;
          if (genericText.length > original.length && original.length >= placeholder.length) genericText = genericText.slice(0, original.length);
        }
        if (textNode.nodeValue !== genericText) textNode.nodeValue = genericText;
      }
      root.querySelectorAll('input, textarea').forEach(field => {
        if (field.closest('header')) return;
        if (field instanceof HTMLInputElement && field.type !== 'checkbox' && field.type !== 'radio') field.placeholder = 'Lorem ipsum';
        if (field instanceof HTMLTextAreaElement) field.placeholder = 'Lorem ipsum dolor sit amet...';
      });
    };
    replaceText();
    const observer = new MutationObserver(replaceText);
    observer.observe(root, { childList: true, characterData: true, subtree: true });
    return () => observer.disconnect();
  }, [screen]);

  return <div className="relative h-full w-full" aria-label="Low-fidelity grayscale wireframe prototype">
    <div ref={screenRef} data-lowfi-screen={screen} className="lowfi-mode h-full w-full overflow-hidden bg-white">{children}</div>
    {activeAnnotations.map(annotation => <div key={annotation.number} className={`group absolute z-50 ${annotation.className}`}>
      <button type="button" aria-label={`Usability finding ${annotation.number}: ${annotation.title}`} className="flex h-8 w-8 items-center justify-center border-2 border-white bg-neutral-800 text-sm font-bold text-white outline-none hover:bg-neutral-600 focus-visible:ring-2 focus-visible:ring-neutral-700">{annotation.number}</button>
      <div role="tooltip" className="pointer-events-none absolute right-10 top-0 z-50 hidden w-64 border border-neutral-400 bg-white p-3 text-left text-xs leading-5 text-neutral-800 group-hover:block group-focus-within:block">
        <strong className="mb-1 block text-sm">{annotation.title}</strong>{annotation.text}
      </div>
    </div>)}
  </div>;
}
