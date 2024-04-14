import { app, auth , db} from "./firebase_config.js";
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from  "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import {getFirestore, collection, addDoc, getDocs, setDoc, doc} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

const lg_btn = document.getElementById("lg_btn");
const reg_btn = document.getElementById("reg_btn");

//Watch for user login status
onAuthStateChanged(auth , (user) => {
  if(user){console.log(user.uid);}
  else{}
})

//login auth
lg_btn.addEventListener("click", () => {
  let usrName = document.getElementById("lg_user");
  let passw = document.getElementById("lg_passw");
  lg_btn.classList.toggle("load_animation");
  lg_btn.textContent = "";
  lg_btn.style.pointerEvents = "none";
  setTimeout(function(){ login(usrName.value,passw.value) }, 2000);
  
})
function login(name,pass){
  signInWithEmailAndPassword (auth, name, pass).then(userCredential => {
    console.log("Successful login!");
    }).catch(
    err => {
        console.log(err);
        exit_animate(lg_btn);
    })
  }


//register auth
reg_btn.addEventListener("click", () => {
  let email_ = document.getElementById("reg_email");
  let passw = document.getElementById("reg_passw");
  let confm = document.getElementById("reg_cf");
  reg_btn.classList.toggle("load_animation");
  reg_btn.textContent = "";
  reg_btn.style.pointerEvents = "none";
  setTimeout(function(){ register(email_.value,passw.value,confm.value) }, 2000);
  function register(email,pass,cf){
    if(pass == cf && pass != null){
      createUserWithEmailAndPassword(auth, email, pass).then(userCredential => {
        const user = userCredential.user;
        
        setDoc(doc(db, "users_data", user.uid), {});
        
        exit_animate(reg_btn);
        
        popUpEffect();

        var accessToken = user.getIdToken();
        localStorage.setItem("accessToken", accessToken);  //user.getIdToken() = user.accessToken *, idToken changes every 10 hours , uid is constant
        console.log("Successful register!")
      }).catch(
      err => {
        console.log(err);
        exit_animate(reg_btn);
      })
    }
    else{
      alert("Please fill in your password!")
    }
  }
})

//register successful notification

function popUpEffect(){
  document.getElementsByClassName("dim")[0].style.display = "block";
  document.getElementsByClassName("modal")[0].style.display = "flex";
}

//toggle animation
function exit_animate(point){
  point.classList.toggle("load_animation");
  point.style.pointerEvents = "";
  if(point == reg_btn){
    point.textContent = "sign up";
  }
  else if(point == lg_btn){
    point.textContent = "login";
  }
}
