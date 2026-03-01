import type React from "react";

type Meta = {
  title?: string;
  description?: string;
};

type BaseRoute<M> = {
  path: string;
  meta?: M;
};

type LayoutRoute<M = Meta> = BaseRoute<M> & {
  type: "layout";
  layout: React.ReactNode;
  children?: Route<M>[];
};

type PageRoute<M = Meta> = BaseRoute<M> & {
  type: "page";
  element: React.ReactNode;
  children?: Route<M>[];
};

export type Route<M = any> = LayoutRoute<M> | PageRoute<M>;
export type { LayoutRoute, PageRoute };