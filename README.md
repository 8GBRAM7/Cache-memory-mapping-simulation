# Cache-memory-mapping-simulation
An interactive web-based Cache Memory Mapping Simulator built with HTML, CSS, and JavaScript. It visually demonstrates Direct, Fully Associative, and Set-Associative memory mapping algorithms with real-time address decoding.
# Interactive Cache Memory Mapping Simulator 🧠⚡

A frontend web application that visually simulates how CPU cache memory mapping algorithms work in real-time. This project was developed as a mini-project for the **Computer Organization and Architecture (COA)** course.

##  Overview
Understanding how data moves between main memory (RAM) and cache memory is crucial in computer architecture. This simulator provides an interactive, visual representation of memory address partitioning. Users can input memory parameters and instantly see how physical memory addresses are broken down into **Tag**, **Index**, and **Offset** bits to locate data within the cache.

##  features
* **Dynamic Configuration:** Customize Cache Size, Block Size, and Main Memory parameters on the fly.
* **Real-time Address Decoding:** Instantly translates decimal memory addresses into binary, displaying the exact bit breakdown.
* **Visual Memory Grid:** A clean UI that visually routes data blocks from RAM to their assigned cache slots.
* **Hit/Miss Tracking:** Live statistics tracking total accesses, cache hits, cache misses, and hit rate percentage.
* **No Dependencies:** Built entirely with vanilla web technologies.

##  Tech Stack
* **HTML5:** Semantic structure and layout.
* **CSS3:** Custom styling, neon-glow visual feedback, and responsive grid layouts.
* **Vanilla JavaScript (ES6):** Core logical computations, bitwise operations, logarithms, and DOM manipulation.

## How to Run Locally
Since this project uses pure frontend technologies, no build steps or servers are required!
1. Clone the repository:
   ```bash
   git clone [https://github.com/8GBRAM7/cache-memory-simulator.git](https://github.com/8GBRAM7/cache-memory-simulator.git)
