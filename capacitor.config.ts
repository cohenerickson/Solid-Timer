import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.cohenerickson.timer",
  appName: "solid-timer",
  webDir: "dist/public",
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: true,
      backgroundColor: "#000000FF"
    }
  }
};

export default config;
