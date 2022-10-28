# Vite vs. Next + turbopack HMR Benchmark

## Methodology

1. Both projects are freshly created from the following commands:

   ```sh
   npx create-next-app@latest
   npm init vite@latest # select React preset
   ```

2. `genFiles.(m)js` is run in each project to generate 1000 components. All components are imported in the app's root component (in Next's case, the root page component) and rendered together. This step is already done and the files are already checked in, but the script is included for reference.

3. `app/page.js` has the `'use client'` directive so it renders in client mode. This is necessary to ensure proper comparison, since server components incurs non-trivial HMR overhead (4x slower).

4. For each project, we run `watch.(m)js` in a separate Node process to get the exact timestamp of file change. This is used to mark the start of HMR.

5. Start the projects (`vite` and `next dev --turbo`), then edit the following files to test HMR:

   - Next: `app/page.js` (root) and `app/comp0.jsx` (leaf)
   - Vite: `src/App.jsx` (root) and `src/components/comp0.jsx` (leaf)

The edited components all render `Date.now()` in their output. The final rendered timestamp in the DOM is used to mark the completion of HMR.

## Numbers

- Recorded over 5 runs
- Time in ms
- Tested on M1 MacBook Pro

|         | Vite (root) | Vite (leaf) | Next (client root) | Next (client leaf) | Next (RSC root) | Next (RSC leaf) |
| ------- | ----------- | ----------- | ------------------ | ------------------ | --------------- | --------------- |
| 1       | 580         | 179         | 335                | 87                 | 782             | 661             |
| 2       | 667         | 177         | 343                | 72                 | 912             | 633             |
| 3       | 638         | 183         | 334                | 88                 | 922             | 453             |
| 4       | 513         | 180         | 337                | 85                 | 829             | 640             |
| 5       | 632         | 140         | 324                | 90                 | 737             | 539             |
| Average | 606         | 171.8       | 334.6              | 84.4               | 836.4           | 585.2           |
