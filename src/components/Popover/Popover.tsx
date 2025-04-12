import { useState, useId, type ElementType } from 'react';
import {
  useFloating,
  FloatingPortal,
  shift,
  offset,
  type Placement,
  flip, // đổi hướng khi scroll qua
  autoUpdate,
  // useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  // safePolygon,
  useClick
} from '@floating-ui/react';

interface Props {
  children: React.ReactNode;
  renderPopover: React.ReactNode;
  className?: string;
  as?: ElementType;
  initialOpen?: boolean;
  placement?:
    | Placement
    | 'bottom-center'
    | 'top-center'
    | 'right-center'
    | 'left-center';
}

const Popover = ({
  children,
  className,
  renderPopover,
  as: Element = 'div',
  initialOpen,
  placement = 'bottom-end'
}: Props) => {
  const [isOpen, setIsOpen] = useState(initialOpen || false);
  const data = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
    transform: false,
    placement: placement as Placement
  });
  const { refs, floatingStyles, context } = data;
  // const hover = useHover(context, { handleClose: safePolygon() });
  const focus = useFocus(context);
  const click = useClick(context);
  const dismiss = useDismiss(context, {
    // capture: true // đóng menu khi menu item stopPropagation
    // outsidePress: false // không đóng menu khi bấm ra ngoài
  });
  const role = useRole(context, { role: 'tooltip' });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    focus,
    dismiss,
    role
  ]);
  const id = useId();

  return (
    <Element
      className={className}
      ref={refs.setReference}
      {...getReferenceProps()}
    >
      {children}
      <FloatingPortal id={id}>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={{
              zIndex: '1000',
              ...floatingStyles
            }}
            {...getFloatingProps()}
          >
            {renderPopover}
          </div>
        )}
      </FloatingPortal>
    </Element>
  );
};

export default Popover;
