import sprite from "../svg/sprite.svg?raw";

/* biome-ignore-start lint/security/noDangerouslySetInnerHtml: I know what I'm doing */
export default function Sprite() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: sprite }}
      className="hidden"
      hidden
    ></div>
  );
}
/* biome-ignore-end lint/security/noDangerouslySetInnerHtml: I know what I'm doing */
