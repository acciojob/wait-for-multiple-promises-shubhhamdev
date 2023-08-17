//your JS code here. If required.
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateRow(row, time) {
    const cells = row.cells;
    cells[1].textContent = time.toFixed(3);
}

const outputTable = document.getElementById('output');

const promises = [
    wait(Math.random() * 2000 + 1000),
    wait(Math.random() * 2000 + 1000),
    wait(Math.random() * 2000 + 1000)
];

Promise.all(promises)
    .then(times => {
        const promiseNames = ['Promise 1', 'Promise 2', 'Promise 3'];
        for (let i = 0; i < promises.length; i++) {
            const newRow = outputTable.insertRow();
            const nameCell = newRow.insertCell(0);
            const timeCell = newRow.insertCell(1);

            nameCell.textContent = promiseNames[i];
            updateRow(newRow, times[i] / 1000);
        }

        const totalTime = times.reduce((acc, time) => acc + time, 0) / 1000;
        const totalRow = outputTable.insertRow();
        const totalNameCell = totalRow.insertCell(0);
        const totalTimeCell = totalRow.insertCell(1);

        totalNameCell.textContent = 'Total';
        updateRow(totalRow, totalTime);
        
        document.querySelector("tbody tr:nth-child(1)").remove();
    })
    .catch(error => console.error(error));
