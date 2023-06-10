(async function() {
    new Chart(
        document.getElementById('tokenomic-chart'),
        {
            type: 'pie',
            data: {
                datasets: [{
                    data: [50, 15, 10, 10, 10, 5],
                    backgroundColor: [
                        '#03264e',
                        '#053162',
                        '#40015a',
                        '#51197c',
                        '#7a0aaa',
                        '#7e09c9'
                    ],
                    hoverOffset: 4
                }],
            },
            borderWidth: 0
        }
    );
})();