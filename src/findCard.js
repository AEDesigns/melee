// accept string to function as arg

export default function findCard(queryString){
    const BaseURL = 'https://api.magicthegathering.io/v1/cards';
    
    let FetchURL = BaseURL + '?name=' + queryString;
    //call api
    return fetch(FetchURL)
    .then(res => {
        return res.json();
    })
    //format data

    //retun formatted data
}