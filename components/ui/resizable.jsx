'use client';

import React from 'react';
import styled from 'styled-components';
import * as ResizablePrimitive from 'react-resizable-panels';
import { GripVerticalIcon } from 'lucide-react';

/* ==== Styled Components ==== */

const PanelGroup = styled(ResizablePrimitive.PanelGroup)`
  display: flex;
  height: 100%;
  width: 100%;

  &[data-panel-group-direction='vertical'] {
    flex-direction: column;
  }
`;

const Panel = styled(ResizablePrimitive.Panel)``;

const ResizeHandle = styled(ResizablePrimitive.PanelResizeHandle)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1px;
  background: var(--border);
  cursor: col-resize;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px var(--ring);
  }

  &[data-panel-group-direction='vertical'] {
    height: 1px;
    width: 100%;
    cursor: row-resize;
  }
`;

const HandleGrip = styled.div`
  background: var(--border);
  z-index: 10;
  display: flex;
  height: 1rem;
  width: 0.75rem;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border);
  border-radius: 0.25rem;
`;

export function ResizablePanelGroup(props) {
  return <PanelGroup {...props} />;
}

export function ResizablePanel(props) {
  return <Panel {...props} />;
}

export function ResizableHandle({ withHandle, ...props }) {
  return (
    <ResizeHandle {...props}>
      {withHandle && (
        <HandleGrip>
          <GripVerticalIcon size={10} />
        </HandleGrip>
      )}
    </ResizeHandle>
  );
}
