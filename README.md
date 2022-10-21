# 🚧 This project is under development 🚧

# Solid Timer

A Rubik's cube timer application inspired by ChaoTimer and csTimer built using SolidJS, Typescript, TailwindCSS, and Capacitor.

# Data Storage

All data is stored in the browser using different API's, settings are stored in `localStorage` and all session related information such as solves are stored in `indexedDB`.

There are plans in the future to create a cloud storage option with cross-device sync that will be available to paying users.

# Development

```bash
# Cloning repo
git clone https://github.com/cohenerickson/Solid-Timer.git
cd Solid-Timer

# Installing dependencies
npm install

# Starting development server
npm run dev
```

## Building from source

```bash
# Building for web
npm run build

# Open in Android Studio for Android builds
npm run start:android

# Open in XCode for IOS builds
npm run start:ios
```
