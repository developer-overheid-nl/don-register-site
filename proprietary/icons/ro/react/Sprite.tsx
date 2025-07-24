import sprite from '../svg/sprite.svg?raw';

export default function Sprite() {
  return <div dangerouslySetInnerHTML={{ __html: sprite }} className='hidden' hidden></div>;
}
