// 메뉴 불러오기
function updateMenu() {
  const main = document.querySelector(".main_container");
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }
  fetch("./menu.json")
    .then((response) => response.json())
    .then((menus) => {
      console.log(menus);
      if (curCategory !== "all") {
        menus = menus.filter((menu) => menu.category === curCategory);
        console.log(menus);
      }
      for (let menu of menus) {
        // 메뉴 레이아웃
        const div1 = document.createElement("div"); // 메뉴 전체를 감싸줄 div
        div1.className = "menu_container";
        const div2 = document.createElement("div"); // img와 info를 분리해 줄 info를 감싸는 div
        div2.className = "sub_container";
        const div3 = document.createElement("div"); // info 내에서 name과 price를 감싸는 div
        div3.className = "menu_header_container";
        const div4 = document.createElement("div"); // img 태그를 감싸기 위한 div
        div4.className = "img_container";

        const img = document.createElement("img");
        img.className = "menu_img";
        const menu_name = document.createElement("p");
        menu_name.className = "menu_name";
        const price = document.createElement("p");
        price.className = "menu_price";
        const description = document.createElement("p");
        description.className = "menu_description";

        // 메뉴에 정보 할당
        img.src = menu.img;
        menu_name.textContent = menu.name;
        price.textContent = menu.price;
        description.textContent = menu.description;

        // dom에 연결
        div3.appendChild(menu_name);
        div3.appendChild(price);
        div2.appendChild(div3);
        div2.appendChild(description);
        div4.appendChild(img);
        div1.appendChild(div4);
        div1.appendChild(div2);
        main.appendChild(div1);
      }
    });
}

updateMenu();

// 버튼 이벤트 처리
let curCategory = "all";
const buttons = document.querySelectorAll(".btn_container button");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    curCategory = btn.className;
    updateMenu();
  });
});
