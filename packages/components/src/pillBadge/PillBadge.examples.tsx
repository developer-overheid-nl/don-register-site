/* Temporary file to showcase PillBadge examples in e.g. Storybook later */

import Block from '../block/Block';
import PillBadge from './PillBadge';

export const PillBadgeExamples = () => {
  return (
    <Block layout="flex-col">
      <PillBadge startValue="Kleur" endValue="robijnrood" type="color" color="robijnrood" />
      <PillBadge startValue="Kleur" endValue="roze" type="color" color="roze" />
      <PillBadge startValue="Kleur" endValue="rood" type="color" color="rood" />
      <PillBadge startValue="Kleur" endValue="oranje" type="color" color="oranje" />
      <PillBadge startValue="Kleur" endValue="donkergeel" type="color" color="donkergeel" />
      <PillBadge startValue="Kleur" endValue="geel" type="color" color="geel" />
      <PillBadge startValue="Kleur" endValue="donkergroen" type="color" color="donkergroen" />
      <PillBadge startValue="Kleur" endValue="groen" type="color" color="groen" />
      <PillBadge startValue="Kleur" endValue="mosgroen" type="color" color="mosgroen" />
      <PillBadge startValue="Kleur" endValue="mintgroen" type="color" color="mintgroen" />
      <PillBadge startValue="Kleur" endValue="donkerblauw" type="color" color="donkerblauw" />
      <PillBadge startValue="Kleur" endValue="hemelblauw" type="color" color="hemelblauw" />
      <PillBadge startValue="Kleur" endValue="paars" type="color" color="paars" />
      <PillBadge startValue="Kleur" endValue="violet" type="color" color="violet" />
      <PillBadge startValue="Kleur" endValue="lichtblauw" type="color" color="lichtblauw" />
      <PillBadge startValue="Kleur" endValue="coolgrey" type="color" color="coolgrey" />
      <PillBadge startValue="Percentage" endValue="76" type="percentage" />
      <PillBadge startValue="Percentage & Kleur" endValue="42" type="percentage" color="robijnrood" />
      <PillBadge startValue="Percentage & Kleur" endValue="21" type="percentage" color="rood" />
    </Block>
  );
};

export default PillBadgeExamples;