// @ts-expect-error: TypeScript does not know about '?raw' imports by default
import sprite from "../svg/sprite.svg?raw";

export default function Sprite() {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: sprite }}
      className="hidden"
      hidden
    ></div>
  );
}
