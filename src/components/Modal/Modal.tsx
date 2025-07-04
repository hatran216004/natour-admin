import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';

type ModalPropsType = {
  closeMethods?: Array<'button' | 'overlay' | 'escape'>;
  classNames?: string[];
  destroyOnClose?: boolean;
  enableScrollLock?: boolean;
  children?: React.ReactNode;
  footer?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  scrollLockTarget?: () => HTMLElement;
};

type ModalProviderType = {
  close: () => void;
  open: (name: string) => void;
  modalName: string;
  ref: React.RefObject<HTMLDivElement>;
  allowBackdropClose?: boolean;
  allowButtonClose?: boolean;
  setFooterContent?: (content: React.ReactNode) => void;
  footerContent?: React.ReactNode;
} & ModalPropsType;

const ModalContext = createContext<ModalProviderType>(null!);
const modalStackRef: Array<string> = [];
export default function Modal({
  closeMethods = ['button', 'overlay', 'escape'],
  classNames,
  destroyOnClose = true,
  enableScrollLock = true,
  footer = true,
  onOpen = () => {},
  onClose = () => {},
  scrollLockTarget = () => document.body,
  children
}: ModalPropsType) {
  const [modalName, setModalName] = useState('');
  const [footerContent, setFooterContent] = useState<React.ReactNode>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const scrollbarWidth = useRef<number>(0);

  const allowBackdropClose = closeMethods.includes('overlay');
  const allowButtonClose = closeMethods.includes('button');
  const allowEscapeClose = closeMethods.includes('escape');

  const handleEscapeKey = (e: KeyboardEvent) => {
    const isLastModal = modalName === modalStackRef[modalStackRef.length - 1];
    if (isLastModal && e.code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    if (modalName && allowEscapeClose) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => document.removeEventListener('keydown', handleEscapeKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalName]);

  function hasScrollbar(target: HTMLElement) {
    if ([document.body, document.documentElement].includes(target)) {
      return (
        document.body.scrollHeight > document.body.clientHeight ||
        document.documentElement.scrollHeight >
          document.documentElement.clientHeight
      );
    }
    return target.scrollHeight > target.clientHeight;
  }

  function getScrollbarWidth() {
    if (scrollbarWidth.current) return scrollbarWidth.current;

    const div = document.createElement('div');
    Object.assign(div.style, {
      overflow: 'scroll',
      position: 'absolute',
      top: '-99999px'
    });

    document.body.appendChild(div);
    scrollbarWidth.current = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    return scrollbarWidth.current;
  }

  function open(name: string) {
    modalStackRef.push(name);

    setTimeout(() => {
      if (backdropRef.current) {
        backdropRef.current.classList.add('opacity-100', 'visible');
        backdropRef.current.classList.remove('opacity-0', 'invisible');

        handleTransitionEnd(onOpen);
      }
    }, 0);
    setModalName(name);

    // Disable scrolling
    if (enableScrollLock) {
      const target = scrollLockTarget();
      if (hasScrollbar(target) && modalName === modalStackRef[0]) {
        const targetPaddingRight = parseInt(
          getComputedStyle(target).paddingRight
        );
        target.classList.add('overflow-hidden');
        target.style.paddingRight =
          targetPaddingRight + getScrollbarWidth() + 'px';
      }
    }
  }

  function handleTransitionEnd(callback: () => void) {
    const backdrop = backdropRef.current!;
    backdrop.ontransitionend = (e) => {
      if (e.propertyName !== 'opacity') return;
      if (typeof callback === 'function') callback();
    };
  }

  function close() {
    modalStackRef.pop();

    const backdrop = backdropRef.current!;
    backdrop.classList.remove('opacity-100', 'visible');
    backdrop.classList.add('opacity-0', 'invisible');

    handleTransitionEnd(() => {
      if (destroyOnClose) {
        setModalName('');
      }

      // Enable scrolling
      if (!modalStackRef.length && enableScrollLock) {
        const target = scrollLockTarget();
        if (hasScrollbar(target)) {
          target.classList.remove('overflow-hidden');
          target.style.paddingRight = '';
        }
      }

      if (typeof onClose === 'function') onClose();
    });
  }

  const contextValue: ModalProviderType = {
    open,
    close,
    ref: backdropRef as React.RefObject<HTMLDivElement>,
    modalName,
    allowBackdropClose,
    allowButtonClose,
    classNames,
    footer,
    setFooterContent,
    footerContent
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ name, children }: { name: string; children: React.ReactNode }) {
  const { open } = useContext(ModalContext);
  return cloneElement(
    children as React.ReactElement<{ onClick?: () => void }>,
    { onClick: () => open(name) }
  );
}

function Content({
  openName,
  children
}: {
  openName: string;
  children: React.ReactNode;
}) {
  const {
    close,
    modalName,
    ref,
    allowBackdropClose,
    allowButtonClose,
    classNames,
    footerContent
  } = useContext(ModalContext);

  function handleClose(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (allowBackdropClose && e.target === ref.current) close();
  }

  if (modalName !== openName) return null;

  return createPortal(
    <div
      ref={ref}
      onClick={handleClose}
      tabIndex={-1}
      className={`${
        classNames ? classNames.join(' ') : ''
      } bg-[#00000099] flex items-center justify-center opacity-0 invisible fixed inset-0 z-50 transition-[opacity,visibility] duration-[0.2s]`}
    >
      <div className="relative p-4 max-h-full bg-white rounded-lg shadow-sm">
        {allowButtonClose && (
          <button
            onClick={close}
            className="z-10 absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        )}
        {cloneElement(
          children as React.ReactElement<{ onCloseModal?: () => void }>,
          { onCloseModal: close }
        )}
        {footerContent && (
          <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
            {footerContent}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

function Footer({ children }: { children: React.ReactNode }) {
  const { setFooterContent, footer } = useContext(ModalContext);

  useEffect(() => {
    if (footer) {
      setFooterContent?.(children);
    }
  }, [footer, setFooterContent, children]);

  return null;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useModal() {
  const value = useContext(ModalContext);
  if (!value) throw new Error('useModal must be used into ModalProvider');
  return value;
}

Modal.Open = Open;
Modal.Content = Content;
Modal.Footer = Footer;
