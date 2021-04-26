const textInput = document.querySelector(".text");
const list = document.querySelector(".list");
let page = 1;

const getData = async () => {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
    );
    const data = await res.json();
    addDataToUI(data);
};

const addDataToUI = data => {
    const div = document.createElement("div");
    div.innerHTML = data.map(item => render(item)).join("");
    list.appendChild(div);
};

const render = item => {
    return `<div class="post">
    <div class="header">
        <div class="id">${item.id}</div>
        <div class="title">
            ${item.title}
        </div>
    </div>
    <div class="contents">
        ${item.body}
    </div>
</div>
`;
};

getData();

window.onscroll = function () {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        page++;
        getData();
    }
};
