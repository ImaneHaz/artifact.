function addEquation() {
    const container = document.getElementById('equations-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'equation';
    input.placeholder = 'Enter your equation (e.g., y = x^2)';
    container.appendChild(input);
}

async function saveEquation(equation) {
    try {
        const response = await fetch('http://localhost:3000/save-equation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ equation })
        });
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error saving equation:', error);
        alert('Failed to save equation.');
    }
}

function plotGraph() {
    const equations = document.getElementsByClassName('equation');
    const data = [];
    
    const xMin = parseFloat(document.getElementById('x-min').value);
    const xMax = parseFloat(document.getElementById('x-max').value);
    const yMin = parseFloat(document.getElementById('y-min').value);
    const yMax = parseFloat(document.getElementById('y-max').value);
    
    for (let i = 0; i < equations.length; i++) {
        const equation = equations[i].value;

        if (!equation) {
            alert("Please enter an equation.");
            return;
        }

        const match = equation.match(/y\s*=\s*(.*)/);
        if (!match) {
            alert("Please enter a valid equation in the form y = f(x).");
            return;
        }

        const func = match[1];
        const xValues = [];
        const yValues = [];
        
        for (let x = xMin; x <= xMax; x += 0.1) {
            xValues.push(x);
            try {
                const y = math.evaluate(func, {x});
                yValues.push(y);
            } catch (e) {
                alert("Error in equation evaluation. Make sure it's a valid mathematical expression.");
                return;
            }
        }

        data.push({
            x: xValues,
            y: yValues,
            type: 'scatter',
            name: equation
        });

        saveEquation(equation);
    }

    Plotly.newPlot('graph', data, {
        xaxis: {range: [xMin, xMax]},
        yaxis: {range: [yMin, yMax]},
        title: 'Graph Plot'
    });
}
