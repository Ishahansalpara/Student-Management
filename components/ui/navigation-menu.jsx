import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDownIcon } from 'lucide-react';

/* ====== Styled Components ====== */

const Root = styled(NavigationMenuPrimitive.Root)`
  display: flex;
  position: relative;
  max-width: max-content;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const List = styled(NavigationMenuPrimitive.List)`
  display: flex;
  flex: 1;
  list-style: none;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`;

const Item = styled(NavigationMenuPrimitive.Item)`
  position: relative;
`;

const triggerStyles = css`
  display: inline-flex;
  height: 2.25rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: var(--background);
  color: inherit;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;
  outline: none;

  &:hover,
  &:focus,
  &[data-state='open'] {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Trigger = styled(NavigationMenuPrimitive.Trigger)`
  ${triggerStyles}
  position: relative;
`;

const Content = styled(NavigationMenuPrimitive.Content)`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 50;
  width: auto;
  background: var(--popover);
  color: var(--popover-foreground);
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  padding: 0.5rem;
  box-shadow: var(--shadow);
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ViewportContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
`;

const Viewport = styled(NavigationMenuPrimitive.Viewport)`
  background: var(--popover);
  color: var(--popover-foreground);
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  margin-top: 0.4rem;
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: all 0.2s ease;
`;

const Link = styled(NavigationMenuPrimitive.Link)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;

  &:hover,
  &:focus,
  &[data-active='true'] {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  svg {
    width: 1rem;
    height: 1rem;
    color: var(--muted-foreground);
  }
`;

const Indicator = styled(NavigationMenuPrimitive.Indicator)`
  display: flex;
  justify-content: center;
  align-items: end;
  height: 0.375rem;
  overflow: hidden;
  position: relative;
  top: 100%;
`;

const IndicatorArrow = styled.div`
  background-color: var(--border);
  position: relative;
  top: 60%;
  height: 0.5rem;
  width: 0.5rem;
  transform: rotate(45deg);
  border-top-left-radius: 0.125rem;
  box-shadow: var(--shadow);
`;

/* ====== Components ====== */

export function NavigationMenu({ children, viewport = true, ...props }) {
  return (
    <Root {...props}>
      {children}
      {viewport && (
        <ViewportContainer>
          <Viewport />
        </ViewportContainer>
      )}
    </Root>
  );
}

export const NavigationMenuList = (props) => <List {...props} />;
export const NavigationMenuItem = (props) => <Item {...props} />;

export function NavigationMenuTrigger({ children, ...props }) {
  return (
    <Trigger {...props}>
      {children}
      <ChevronDownIcon
        size={12}
        style={{
          marginLeft: '0.25rem',
          transition: 'transform 0.3s',
        }}
      />
    </Trigger>
  );
}

export const NavigationMenuContent = (props) => <Content {...props} />;
export const NavigationMenuLink = (props) => <Link {...props} />;
export const NavigationMenuIndicator = () => (
  <Indicator>
    <IndicatorArrow />
  </Indicator>
);
