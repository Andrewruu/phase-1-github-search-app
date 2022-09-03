document.addEventListener("DOMContentLoaded", () => {
    //document.querySelector('botton').onClick = 'repoSearch'
    document.querySelector('#main').appendChild(btn)
    document.querySelector('#github-form').addEventListener('submit',getAllUsers)
})
const btn = document.createElement('button')
btn.innerHTML ='Switch to search Repo'
btn.setAttribute('id','switch')
btn.setAttribute('onClick','repoSearch()')

function repoSearch(){
    document.querySelector('#github-form').removeEventListener('submit',getAllUsers)
    document.querySelector('#github-form').addEventListener('submit',getRepo)
    document.querySelector('#switch').innerHTML ='Switch to search User'
    document.querySelector('#switch').setAttribute('onClick','userSearch()')
}
function userSearch(){
    document.querySelector('#github-form').removeEventListener('submit',getRepo)
    document.querySelector('#github-form').addEventListener('submit',getAllUsers)
    document.querySelector('#switch').innerHTML ='Switch to search Repo'
    document.querySelector('#switch').setAttribute('onClick','repoSearch()')
}

function renderUser(user){
    const li = document.createElement('li')
    const gitContainer = document.querySelector('#user-list')
    li.innerHTML = `
    <h2>Useername ${user.login}</h2>
    <img src="${user.avatar_url}" class="user-avatar" />
    <p>Profile: <a href=${user.html_url}>${user.html_url}</a></p>
    `
    gitContainer.appendChild(li)
  }
function renderRepo(user){
    const li = document.createElement('li')
    const gitContainer = document.querySelector('#repos-list')
    li.innerHTML = `
    <h2>Repo name ${user.name}</h2>
    <p>Repo: <a href=${user.url}>${user.url}</a></p>
    <p>Profile: <a href=${user.html_url}>${user.html_url}</a></p>
    `
    gitContainer.appendChild(li)
}  

function getAllUsers(e){
    const username = document.querySelector('#search').value
    e.preventDefault()
    fetch(`https://api.github.com/search/users?q=${username}`,{
        headers: {
            "Accept": "application/vnd.github.v3+json"
        },
      })
      .then(response => response.json())
      //.then(userData => console.log(userData.items))
      .then(userData => userData.items.forEach(user => renderUser(user)))
  }

function getRepo(e){
    const username = document.querySelector('#search').value
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`,{
        headers: {
            "Accept": "application/vnd.github.v3+json"
        },
      })
      .then(response => response.json())
      //.then(userData => console.log(userData))
      .then(userData => userData.forEach(user => renderRepo(user)))
}