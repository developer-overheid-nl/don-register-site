declare module "*.module.css";

declare module "*?raw" {
  const src: string;
  export default src;
}
