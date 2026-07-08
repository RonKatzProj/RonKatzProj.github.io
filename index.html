<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>p-Norm Unit Ball Simulator</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-gray-100 min-h-screen flex flex-col items-center justify-center p-6">

    <div class="w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700">
        <h1 class="text-2xl font-bold mb-2 text-center text-indigo-400">The p-Norm Unit Ball Morphing Simulator</h1>
        <p class="text-sm text-gray-400 text-center mb-6">
            Visualizing the set of points where ||x||ₚ = 1 in 2D space
        </p>

        <div class="relative h-96 w-full mb-6 bg-gray-950 rounded-xl p-2">
            <canvas id="normChart"></canvas>
        </div>

        <div class="space-y-4">
            <div class="flex justify-between items-center">
                <label for="p-slider" class="text-sm font-medium text-gray-300">
                    Value of p: <span id="p-val" class="text-indigo-400 font-bold text-lg">2.00</span>
                </label>
                <span id="norm-type" class="text-xs font-semibold px-2 py-1 rounded bg-indigo-900 text-indigo-200">
                    Euclidean Norm
                </span>
            </div>
            
            <input 
                type="range" 
                id="p-slider" 
                min="0.5" 
                max="10" 
                step="0.05" 
                value="2" 
                class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            >

            <div class="flex justify-between text-xs px-1 gap-2">
                <button onclick="snapToP(0.5)" class="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 py-1.5 px-2 rounded text-center transition cursor-pointer border border-gray-600">
                    p = 0.5 (Non-convex)
                </button>
                <button onclick="snapToP(1)" class="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 py-1.5 px-2 rounded text-center transition cursor-pointer border border-gray-600">
                    p = 1 (Manhattan)
                </button>
                <button onclick="snapToP(2)" class="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 py-1.5 px-2 rounded text-center transition cursor-pointer border border-gray-600">
                    p = 2 (Euclidean)
                </button>
                <button onclick="snapToP(10)" class="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 py-1.5 px-2 rounded text-center transition cursor-pointer border border-gray-600">
                    p → ∞ (Max Norm)
                </button>
            </div>
        </div>
    </div>

    <script>
        const ctx = document.getElementById('normChart').getContext('2d');
        const pSlider = document.getElementById('p-slider');
        const pValDisplay = document.getElementById('p-val');
        const normTypeDisplay = document.getElementById('norm-type');

        // Generate points for the unit ball boundary
        function generateNormPoints(p) {
            const points = [];
            const steps = 400;

            for (let i = 0; i <= steps; i++) {
                const theta = (i / steps) * 2 * Math.PI;
                const cos = Math.cos(theta);
                const sin = Math.sin(theta);

                // r = 1 / (|cos|^p + |sin|^p)^(1/p)
                const denom = Math.pow(Math.pow(Math.abs(cos), p) + Math.pow(Math.abs(sin), p), 1 / p);
                const r = 1 / denom;

                points.push({ x: r * cos, y: r * sin });
            }
            return points;
        }

        // Initialize Chart.js
        const normChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Unit Circle',
                    data: generateNormPoints(2),
                    showLine: true,
                    borderColor: 'rgb(99, 102, 241)',
                    borderWidth: 3,
                    pointRadius: 0,
                    backgroundColor: 'rgba(99, 102, 241, 0.05)',
                    fill: true,
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { min: -1.5, max: 1.5, grid: { color: '#374151' }, ticks: { color: '#9CA3AF' } },
                    y: { min: -1.5, max: 1.5, grid: { color: '#374151' }, ticks: { color: '#9CA3AF' } }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });

        // Label helper based on p value
        function updateNormLabel(p) {
            if (p < 1) return "Non-Convex Space";
            if (p === 1) return "Taxicab / Manhattan Norm (l₁)";
            if (p === 2) return "Euclidean Norm (l₂)";
            if (p >= 8) return "Approaching Chebyshev / Max Norm (l∞)";
            return "Minkowski Norm";
        }

        // Main render engine update logic
        function updateSimulation(p) {
            // UI Text adjustments
            pValDisplay.textContent = p === 10 ? "∞ (Simulated)" : p.toFixed(2);
            normTypeDisplay.textContent = updateNormLabel(p);
            
            // Math calculations - cap infinity simulation at p=20 for clean rendering
            const calculationP = p === 10 ? 20 : p; 
            normChart.data.datasets[0].data = generateNormPoints(calculationP);
            normChart.update('none');
        }

        // Handle Slider input
        pSlider.addEventListener('input', (e) => {
            let p = parseFloat(e.target.value);
            if (Math.abs(p - 1) < 0.02) p = 1;
            if (Math.abs(p - 2) < 0.02) p = 2;
            updateSimulation(p);
        });

        // Handle Clickable Tickets
        function snapToP(targetValue) {
            pSlider.value = targetValue;
            updateSimulation(targetValue);
        }
    </script>
</body>
</html>