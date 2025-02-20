
const API_URL = "https://api.api-ninjas.com/v1/randomuser";
const TOKEN = "tgt3NewVfjsM5JJ6HrnJpA==BpgSXIwVbbRqjYeS";
let globalUsers = null;

function fetchUser() {
    return axios.get(API_URL, {
        headers: {
            "X-APi-Key": TOKEN,
        },
    });
}

function deleteUser(email) {
    const otherUsers = globalUsers.filter((user) => user.email !== email)

    globalUsers = otherUsers
    renderTable(otherUsers)
}

function buildUsers(users) {
    return users
        .map(
            (user) =>
                `<tr>
                    <td>${user.username}</td>
                    <td>${user.sex}</td>
                    <td>${user.address}</td>
                    <td>${user.email}</td>
                    <td>${user.name}</td>
                    <td>${user.birthday}</td>
                    <td><button onClick="deleteUser('${user.email}')">Delete</button></td>
                </tr> `
        ).join('');
}

function renderTable(users) {
    const bodyContainer = document.getElementById('userTable')
    bodyContainer.innerHTML = `
    <table>
        <thead>
            <tr>
                <th>Username</th>
                <th>Sex</th>
                <th>Address</th>
                <th>Email</th>
                <th>Name</th>
                <th>DOB</th>
            </tr>
        </thead>
        <tbody>${buildUsers(users)}</tbody>
    </table>
    `
}
function renderLoadingScreen() {
    const tableContainer = document.getElementById("userTable")
    tableContainer.innerHTML = '<p>Loading...</p>'
}

function initSearchInputEvent(users) {
    const searchInput = document.getElementById('searchInput')
    searchInput.addEventListener("input", (e) => {
        const searchTerms = e.target.value.toLowerCase()
        if (!searchTerms || searchTerms === '') {
            renderTable(users)
            return
        }

        const result = users.filter((user) =>
            user.name.toLowerCase().includes(searchTerms)
        )
        renderTable(result)
    })
}

async function initAddUserInputEvent(users) {

    const addUserInput = document.getElementById('addUserInput')
    addUserInput.addEventListener("input", async (e) => {
        const result = await fetchUser();
        globalUsers = [...globalUsers, result.data]
        renderTable(globalUsers)
    })
}

async function main() {
    try {
        renderLoadingScreen()
        const result = await fetchUser();
        globalUsers = [result.data]
        renderTable(globalUsers)
        initAddUserInputEvent();
        initSearchInputEvent(globalUsers);
    } catch (e) {
        const table = document.getElementById('userTable')
        table.innerHTML = "Error cannot load data"
    }
}

main();