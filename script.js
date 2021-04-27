const textInput = document.querySelector(".text");
const list = document.querySelector(".list");
const spinner = document.getElementById("spinner");
const input = document.querySelector(".text");
let page = 1;
const dataArray = [];

const getData = async () => {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${page}`
    );
    const data = await res.json();
    addDataToUI(data);
    dataArray.push(...data);
    console.log(dataArray);
};

const addDataToUI = data => {
    const div = document.createElement("div");
    div.innerHTML = data.map(item => render(item)).join("");
    list.appendChild(div);
};

const search = target => {
    return dataArray.filter(data => {
        const regex = new RegExp(target, "gi");
        return data.title.match(regex) || data.body.match(regex);
    });
};

const displaySearch = value => {
    const matchArray = search(value);
    if (matchArray.length > 0 || matchArray) {
        list.innerHTML = "";
        addDataToUI(matchArray);
    } else {
        list.innerHTML = "";
        addDataToUI(dataArray);
    }
};

const showSpinner = () => {
    spinner.classList.add("show");
    setTimeout(() => {
        spinner.classList.remove("show");
        setTimeout(() => {
            page++;
            getData();
        }, 500);
    }, 1000);
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

window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showSpinner();
    }
});

input.addEventListener("input", e => displaySearch(e.target.value));
