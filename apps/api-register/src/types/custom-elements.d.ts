/** biome-ignore-all lint/suspicious/noExplicitAny: any taken from altcha code */

// Workaround to allow using altcha-widget in React without TypeScript errors.
// See issue https://github.com/altcha-org/altcha/issues/190

import type { WidgetAttributes } from "altcha/types";

interface AltchaWidgetReact
  extends React.HTMLProps<HTMLElement>,
    WidgetAttributes {
  children?: any;
  ref?: AltchaWidgetReactRefObject<HTMLElement>;
  style?: Partial<Record<string, string>>;
  suppressHydrationWarning?: boolean;
}

interface AltchaWidgetReactRefObject<T> {
  current: T | null;
}

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        "altcha-widget": AltchaWidgetReact;
      }
    }
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "altcha-widget": AltchaWidgetReact;
    }
  }
}
declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "altcha-widget": AltchaWidgetReact;
    }
  }
}
