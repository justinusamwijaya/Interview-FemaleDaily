
function getAllTweets(){
    let request = new XMLHttpRequest()

    let query = window.location.href.split('?')[1]

    let url = query === undefined || query.split('=')[1].trim === null || query.split('=')[0] !== 'q' ? "http://localhost:3000/" : "http://localhost:3000/"+ query.split('=')[1]

    let name = url === "http://localhost:3000/" ? 'You retweeted' : 'a retweet related to <b> '+query.split('=')[1]+'</b>'

    request.open("GET",url,true)
    request.onload = function(){
        if(request.status >= 200 && request.status < 400){

            result = JSON.parse(request.response)
            console.log(result)
            for(let i in result){
                console.log("wat??",result[i])
                if(result[i].retweetedFrom!==undefined){
                result[i] = `
                        <div class='col-xs-offset-1 col-xs-10 panel panel-default postPanel' >
                            <div class='panel-heading postHeader' >
                            ${name} from <label for=""> ${result[i].retweetedFrom}</label>
                            </div>
                            <div class='panel-body postBody' >
                                <p>${result[i].tweetContent}</p>
                            </div>
                            <button class='borderFix' onclick = "remove('${result[i].id}')">delete</button>
                        </div>`
                }else{
                    console.log("got here?")
                    result[i] = `
                    <div class='col-xs-offset-1 col-xs-10 panel panel-default postPanel' >
                        <div class='panel-heading postHeader' >
                        <label for="">${result[i].yourUsername}</label>
                        </div>
                        <div class='panel-body postBody' >
                            <p>${result[i].yourTweetContent}</p>
                        </div>
                        <button class='borderFix' onclick = "remove('${result[i].id}')">delete</button>
                    </div>`
                }
            }

            if(query === undefined){
                result.splice(0,0,'<h1>Your Tweets</h1>')
            }else{
                result.splice(0,0,'<h1>Tweets related to '+query.split('=')[1]+'</h1>')
            }

            document.querySelector('#postContainer').innerHTML = result.join("")
        }else{
            console.log("there's an error occured")
        }
    }
    request.send();
}


let submitTweetPost = document.getElementById('tweetPostSubmit')
let actionTaken = document.getElementById('selectAction')
let postInput = document.getElementById('tweetPost')

postInput.placeholder = 'write your tweet!'

submitTweetPost.addEventListener('click',function(){
    if(actionTaken.value === "newTweet"){
        return newTweet()
    }else{
        return reTweet()
    }
})

actionTaken.addEventListener('change',function(){
    if(actionTaken.value === 'newTweet'){
        postInput.placeholder = 'write your tweet!'
    }else{
        postInput.placeholder = 'tweet id!'
    }
})

function newTweet(){
    let request = new XMLHttpRequest()
    request.open("POST","http://localhost:3000/",true)
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            window.location.reload()
        }else{
            console.log("there's an error occured")
        }
    }
    
    request.send('status=' + postInput.value)
}

function reTweet(){
    let request = new XMLHttpRequest()
    request.open("POST","http://localhost:3000/retweet",true)
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            window.location.reload()
        }else{
            console.log("there's an error occured")
        }
    }
    
    request.send('id=' + postInput.value)
}


function remove(id){
    let deleteRequest = new XMLHttpRequest()
    deleteRequest.open("DELETE","http://localhost:3000/destroy",true)
    deleteRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    deleteRequest.onload = function(){
        if(deleteRequest.status >= 200 && deleteRequest.status < 400){
            window.location.reload()
        }else{
            console.log("there's an error occured")
        }
    }
    deleteRequest.send("id=" + id)
}

let tweetSearchSubmit = document.getElementById('tweetSearchsubmit')

tweetSearchSubmit.addEventListener('click',function(){
    window.location.href = '?q='+document.getElementById('tweetSearch').value
})

//Facebook thingy


