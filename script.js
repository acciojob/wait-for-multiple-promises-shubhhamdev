function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateRow(row, name, time) {
    const cells = row.cells;
    cells[0].textContent = name;
    cells[1].textContent = time.toFixed(3);
}

const outputTable = document.getElementById('output');

const loadingRow = outputTable.insertRow();
const loadingCell = loadingRow.insertCell(0);
loadingCell.colSpan = 2;
loadingCell.textContent = 'Loading...';

const promises = [
    wait(Math.random() * 2000 + 1000),
    wait(Math.random() * 2000 + 1000),
    wait(Math.random() * 2000 + 1000)
];

Promise.all(promises)
    .then(times => {
        outputTable.deleteRow(loadingRow.rowIndex);

        const promiseNames = ['Promise 1', 'Promise 2', 'Promise 3'];
        for (let i = 0; i < promises.length; i++) {
            const newRow = outputTable.insertRow();
            updateRow(newRow, promiseNames[i], times[i] / 1000);
        }

        const totalTime = times.reduce((acc, time) => acc + time, 0) / 1000;
        const totalRow = outputTable.insertRow();
        updateRow(totalRow, 'Total', totalTime);
    })
    .catch(error => console.error(error));
