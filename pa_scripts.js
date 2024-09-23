//Menuwrap Icons
function waitForElement(e,t){const n=new MutationObserver((i=>{for(const o of i)if("childList"===o.type&&document.querySelector(e)){n.disconnect(),t(document.querySelector(e));break}}));n.observe(document.body,{childList:!0,subtree:!0})}function addIdsToMenuItems(e){const t=e.querySelector(".left");t&&(t.style.visibility="visible");e.querySelectorAll(".left li.menu").forEach((e=>{const t=e.querySelector("a");if(t){const n=t.getAttribute("href"),i=(t.innerHTML.trim(),t.querySelector("span")?.innerHTML.trim());e.querySelector(".nick")?e.id="nick":"https://msg.forumcommunity.net/?act=Msg&CODE=01&c=655775"===n?e.id="messenger":"https://msg.forumcommunity.net/?act=UserCP&CODE=26&c=655775"===n?e.id="topics":"#notifications"===n?e.id="notif":e.querySelector('form[action="/?act=Mod"]')||["&nbsp;Moderation","&nbsp;Moderazione","&nbsp;Moderación","&nbsp;Modération","&nbsp;Mäßigung","&nbsp;Moderação"].includes(i)?e.id="mod":(["&nbsp;Administration","&nbsp;Amministrazione","&nbsp;Administración","&nbsp;Verwaltung","&nbsp;Administração"].includes(i)||"https://www.forumcommunity.net/?cid=655775"===n)&&(e.id="admin")}})),e.querySelectorAll(".left li:not(.menu)").forEach((e=>{const t=e.querySelector("a");t&&("HOME"===t.textContent.trim()?e.id="pahome":"/latestupdates"===t.getAttribute("href")&&(e.id="updates"))}))}waitForElement(".menuwrap",addIdsToMenuItems);
//Emojione 
function applyEmojiTransformation(e){e.classList.contains("[class*=e1a-]")||(e.innerHTML=emojione.toImage(emojione.shortnameToUnicode(emojione.toShort(e.innerHTML))))}function observeElements(e){document.querySelectorAll(e).forEach(applyEmojiTransformation);new MutationObserver((o=>{o.forEach((o=>{"childList"===o.type&&o.addedNodes.forEach((o=>{o.nodeType===Node.ELEMENT_NODE&&(o.matches(e)||o.querySelector(e))&&applyEmojiTransformation(o.matches(e)?o:o.querySelector(e))}))}))})).observe(document.body,{childList:!0,subtree:!0})}observeElements(".post .color, .post .quote span, .tmsg, .profile-interests, .web a, .mtitle, .notification-text");
//Reply Counter
function processPostElements(){const e=document.querySelectorAll(".post"),t=(()=>{const e=new URLSearchParams(window.location.search);return parseInt(e.get("st")||0)+1})();e.forEach(((e,o)=>{createReplyCounter(e,t+o,"after")}))}function createReplyCounter(e,t,o){const s=document.createElement("b");s.className="reply_counter",s.textContent="#"+t;const r=e.querySelector(".mini_buttons.rt.Sub");r&&("after"===o?r.appendChild(s):r.insertBefore(s,r.firstChild))}processPostElements();const postObserver=new MutationObserver((e=>{e.forEach((e=>{e.addedNodes.forEach((e=>{e.nodeType===Node.ELEMENT_NODE&&e.matches(".post")&&processPostElements()}))}))}));postObserver.observe(document.body,{childList:!0,subtree:!0});
//Favicons
document.addEventListener("DOMContentLoaded",(function(){function updateFaviconsForLinks(e){e.forEach((e=>{if(!(e.closest(".spoiler .code_top a")||e.closest(".fancyborder a")||e.closest(".quote_top a")||e.querySelector("img"))){let o=document.createElement("img");e.href.includes("youtu.be")?o.src="https://www.google.com/s2/favicons?domain=youtube.com":o.src="https://www.google.com/s2/favicons?domain="+e.href,o.alt="fav",e.matches(".quote a,.tmsg a")?(o.width=14,o.height=14):(o.width=16,o.height=16),e.prepend(o)}}))}const e=new MutationObserver((e=>{e.forEach((e=>{updateFaviconsForLinks(e.target.querySelectorAll(".color a, span.tmsg a"))}))})),o=document.querySelector("body");e.observe(o,{childList:!0,subtree:!0});updateFaviconsForLinks(document.querySelectorAll(".color a, span.tmsg a"))}));
//Textarea Autogrow 
document.addEventListener("DOMContentLoaded",(function(){!function resizeTextarea(){const e=document.querySelector("textarea#Post");function updateTextareaHeight(){e.style.height="0",e.style.height=e.scrollHeight+"px",e.style.maxHeight="650px"}e&&(updateTextareaHeight(),e.addEventListener("input",updateTextareaHeight),window.addEventListener("load",updateTextareaHeight),e.addEventListener("paste",(function(){setTimeout(updateTextareaHeight,0)})))}()}));
//Quote
document.addEventListener("DOMContentLoaded",()=>{function isInsideVeContentColor(e){return e.closest('.ve-content.color')!==null}function expandQuotes(e){if(isInsideVeContentColor(e))return;const updateHeight=()=>{const t=e.querySelector(".quotebtn button");if(!t&&e.scrollHeight>170){e.style.maxHeight="170px";const t=document.createElement("div");t.className="quotebtn";const o=document.createElement("button");o.innerHTML="Show More...",t.appendChild(o),e.appendChild(t),o.addEventListener("click",o=>{o.preventDefault(),o.stopPropagation(),e.style.transition="max-height 0.382s ease-in-out",e.style.maxHeight=e.scrollHeight+"px",t.style.display="none",setTimeout(()=>{e.style.maxHeight="none"},382)})}else t&&e.scrollHeight<=170&&t.parentNode.remove()};updateHeight();const t=new ResizeObserver(updateHeight);t.observe(e);const o=e.querySelector(".spoiler .code_top a");o&&o.addEventListener("click",()=>{e.style.maxHeight="none",t.disconnect()})}function modifyQuoteTop(e){if(isInsideVeContentColor(e))return;const t=e.textContent,o=e.querySelector("a");if(t.includes("@")){const n=t.replace(/QUOTE\s*\(([^@]+)@[^)]+\)\s*/,"$1 said:");e.innerHTML=n,e.style.color="var(--mdcol)",o&&(e.appendChild(o),o.style.color="var(--mdcol)")}else{const t=e.querySelector(".quote_top b");t&&(t.style.opacity=1)}}(function initializeExpandQuotes(){document.querySelectorAll(".quote").forEach(expandQuotes),new MutationObserver(e=>{for(const t of e)t.addedNodes.length>0&&t.addedNodes.forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&!isInsideVeContentColor(e)&&(e.classList.contains("quote")?expandQuotes(e):e.querySelectorAll(".quote").forEach(expandQuotes))})}).observe(document.body,{childList:!0,subtree:!0})})(),document.querySelectorAll(".quote_top").forEach(modifyQuoteTop),function observeMutations(){new MutationObserver(e=>{for(const t of e)"childList"===t.type&&t.addedNodes.forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&!isInsideVeContentColor(e)&&e.querySelectorAll(".quote_top").forEach(modifyQuoteTop)})}).observe(document.body,{childList:!0,subtree:!0})}()});
//Goto
document.addEventListener("DOMContentLoaded",(function(){let e;function scrollToSmooth(e){window.scrollTo({top:e,behavior:"smooth",duration:600})}function showGotoElement(e){e.classList.add("active"),e.style.zIndex="9999"}function hideGotoElement(e){e.classList.remove("active")}!function initSmoothScrolling(){document.querySelector(".p_up").addEventListener("click",(()=>{scrollToSmooth(0)})),document.querySelector(".p_down").addEventListener("click",(()=>{scrollToSmooth(document.body.scrollHeight)}));const o=document.querySelector(".goto");window.addEventListener("scroll",(()=>{clearTimeout(e),showGotoElement(o),e=setTimeout((()=>{hideGotoElement(o)}),3e3)})),o.addEventListener("mouseenter",(()=>{clearTimeout(e),showGotoElement(o)})),o.addEventListener("mouseleave",(()=>{e=setTimeout((()=>{hideGotoElement(o)}),3e3)}))}()}));
//Preview
document.addEventListener("DOMContentLoaded",(function(){document.querySelectorAll(".send").forEach((function(e){var n=e.querySelectorAll("ul li.Item");if(n.length>=2){var t=document.getElementById("loading");t&&n[1].appendChild(t)}}))}));
