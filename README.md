# Vite vs. Next + turbopack HMR Benchmark

## Methodology

1. The two projects are created from the following commands:

   ```sh
   npx create-next-app@latest
   npm init vite@latest # select React preset
   ```

2. `genFiles.(m)js` is run in each project to generate 1000 components. All components are imported in the app's root component (in Next's case, the root page component) and rendered together. This step is already done and the files are already checked in, but the script is included for reference.

3. For Next, `app/page.js` has the `'use client'` directive so it renders in client mode. This is necessary to ensure proper comparison, since server components incurs non-trivial HMR overhead (4x slower).

4. For Vite, we are using `vite-plugin-swc-react-refresh` so that the React JSX & HMR transform are using swc instead of Babel. The reason Vite's default React plugin uses Babel is because using swc results in 58MB of extra install weight (when Vite itself is 19MB) for marginal HMR improvement. However, for the purpose of benchmarking, we should use the same transforms turbopack is using so that the comparison is focused on the HMR mechanisms of the two tools.

5. For each project, we run `watch.(m)js` in a separate Node process to get the exact timestamp of file change. This is used to mark the start of HMR.

6. Start the projects (`vite` and `next dev --turbo`), then edit the following files to test HMR:

   - Next: `app/page.js` (root) and `app/comp0.jsx` (leaf)
   - Vite: `src/App.jsx` (root) and `src/components/comp0.jsx` (leaf)

The edited components all render `Date.now()` in their output. The final rendered timestamp in the DOM is used to mark the completion of HMR.

## Numbers

- Recorded over 5 runs
- Time in ms
- Tested on M1 MacBook Pro

|         | Vite (root) | Vite (leaf) | Next (client root) | Next (client leaf) | Next (RSC root) | Next (RSC leaf) |
| ------- | ----------- | ----------- | ------------------ | ------------------ | --------------- | --------------- |
| 1       | 342         | 141         | 335                | 87                 | 782             | 661             |
| 2       | 358         | 141         | 343                | 72                 | 912             | 633             |
| 3       | 352         | 143         | 334                | 88                 | 922             | 453             |
| 4       | 337         | 139         | 337                | 85                 | 829             | 640             |
| 5       | 302         | 145         | 324                | 90                 | 737             | 539             |
| Average | 338.2       | 141.8       | 334.6              | 84.4               | 836.4           | 585.2           |

## Notes

- The Next RSC numbers are only included for reference (compare between server/client HMR in Next).
- For the root component (big with many imports and child components), Vite and Next + turbopack are almost equally fast.
- For the leaf component (small, no imports), Next + turbopack is about 68% faster.
- This is quite far from the claim that "turbopack is 10x faster than Vite" as we've seen from Vercel's marketing materials.
