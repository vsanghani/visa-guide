import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

// Mock next/link
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => {
    const React = require("react");
    return React.createElement("a", { href, ...props }, children);
  },
}));

// Mock framer-motion for simpler testing
vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop) => {
        const React = require("react");
        return React.forwardRef(
          (
            { children, ...props }: { children?: React.ReactNode; [key: string]: unknown },
            ref: React.Ref<HTMLElement>
          ) => {
            // Filter out framer-motion-specific props
            const filteredProps: Record<string, unknown> = {};
            for (const [key, value] of Object.entries(props)) {
              if (
                ![
                  "initial",
                  "animate",
                  "exit",
                  "transition",
                  "whileInView",
                  "viewport",
                  "whileHover",
                  "whileTap",
                  "layoutId",
                  "layout",
                  "variants",
                  "custom",
                ].includes(key)
              ) {
                filteredProps[key] = value;
              }
            }
            return React.createElement(
              prop as string,
              { ref, ...filteredProps },
              children
            );
          }
        );
      },
    }
  ),
  AnimatePresence: ({
    children,
  }: {
    children: React.ReactNode;
  }) => children,
  useInView: () => true,
}));
