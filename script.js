function toggleClassHeight() {
    let op = document.getElementById("operation").value;
    let box = document.getElementById("classHeightBox");

    if (op === "median" || op === "mode") {
        box.style.display = "block";
    } else {
        box.style.display = "none";
    }
}

function calculate() {
    let x = document.getElementById("xValues").value.split(",").map(Number);
    let f = document.getElementById("fValues").value.split(",").map(Number);
    let op = document.getElementById("operation").value;
    let resultBox = document.getElementById("result");

    let N = f.reduce((a, b) => a + b, 0);
    let mean = x.reduce((sum, xi, i) => sum + xi * f[i], 0) / N;

    let result;

    if (op === "mean") {
        result = mean.toFixed(2);
    }

    else if (op === "pvariance" || op === "svariance" || op === "pstd" || op === "sstd") {
        let variance = x.reduce((sum, xi, i) => {
            return sum + f[i] * Math.pow(xi - mean, 2);
        }, 0);

        if (op === "pvariance" || op === "pstd") {
            variance = variance / N;
        } else {
            variance = variance / (N - 1);
        }

        result = (op.includes("std")) ? Math.sqrt(variance).toFixed(2) : variance.toFixed(2);
    }

    else if (op === "median") {
        let h = Number(document.getElementById("classHeight").value);
        let cf = [];
        f.reduce((a, b, i) => cf[i] = a + b, 0);

        let medianClassIndex = cf.findIndex(c => c >= N / 2);
        let l = x[medianClassIndex] - h / 2;
        let cfb = cf[medianClassIndex - 1] || 0;
        let fm = f[medianClassIndex];

        result = (l + ((N / 2 - cfb) / fm) * h).toFixed(2);
    }

    else if (op === "mode") {
        let h = Number(document.getElementById("classHeight").value);
        let m = f.indexOf(Math.max(...f));
        let l = x[m] - h / 2;

        let f1 = f[m];
        let f0 = f[m - 1] || 0;
        let f2 = f[m + 1] || 0;

        result = (l + ((f1 - f0) / (2 * f1 - f0 - f2)) * h).toFixed(2);
    }

    else {
        result = "Please select an operation";
    }

    resultBox.innerHTML = "Result: <b>" + result + "</b>";
}


  