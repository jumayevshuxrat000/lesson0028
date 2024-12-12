document.addEventListener("DOMContentLoaded", () => {
    const userCardContainer = document.querySelector(".user-card-container");
    const loadingElement = document.querySelector(".loader");
    const BASE_URL = "https://dummyjson.com";

    async function fetchData(endpoint) {
        const response  = await fetch(`${BASE_URL}${endpoint}`)
        response
            .json()
            .then((res)=> createCard(res))
            .catch((err)=> console.log(err))
            .finally(()=>{
                loadingElement.style.display = "none"
            })
    }

    window.addEventListener("load", ()=>{
        fetchData("/users")
    })

    function createCard(data) {
        data.users.forEach(user => {
            const cardElement = document.createElement("div");
            cardElement.className = "card";

            cardElement.innerHTML = `
                <img src="${user.image}" alt="${user.firstName} ${user.lastName}">
                <div class="card-body">
                    <h2>${user.firstName} ${user.lastName}</h2>
                    <p><strong>Age:</strong> ${user.age}</p>
                    <p><strong>Email:</strong> <a href="mailto:${user.email}">${user.email}</a></p>
                    <p><strong>Phone:</strong> <a href="tel:${user.phone}">${user.phone}</a></p>
                </div>
            `;

            userCardContainer.appendChild(cardElement);
        });
    }
    fetchData("/users");
});
