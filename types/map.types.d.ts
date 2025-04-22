import { YMap } from "@yandex/ymaps3-types";

declare global {
  interface Window {
    map: YMap | null
  }
}