import type { Preview } from "@storybook/react-vite";
import { type PropsWithChildren, useEffect } from "react";
import "@developer-overheid-nl/proprietary/fonts";
import "@rijkshuisstijl-community/design-tokens/dist/uitvoerend-groen/root.css";
import "@utrecht/component-library-css/dist/index.css";
import "@utrecht/component-library-css/dist/html.css";
import "@rijkshuisstijl-community/components-css/dist/index.css";
import "../packages/layouts/src/styles/reset.css";
import "../packages/layouts/src/styles/override.css";
import "../packages/layouts/src/styles/helpers.css";
import "./preview.css";
import { IconsSprite } from "@developer-overheid-nl/don-register-components";

const DocumentClasses = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    document.body.classList.add("utrecht-document", "don-document");

    return () => {
      document.body.classList.remove("utrecht-document", "don-document");
    };
  }, []);

  return (
    <>
      <IconsSprite />
      {children}
    </>
  );
};

const preview: Preview = {
  decorators: [
    (Story, context) => (
      <DocumentClasses>
        <div
          className={
            context.parameters.layout === "narrow"
              ? "storybook-story storybook-story--narrow"
              : "storybook-story"
          }
        >
          <Story />
        </div>
      </DocumentClasses>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
  },
};

export default preview;
