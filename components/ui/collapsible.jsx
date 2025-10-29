import React from "react";
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";

export function Collapsible(props) {
  return <CollapsiblePrimitive.Root {...props} />;
}

export function CollapsibleTrigger(props) {
  return <CollapsiblePrimitive.CollapsibleTrigger {...props} />;
}

export function CollapsibleContent(props) {
  return <CollapsiblePrimitive.CollapsibleContent {...props} />;
}
