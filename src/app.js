  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBqPt7q0D6GHR8LleR151P4nkScUKK0H3c",
    authDomain: "app-js-by-yk.firebaseapp.com",
    databaseURL: "https://app-js-by-yk-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "app-js-by-yk",
    storageBucket: "app-js-by-yk.appspot.com",
    messagingSenderId: "359034077315",
    appId: "1:359034077315:web:e6ad2d13ecd8fdc5769bb6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


import { Suggestion } from './suggestion';
import { hideModal, isValid, showModal, isUser } from './utils';
import './styles.css';


const auth = firebase.auth();
const form = document.getElementById('form');
const input = form.querySelector('#suggestion-input');
const sendBtn = form.querySelector('#send');
const list = document.getElementById('list')
const cancelBtn = document.getElementById('cancel');
const loginBtn = document.getElementById('login-btn');
const signUpBtn = document.getElementById('signup');
const signInBtn = document.getElementById('signin');
const userTitle = document.getElementById('usertitle')


signInBtn.onclick = signIn;
signUpBtn.onclick = signUp;
loginBtn.onclick = showModal;
cancelBtn.onclick = cancel;
form.addEventListener('submit', sendFormHandler);
input.addEventListener('input', () => {
    sendBtn.disabled = !isValid(input.value)
})


function sendFormHandler(event) {
    event.preventDefault();

    if (isValid(input.value)) {
        if(!auth.currentUser){
            let label = document.getElementById('label-for-suggestion-input')
            label.innerHTML = 'You are not logged in!'
            label.style.color = 'red'
            sendBtn.disabled = true;
            setTimeout(() => {
                label.innerHTML = 'Your suggestions'
                label.style.color = ''
                sendBtn.disabled = false;
            }, 2000);
            
        } else {
        const suggestion = {
            text: input.value.trim(),
            date: new Date().toJSON(),
            userID: auth.currentUser.uid,
        }

        sendBtn.disabled = true;

        // Async request to server to seve suggestion
        Suggestion.create(suggestion).then( () => {

            auth.onAuthStateChanged(function(user){
            
                    user.getIdToken(true)
                        .then(function(idToken) {
                        Suggestion.fetch(idToken, auth.currentUser)
                        .then(suggestion => renderList(suggestion) )
                    })
                    .catch(function(error) {
                    console.log(`error: ${error}`)
                  });

            })
        

            input.value = "";
            input.className = "";
            sendBtn.disabled = false;
        })
    }}
}
function signUp(event){
    event.preventDefault();
    
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    const Promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    Promise.catch( e => alert(e.message));
    console.log("Singed Up");
    hideModal();
   

}

function signIn(event){
    event.preventDefault()
    
    const email = document.getElementById('email')
    const password = document.getElementById('password')

    const promise = auth.signInWithEmailAndPassword(email.value, password.value)

    promise.catch( e => alert(e.message))
    hideModal()
}

function signOut(event){
    event.preventDefault()

    auth.signOut()
    list.innerHTML = ""
    email.value = ''
    password.value = ''
    console.log('Signed Out from: ' + email)

}

function cancel(event){
    event.preventDefault()
    hideModal()
}

auth.onAuthStateChanged(function(user){
    if(user){

        user.getIdToken(true).then(function(idToken) {
            Suggestion.fetch(idToken, auth.currentUser)
            .then(suggestion => renderList(suggestion) )
      })
      .catch(function(error) {
        console.log(`error: ${error}`)
      });

        let email = user.email
        loginBtn.innerHTML = 'Log Out'
        loginBtn.onclick = signOut
        userTitle.innerHTML = `User: ${email}`

    } else{
        loginBtn.innerHTML = 'Log In'
        loginBtn.onclick = showModal
        userTitle.innerHTML = 'Unknown user'
    }
})

    
function renderList(content) {
    list.innerHTML = Suggestion.listToHTML(content)
} 


