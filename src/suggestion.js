
export class Suggestion {
    static create(suggestion){
       return fetch ('https://app-js-by-yk-default-rtdb.europe-west1.firebasedatabase.app/suggestion.json', {
            method: 'POST',
            body: JSON.stringify(suggestion),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            suggestion.id = response.name
            return suggestion
        })
    }

    static fetch(token, currentUser) {
        if (!token){
            return Promise.resolve(console.log('No token'))
        }
        return fetch(
    `https://app-js-by-yk-default-rtdb.europe-west1.firebasedatabase.app/suggestion.json?auth=${token}`)
         .then(response => response.json())
         .then(response => {
             console.log(currentUser.uid, response)
                if(response) {
                const suggestions = Object.keys(response).map(key => ({
                ...response[key],
                id: key
                })).filter( s => s.userID === currentUser.uid) 
                return suggestions
                } else return []
         })
    }

    static listToHTML (suggestions) {
        return suggestions.length
            ? `${suggestions.map( s => `<li>${s.text}</li>`).join('')}`
            : `<p>No suggestions from you</p>`
    }
}
