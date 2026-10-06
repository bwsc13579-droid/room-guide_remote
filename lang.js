// 한국어 / 영어 전환. 상단 KR | EN 버튼을 누르면 새로고침 없이 바뀝니다.
// 글은 class="ko" / class="en" 요소를 CSS 로 숨기고 보이게 하고, 이미지는 data-src-ko / data-src-en 으로 바꿉니다.
// html lang 속성은 바꾸지 않습니다(바꾸면 크롬이 영문을 자동 번역해 버림). 선택한 언어는 휴대폰에 저장되어 다음에 열 때도 유지됩니다. 주소 뒤에 ?lang=en 을 붙이면 영어로 바로 열립니다.
(function () {
  var root = document.documentElement;
  var KEY = "room-guide-lang";

  function current() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "en" || q === "ko") return q;
    try { var s = localStorage.getItem(KEY); if (s === "en" || s === "ko") return s; } catch (e) {}
    return "ko";
  }

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    try { localStorage.setItem(KEY, lang); } catch (e) {}

    var t = document.querySelector("title");
    if (t && t.dataset[lang]) t.textContent = t.dataset[lang];

    // 이미지와 "크게 보기" 링크
    document.querySelectorAll("[data-src-ko]").forEach(function (el) {
      var src = el.dataset["src" + (lang === "en" ? "En" : "Ko")];
      if (el.tagName === "IMG") {
        if (el.getAttribute("src") !== src) el.src = src;
        var size = el.dataset["size" + (lang === "en" ? "En" : "Ko")]; // 예: "941x1672" (한글판과 크기가 다를 때)
        if (size) { el.width = size.split("x")[0]; el.height = size.split("x")[1]; }
        if (el.dataset["alt" + (lang === "en" ? "En" : "Ko")]) el.alt = el.dataset["alt" + (lang === "en" ? "En" : "Ko")];
      } else {
        el.dataset.src = src;
        el.href = src;
        if (el.dataset["title" + (lang === "en" ? "En" : "Ko")]) el.dataset.title = el.dataset["title" + (lang === "en" ? "En" : "Ko")];
      }
    });

    // aria-label 등 속성 번역 (data-label-ko / data-label-en)
    document.querySelectorAll("[data-label-ko]").forEach(function (el) {
      el.setAttribute("aria-label", el.dataset["label" + (lang === "en" ? "En" : "Ko")]);
    });

    document.querySelectorAll(".lang button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest(".lang button");
    if (b) apply(b.dataset.lang);
  });

  apply(current());
})();
