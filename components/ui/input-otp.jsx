import React, { useContext } from "react";
import styled, { keyframes, css } from "styled-components";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

// === Styled Components ===

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const SlotGroup = styled.div`
  display: flex;
  align-items: center;
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const Slot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;

  &:first-child {
    border-left: 1px solid #ccc;
    border-radius: 6px 0 0 6px;
  }

  &:last-child {
    border-radius: 0 6px 6px 0;
  }

  ${(props) =>
    props["data-active"] &&
    css`
      z-index: 10;
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.3);
    `}

  &[aria-invalid="true"] {
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
  }
`;

const FakeCaretWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FakeCaret = styled.div`
  width: 1px;
  height: 16px;
  background: #000;
  animation: ${blink} 1s step-start infinite;
`;

const Separator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// === Components ===

export function InputOTP({ className, containerClassName, ...props }) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={containerClassName}
      className={className}
      render={({ slots }) => (
        <Container>
          {slots}
        </Container>
      )}
      {...props}
    />
  );
}

export function InputOTPGroup({ className, ...props }) {
  return <SlotGroup className={className} {...props} />;
}

export function InputOTPSlot({ index, className, ...props }) {
  const otpContext = useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = otpContext?.slots[index] ?? {};

  return (
    <Slot data-slot="input-otp-slot" data-active={isActive} className={className} {...props}>
      {char}
      {hasFakeCaret && (
        <FakeCaretWrapper>
          <FakeCaret />
        </FakeCaretWrapper>
      )}
    </Slot>
  );
}

export function InputOTPSeparator(props) {
  return (
    <Separator data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon size={16} />
    </Separator>
  );
}
