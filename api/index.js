const API_URL = "https://api.api-ninjas.com/v1/randomuser";
const TOKEN = "tgt3NewVfjsM5JJ6HrnJpA==BpgSXIwVbbRqjYeS";
let globalUsers = null;

function buildUsers(globalUsers) {
    globalUsers.map((user) => {
        `
        <tr>
            <td>${user.username}</td>
            <td>${user.sex}</td>
            <td>${user.address}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.birthday}</td>
        </tr>
        `}).join('')
}
function renderTable() {
    const userTable = document.getElementById("userTable")
    userTable.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>sex</th>
                    <th>address</th>
                    <th>name</th>
                    <th>email</th>
                    <th>birthday</th>
                </tr>
                <tb>${buildUsers(users)}</tb>
            </thead>
        </table>
    `
}

function initSearchInputEvent() { }

function fetchUsers() {
    return axios.get(API_URL, {
        headers: {
            'X-Api-Key': TOKEN
        }
    })
}

function renderLoadingScreen() {
    const userTable = document.getElementById('userTable');
    userTable.innerHTML = "<p>Loading...</p>"
}
async function api() {
    try {
        renderLoadingScreen();
        const result = await fetchUsers();
        globalUsers = [result.data];
        renderTable(globalUsers);
        initSearchInputEvent();
        initAddUserInputEvent();
    } catch (e) {
        console.log(e);
    }
}

api();
