const canvas = document.getElementById('normChart');
const ctx = canvas.getContext('2d');
const pSlider = document.getElementById('p-slider');
const pValDisplay = document.getElementById('p-val');
const normTypeDisplay = document.getElementById('norm-type');
const vxInput = document.getElementById('v-x-input');
const vyInput = document.getElementById('v-y-input');
const normCalcDisplay = document.getElementById('norm-calc-display');

// Initialize vector coordinates to exactly (1/√2, 1/√2)
let vectorV = { x: 1 / Math.sqrt(2), y: 1 / Math.sqrt(2) };
let isDragging = false;

// Sync programmatic value states to input forms
function syncInputBoxes() {
    vxInput.value = vectorV.x.toFixed(4);
    vyInput.value = vectorV.y.toFixed(4);
}
syncInputBoxes();

// Calculates coordinate mapping points for the unit ball boundary
function generateNormPoints(p) {
    const points = [];
    const steps = 400;

    for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * 2 * Math.PI;
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);

        const denom = Math.pow(Math.pow(Math.abs(cos), p) + Math.pow(Math.abs(sin), p), 1 / p);
        const r = 1 / denom;

        points.push({ x: r * cos, y: r * sin });
    }
    return points;
}

// Global chart setup parameters
const normChart = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [
            {
                label: 'Unit Circle',
                data: generateNormPoints(2),
                showLine: true,
                borderColor: 'rgb(99, 102, 241)',
                borderWidth: 3,
                pointRadius: 0,
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
                fill: true,
                tension: 0.1,
                order: 2
            },
            {
                label: 'Vector V Line',
                data: [{ x: 0, y: 0 }, { x: vectorV.x, y: vectorV.y }],
                showLine: true,
                borderColor: 'rgb(52, 211, 153)',
                borderWidth: 4,
                pointRadius: 0,
                order: 1
            },
            {
                label: 'Vector V Tip',
                data: [{ x: vectorV.x, y: vectorV.y }],
                pointRadius: 8,
                pointHoverRadius: 11,
                pointBackgroundColor: 'rgb(52, 211, 153)',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                order: 0
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false, 
        scales: {
            x: { min: -1.5, max: 1.5, grid: { color: '#374151' }, ticks: { color: '#9CA3AF' } },
            y: { min: -1.5, max: 1.5, grid: { color: '#374151' }, ticks: { color: '#9CA3AF' } }
        },
        plugins: {
            legend: { display: false },
            zoom: {
                zoom: {
                    wheel: { enabled: true, speed: 0.05 },
                    mode: 'xy',
                    modifierKey: null,
                    onZoom: function({chart}) {
                        const currentXMax = chart.scales.x.max;
                        const currentXMin = chart.scales.x.min;
                        const currentBound = (currentXMax + Math.abs(currentXMin)) / 2;
                        const targetBound = Math.max(0.1, currentBound);

                        chart.scales.x.options.min = -targetBound;
                        chart.scales.x.options.max = targetBound;
                        chart.scales.y.options.min = -targetBound;
                        chart.scales.y.options.max = targetBound;
                        chart.update('none');
                    }
                }
            }
        }
    }
});

// Computes vector p-norm while explicitly checking for Max Norm boundaries
function calculateVectorNorm(x, y, p) {
    if (p >= 10) {
        return Math.max(Math.abs(x), Math.abs(y));
    }
    return Math.pow(Math.pow(Math.abs(x), p) + Math.pow(Math.abs(y), p), 1 / p);
}

function updateNormLabel(p) {
    if (p < 1) return "Non-Convex Space";
    if (p === 1) return "Taxicab / Manhattan Norm (l₁)";
    if (p === 2) return "Euclidean Norm (l₂)";
    if (p >= 10) return "Chebyshev / Max Norm (l_infinity)";
    return "Minkowski Norm";
}

// Global Execution Redraw Engine Loop
function updateSimulation() {
    let p = parseFloat(pSlider.value);
    if (Math.abs(p - 1) < 0.02) p = 1;
    if (Math.abs(p - 2) < 0.02) p = 2;

    pValDisplay.textContent = p === 10 ? "∞ (Simulated)" : p.toFixed(2);
    normTypeDisplay.textContent = updateNormLabel(p);
    
    // Boundary geometry mapping
    const calculationP = p === 10 ? 20 : p; 
    normChart.data.datasets[0].data = generateNormPoints(calculationP);
    
    // Dynamic Vector updating
    normChart.data.datasets[1].data = [{ x: 0, y: 0 }, { x: vectorV.x, y: vectorV.y }];
    normChart.data.datasets[2].data = [{ x: vectorV.x, y: vectorV.y }];
    
    // Compute real-time norm output string
    const currentNormValue = calculateVectorNorm(vectorV.x, vectorV.y, p);
    normCalcDisplay.textContent = currentNormValue.toFixed(4);

    normChart.update('none');
}

// Drag & Coordinate Manipulation Event Parsers
function handleCanvasPointer(e) {
    const rect = canvas.getBoundingClientRect();
    const canvasX = e.clientX - rect.left;
    const canvasY = e.clientY - rect.top;

    // Convert pixel mapping to coordinate scales inside chart axes
    const graphX = normChart.scales.x.getValueForPixel(canvasX);
    const graphY = normChart.scales.y.getValueForPixel(canvasY);

    if (graphX !== undefined && graphY !== undefined) {
        vectorV.x = graphX;
        vectorV.y = graphY;
        syncInputBoxes();
        updateSimulation();
    }
}

// Canvas Mouse Event Hooks
canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const canvasX = e.clientX - rect.left;
    const canvasY = e.clientY - rect.top;

    const tipPixelX = normChart.scales.x.getPixelForValue(vectorV.x);
    const tipPixelY = normChart.scales.y.getPixelForValue(vectorV.y);

    // Click tolerance bubble check around vector tip
    const distance = Math.sqrt(Math.pow(canvasX - tipPixelX, 2) + Math.pow(canvasY - tipPixelY, 2));
    if (distance < 20) {
        isDragging = true;
    }
});

window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        handleCanvasPointer(e);
    }
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

// Manual UI input form modification pipes
[vxInput, vyInput].forEach(input => {
    input.addEventListener('input', () => {
        let valX = parseFloat(vxInput.value);
        let valY = parseFloat(vyInput.value);
        
        vectorV.x = isNaN(valX) ? 0 : valX;
        vectorV.y = isNaN(valY) ? 0 : valY;
        
        updateSimulation();
    });
});

pSlider.addEventListener('input', updateSimulation);

function snapToP(targetValue) {
    pSlider.value = targetValue;
    updateSimulation();
}

// Fire calculation loop on boot
updateSimulation();