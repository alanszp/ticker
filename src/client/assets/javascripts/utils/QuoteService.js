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
