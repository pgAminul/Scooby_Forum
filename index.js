const loadData = async (filterData) => {
  const url = filterData
    ? `https://openapi.programming-hero.com/api/retro-forum/posts?category=${filterData}`
    : `https://openapi.programming-hero.com/api/retro-forum/posts`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  dataDistructuring(data.posts);
};
const dataDistructuring = (datas) => {
  const displayData = document.getElementById("displayCard");
  displayData.innerHTML = "";
  datas.forEach((data) => {
    const {
      author,
      category,
      description,
      comment_count,
      image,
      title,
      posted_time,
      view_count,
      isActive,
    } = data;

    displayData.innerHTML += `
          <div class="bg-gray-100 mb-4 text-gray-600 p-4 shadow-lg ">
            <div class="lg:grid grid-cols-5">
              <!-- Image  -->
              <div class="col-span-1">
                <div class="w-24 avatar ${isActive ? "online" : "offline"}">
                  <img
                    class="h-24 w-24 rounded-full"
                    src="${image}"
                  />
                </div>
              </div>
              <!-- Content  -->
              <div class="content col-span-4">
                <div class="flex justify-start gap-4">
                  <p id="category">${category}</p>
                  <p id="author">Author: ${
                    author.name ? author.name : "No Name"
                  }</p>
                </div>
                <h2 class="text-2xl font-bold mt-2">
                  ${title}
                </h2>
                <p class="mt-4 border-b-2 border-gray-400 border-dotted pb-4">
                  ${description}
                </p>

                <!-- icons  -->
                <div class="flex justify-between py-3 items-center">
                  <div class="">
                    <i class="fa-regular fa-comment pr-5 font-bold text-1xl"> ${comment_count}</i>
                    <i class="fa-solid fa-eye pr-5 font-bold text-1xl"> ${view_count}</i>
                    <i class="fa-regular fa-clock pr-5 font-bold text-1xl"> ${posted_time} min </i> 
                  </div>
                  <div
                    class="w-6 h-6 text-center rounded-full bg-gray-800 text-white"
                  >
                    <i class="fa-solid fa-envelope-open cursor-pointer" onclick="handleCounter('${description}', ${view_count})"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
  });
};

const handleCounter = (title, counter) => {
  const count = document.getElementById("counterNotify");
  let counterValue = parseInt(
    document.getElementById("markAsReadCounter").innerText
  );
  let counted = (counterValue = counterValue + 1);
  counterValue = document.getElementById("markAsReadCounter").innerText =
    counted;
  count.innerHTML += `
<div
              class="flex justify-between my-3 bg-gray-600 text-white rounded-2xl items-center gap-3 py-5 px-3"
            >
              <div class="w-10/12">
                <p>${title}</p>
              </div>
              <div class="">
                <p>
                  <i class="fa-regular fa-eye"></i>
                  ${counter}
                </p>
              </div>
            </div>
`;
};

const searchInputValue = () => {
  const inputValue = document.getElementById("searchPosts").value;
  loadData(inputValue);
};
loadData();
