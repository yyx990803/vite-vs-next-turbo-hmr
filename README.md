# Vite vs. Next + turbopack HMR Benchmark

## Methodology

1. Both projects are freshly created from the following commands:

   ```sh
   npx create-next-app@latest
   npm init vite@latest # select React preset
   ```

2. `genFiles.(m)js` runs in each project to generate 1000 components. All components are imported in the app's root component (in Next's case, the root page component) and rendered together. This step is already done and the files are already checked in, but the script is included for reference.

3. For each project, we run `watch.(m)js` in a separate Node process to get the exact timestamp of file change. This is used to mark the start of HMR.

4. Start the projects (`vite` and `next dev --turbo`), then edit the following files to test HMR:

   - Next: `app/page.js` (root) and `app/comp0.jsx` (leaf)
   - Vite: `src/App.jsx` (root) and `src/components/comp0.jsx` (leaf)

The edited components all render `Date.now()` in their output. The final rendered timestamp in the DOM is used to mark the completion of HMR.

## Numbers

- Recorded over 5 runs
- Time in ms
- Tested on M1 MacBook Pro

|         | Vite (root) | Next (root) | Vite (leaf) | Next (leaf) |
| ------- | ----------- | ----------- | ----------- | ----------- |
| 1       | 580         | 782         | 179         | 661         |
| 2       | 667         | 912         | 177         | 633         |
| 3       | 638         | 922         | 183         | 453         |
| 4       | 513         | 829         | 180         | 640         |
| 5       | 632         | 737         | 140         | 539         |
| Average | 606         | 836.4       | 171.8       | 585.2       |
