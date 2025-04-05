import classNames from 'classnames';
import React, {
  cloneElement,
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState
} from 'react';
import { createPortal } from 'react-dom';

type ModalType = {
  open: Dispatch<SetStateAction<string>>;
  close: () => void;
  openName: string;
};

const initialValues: ModalType = {
  open: () => {},
  close: () => {},
  openName: ''
};

const ModalContext = createContext<ModalType>(initialValues);
export default function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState<string>('');

  const open = setOpenName;
  const close = () => setOpenName('');

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  children,
  openWindowName
}: {
  children: React.ReactElement;
  openWindowName: string;
}) {
  const { open } = useContext(ModalContext);

  return cloneElement(
    children as React.ReactElement<{ onClick?: () => void }>,
    { onClick: () => open(openWindowName) }
  );
}

function Window({
  children,
  name
}: {
  name: string;
  children: React.ReactElement;
}) {
  const { close, openName } = useContext(ModalContext);

  return createPortal(
    <div
      tabIndex={-1}
      className={classNames(
        'bg-[#00000080] overflow-y-auto overflow-x-hidden fixed inset-0 z-50 w-full max-h-full transition-[opacity,visibility] duration-[0.25s]',
        {
          'opacity-0 invisible': openName !== name,
          'opacity-100 visible': openName === name
        }
      )}
    >
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm ">
          <button
            onClick={close}
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
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
          {cloneElement(
            children as React.ReactElement<{ onCloseModal?: () => void }>,
            { onCloseModal: close }
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
