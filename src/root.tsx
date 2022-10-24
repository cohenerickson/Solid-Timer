// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title
} from "solid-start";
import "./root.css";

const seo = {
  name: "Solid Timer",
  description:
    "A Rubik's cube timer application inspired by ChaoTimer and csTimer built using SolidJS, Typescript, TailwindCSS, and Capacitor.",
  favicon: "/favicon.ico",
  icon: "/192.png",
  themeColor: "#000000",
  keywords:
    "puzzle,speedcubing,rubiks cube,wca,rubiks cube timer,cubing,rubiks,twistypuzzles,cubing timer"
};

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="theme-color" content={seo.themeColor} />

        <Title>{seo.name}</Title>
        <Meta property="og:title" content={seo.name} />

        <link rel="icon" href="/favicon.ico" />
        <Meta property="og:image" content={seo.icon} />
        <link rel="apple-touch-icon" href={seo.icon} />

        <Meta name="robots" content="index, follow" />
        <Meta name="revisit-after" content="7 days" />

        <Meta name="description" content={seo.description} />
        <Meta property="og:description" content={seo.description} />
        <Meta name="keywords" content={seo.keywords} />
      </Head>
      <Body class="bg-white text-black dark:bg-black dark:text-white select-none h-screen">
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
