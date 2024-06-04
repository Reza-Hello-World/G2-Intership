const APIURL = 'https://api.github.com/users/'

const input = document.getElementsByTagName('input')[0]

const user = document.getElementById('user')

function createCard(data) {
    const userTag = ` <div class="imageLeft"><img src=${data.data.avatar_url} alt="profile_image"></div>
<div class="userData">
    <div class="name">
        <h1>${data.data.name}</h1>
    </div>
    <div class="detail">
        <p>${data.data.bio}</p>
    </div>
    <div class="connections">
        <ul>
            <li>${data.data.followers} <strong>Followers</strong></li>
            <li>${data.data.following} <strong>Following</strong></li>
            <li>${data.data.public_repos} <strong>Repos</strong></li>
        </ul>
    </div>
    <div class="repoLinks">
        <ul>
            <li><a href="#">Repo 1</a></li>
            <li><a href="#">Repo 2</a></li>
            <li><a href="#">Repo 3</a></li>
        </ul>
    </div>
</div>`

    user.innerHTML = userTag

}

function createCardError(msg) {
    const cardHtml = `<h1 class='errMsg'>${msg}</h1>`
    user.innerHTML = cardHtml
}

async function getUser(userName) {
    try {
        let data = await axios(APIURL + userName)
        createCard(data)
        console.log(data.data)
    } catch (err) {
        if (err.response.status == 404) {
            createCardError('No profile with this username')
            console.log(err)
        }
    }
    user.style.display = 'flex'
}

input.addEventListener('change', (e) => {
    let user = e.target.value
    getUser(user)
    e.target.value = ''
})