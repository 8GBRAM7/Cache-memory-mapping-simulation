let cache = [];
let totalAccesses = 0;
let hits = 0;

let cacheSize = 32;
let blockSize = 4;
let numLines = 8;
let offsetBits = 2;
let indexBits = 3;

function initCache() {
    cacheSize = parseInt(document.getElementById('cacheSize').value);
    blockSize = parseInt(document.getElementById('blockSize').value);
    
    numLines = cacheSize / blockSize;
    offsetBits = Math.log2(blockSize);
    indexBits = Math.log2(numLines);

    // Initialize cache structure
    cache = Array(numLines).fill(null).map(() => ({
        valid: 0,
        tag: '-',
        data: `Block [0-${blockSize-1}]`
    }));

    totalAccesses = 0;
    hits = 0;
    updateStats();
    renderCacheTable();
    document.getElementById('binaryBreakdown').innerText = "Cache initialized successfully. Ready for lookup.";
    document.getElementById('statusMessage').innerText = "";
}

function renderCacheTable(highlightLine = -1) {
    const tbody = document.getElementById('cacheTableBody');
    tbody.innerHTML = '';

    cache.forEach((line, index) => {
        const tr = document.createElement('tr');
        if (index === highlightLine) {
            tr.classList.add('highlight-row');
        }
        tr.innerHTML = `
            <td><strong>${index}</strong> (${index.toString(2).padStart(indexBits, '0')})</td>
            <td>${line.valid}</td>
            <td>${line.tag}</td>
            <td>${line.data}</td>
        `;
        tbody.appendChild(tr);
    });
}

function updateStats() {
    document.getElementById('statTotal').innerText = totalAccesses;
    document.getElementById('statHits').innerText = hits;
    const rate = totalAccesses === 0 ? 0 : ((hits / totalAccesses) * 100).toFixed(1);
    document.getElementById('statRate').innerText = rate + '%';
}

function accessAddress() {
    const address = parseInt(document.getElementById('memAddress').value);
    if (isNaN(address) || address < 0) {
        alert("Please enter a valid positive decimal address.");
        return;
    }

    totalAccesses++;

    // Calculate bits (Assuming 16-bit total address space for simplicity)
    const totalBits = 16;
    const addressBinary = address.toString(2).padStart(totalBits, '0');

    // Extract Offset, Index, Tag
    const blockOffset = address % blockSize;
    const blockNumber = Math.floor(address / blockSize);
    const index = blockNumber % numLines;
    const tag = Math.floor(blockNumber / numLines);

    // Format binary strings for visualization
    const tagBits = addressBinary.substring(0, totalBits - indexBits - offsetBits);
    const indexBitsStr = addressBinary.substring(totalBits - indexBits - offsetBits, totalBits - offsetBits);
    const offsetBitsStr = addressBinary.substring(totalBits - offsetBits);

    document.getElementById('binaryBreakdown').innerHTML = 
        `Decimal: ${address} | Binary: ${addressBinary}<br>` +
        `<span style="color: #60a5fa;">Tag: ${tagBits}</span> | ` +
        `<span style="color: #34d399;">Index: ${indexBitsStr} (${index})</span> | ` +
        `<span style="color: #f472b6;">Offset: ${offsetBitsStr} (${blockOffset})</span>`;

    // Check Cache Hit / Miss
    let statusHTML = "";
    const cacheLine = cache[index];

    if (cacheLine.valid === 1 && cacheLine.tag === tag) {
        // HIT
        hits++;
        statusHTML = `<span class="hit-badge">CACHE HIT! </span>`;
    } else {
        // MISS
        cacheLine.valid = 1;
        cacheLine.tag = tag;
        cacheLine.data = `Mem Block [${blockNumber * blockSize} - ${(blockNumber + 1) * blockSize - 1}]`;
        statusHTML = `<span class="miss-badge">CACHE MISS! (Loaded from RAM)</span>`;
    }

    document.getElementById('statusMessage').innerHTML = statusHTML;
    updateStats();
    renderCacheTable(index);
}

// Initialize on page load
window.onload = initCache;