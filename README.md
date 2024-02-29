This is a [Next.js](https://nextjs.org/) / Capacitor demo project to test Geckoview with Capacitor.


## Getting Started

1. Initialize packages.

```bash
yarn install
```

2. Build the nextjs app and export to the out folder.

```bash
yarn build
```

3. Synchronize the capacitor app.

```bash
npx cap sync
```

4. In `android/capacitor.settings.gradle`, replace the line:

`project(':capacitor-android').projectDir = new File('../node_modules/@capacitor/android/capacitor')`

with:

`project(':capacitor-android').projectDir = new File('../capacitor-geckoview/capacitor')`

5. Build the app using Android studio.

6. If Geckoview is successfully being used, the main page should show `geckoview_accessing_localhost_port/xxxx` at the bottom as the user agent.


## Other Platforms & Geckoview Versions

To build for other platforms (default is `arm64-v8a`), comment out the `ndk` block in `android/app/build.gradle`.

The default Geckoview version used is 117 for its balance of performance and size.  For a smaller size we can use older versions of Geckoview by modifying the appropriate line in `capacitor-geckoview/capacitor/build.gradle`.


## TODOs

- Port this to Capacitor 6.0.
- Complete implementation of unimplemented features.
