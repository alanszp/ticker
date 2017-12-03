import filter from 'lodash/filter';

export const search = function search(serarchString) {
    let options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };
    let queryParams = 'device=desktop&intl=us&lang=en-US&partner=none&region=US&site=finance&tz=UTC&ver=0.102.773&returnMeta=false';

    return fetch('https://cors-anywhere.herokuapp.com/https://finance.yahoo.com/_finance_doubledown/api/resource/searchassist;searchTerm=' + serarchString + '?' + queryParams, options)
        .then((resp) => {
            return resp.json();
        })
        .then((resp) => {
            return filter(resp.data.items, (e) => e.typeDisp == 'Equity')
        });
};

export const chart = function chart(ticker) {
    let options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    };
    let queryParams = 'range=1d&includePrePost=true&interval=2m&corsDomain=finance.yahoo.com&.tsrc=finance';

    return fetch('https://cors-anywhere.herokuapp.com/https://query1.finance.yahoo.com/v8/finance/chart/' + ticker + '?' + queryParams, options)
        .then((resp) => {
            return resp.json();
        })
        .then((resp) => {
            return resp.chart.result[0];
        });
};
