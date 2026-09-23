// "크게 보기" 전체 화면 뷰어. 버튼에 data-src, data-title 을 달면 동작합니다.
// 뷰어가 열려 있을 때 휴대폰 뒤로가기를 누르면 뷰어만 닫힙니다.
(function () {
  var viewer = document.getElementById("viewer");
  if (!viewer) return;
  var img = viewer.querySelector("img");
  var title = viewer.querySelector(".viewer-title");

  function show(src, name) {
    img.src = src;
    img.alt = name;
    title.textContent = name;
    viewer.hidden = false;
    document.body.classList.add("viewer-open");
  }
  function hide() {
    viewer.hidden = true;
    document.body.classList.remove("viewer-open");
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-src]");
    if (!btn) return;
    e.preventDefault();
    show(btn.dataset.src, btn.dataset.title);
    history.pushState({ viewer: true }, "");
  });
  viewer.querySelector(".viewer-close").addEventListener("click", function () {
    history.back(); // popstate 에서 닫힘
  });
  window.addEventListener("popstate", function () {
    if (!viewer.hidden) hide();
  });
})();