//   // This is called with the results from from FB.getLoginStatus().
//   function statusChangeCallback(response) {
//     console.log('statusChangeCallback');
//     console.log(response);
//     if(!response.authResponse){
//         document.getElementById("loginFB").style.display = "block"
//         document.getElementById("logoutFB").style.display = "none"
//         document.querySelector('#postContainer').innerHTML = `<a data-toggle="modal" data-target="#exampleModal" style="cursor: pointer;">Mohon Login Dahulu</a>`
//         return 
//     }

//     // getAllTweets()
//     document.getElementById("loginFB").style.display = "none"
//     document.getElementById("logoutFB").style.display = "block"
//     axios.defaults.headers.common['Authorization'] = response.authResponse.accessToken;
//     axios.post('http://localhost:3000/testFB',{Headers:{tes:response}})
//     .then(function (response) {
//         console.log('yooooooo')
//         localStorage.setItem('token',response.data)
//     })
//     .catch(function (error) {
//         console.log('eeeey')
//         console.log(error);
//     });
//     // The response object is returned with a status field that lets the
//     // app know the current login status of the person.
//     // Full docs on the response object can be found in the documentation
//     // for FB.getLoginStatus().
//     if (response.status === 'connected') {
//       // Logged into your app and Facebook.
//       testAPI();
//     } else {
//       // The person is not logged into your app or we are unable to tell.

//     }
//   }

//   // This function is called when someone finishes with the Login
//   // Button.  See the onlogin handler attached to it in the sample
//   // code below.
//   function checkLoginState() {
//     FB.getLoginStatus(function(response) {
//       statusChangeCallback(response);
//     });
//   }

//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,  // enable cookies to allow the server to access 
//                           // the session
//       xfbml      : true,  // parse social plugins on this page
//       version    : 'v2.8' // use graph api version 2.8
//     });

//     // Now that we've initialized the JavaScript SDK, we call 
//     // FB.getLoginStatus().  This function gets the state of the
//     // person visiting this page and can return one of three states to
//     // the callback you provide.  They can be:
//     //
//     // 1. Logged into your app ('connected')
//     // 2. Logged into Facebook, but not your app ('not_authorized')
//     // 3. Not logged into Facebook and can't tell if they are logged into
//     //    your app or not.
//     //
//     // These three cases are handled in the callback function.

//     FB.getLoginStatus(function(response) {
//       statusChangeCallback(response);
//     });

//   };

//   // Load the SDK asynchronously
//   (function(d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s); js.id = id;
//     js.src = 'https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v3.0&appId=169025383766399&autoLogAppEvents=1';
//     fjs.parentNode.insertBefore(js, fjs);
//   }(document, 'script', 'facebook-jssdk'));

//   // Here we run a very simple test of the Graph API after login is
//   // successful.  See statusChangeCallback() for when this call is made.
//   function testAPI() {
//     console.log('Welcome!  Fetching your information.... ');
//     FB.api('/me?fields=id,name,email', function(response) {
//       console.log(response)
//       console.log('Successful login for: ' + response.name);
//       axios.post('http://localhost:3000/addFBdata',response)
//     });
//   }
//   function login(){
//     FB.login(function(response) {
//         if (response.authResponse) {
//          console.log('Welcome!  Fetching your information.... ');
//          FB.api('/me', function(response) {
//            console.log('Good to see you, ' + response.name + '.');
//          });
//         } else {
//          console.log('User cancelled login or did not fully authorize.');
//         }
//     }, {scope: 'public_profile, email, publish_actions'});
//     location.reload()
//   }

//     function logout(){
//     FB.logout(function(response) {
//         localStorage.removeItem('token')
//         location.reload()
//     });
// }

// function post(){
//     FB.api('/me/feed','post',{message:'suka2'},function(response){
//         if(!response || response.error){
//             console.log(response)
//             alert('Error occured')
//         }else{
//             aler('Post ID: ' + response.id)
//         }
//     })
// }
