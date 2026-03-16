let prompts=[];


/* LOAD HEADER */

fetch("header.html")
.then(res=>res.text())
.then(data=>{
document.getElementById("header").innerHTML=data;
});

/* LOAD FOOTER */

fetch("footer.html")
.then(res=>res.text())
.then(data=>{
document.getElementById("footer").innerHTML=data;
});


/* LOAD PROMPTS */

fetch("data/prompts.json")
.then(res=>res.json())
.then(data=>{

prompts=data;

renderPrompts(prompts);

/* cek slug di url */

const slug=getUrlParam("prompt");

if(slug){

const selected=prompts.find(p=>p.slug===slug);

if(selected){

openModal(selected);

}

}

});




function renderPrompts(data){

const container=document.getElementById("promptContainer");

container.innerHTML="";

data.forEach(p=>{

container.innerHTML+=`

<div class="card">

<a href="?prompt=${p.slug}" class="card-image">

<img src="${p.image}" alt="${p.title}">

</a>

<div class="card-content">

<h3>${p.title}</h3>

<span class="category">${p.category}</span>

<p>${limitWords(p.desc,20)}</p>

<div class="buttons">

<a
href="?prompt=${p.slug}"
class="btn view"
>
Detail
</a>

<a
href="https://lynk.id/salmansyuhada/s/vw878ed10nyz"
target="_blank"
class="btn donate-btn"
>
Donasi
</a>

</div>

</div>

</div>

`;

});

}

/* LOAD AI WEB */

let aiwebs=[];

fetch("data/aiweb.json")
.then(res=>res.json())
.then(data=>{

aiwebs=data;

renderAiWeb(aiwebs);

/* cek slug di url */

const slug=getUrlParam("aiweb");

if(slug){

const selected=aiwebs.find(w=>w.slug===slug);

if(selected){

window.open(selected.url,"_blank");

}

}

});

function renderAiWeb(data){

const container=document.getElementById("aiWebContainer");

if(!container) return;

container.innerHTML="";

data.forEach(web=>{

container.innerHTML+=`

<div class="card">

<img src="${web.image}" alt="${web.title}">

<div class="card-content">

<h3>${web.title}</h3>

<span class="category">${web.category}</span>

<p>${web.desc}</p>

<div class="buttons">

<a
href="?aiweb=${web.slug}"
class="btn view">
Detail
</a>

</div>

</div>

</div>

`;

});

}

/* LOAD AI VIDEO */

let aivideos=[];

fetch("data/aivideo.json")
.then(res=>res.json())
.then(data=>{

aivideos=data;

renderAiVideo(aivideos);

/* cek slug di url */

const slug=getUrlParam("aivideo");

if(slug){

const selected=aivideos.find(v=>v.slug===slug);

if(selected){

window.location.href=selected.url;

}

}

});

function renderAiVideo(data){

const container=document.getElementById("aiVideoContainer");

if(!container) return;

container.innerHTML="";

data.forEach(video=>{

container.innerHTML+=`

<div class="card">

<img src="${video.image}" alt="${video.title}">

<div class="card-content">

<h3>${video.title}</h3>

<span class="category">${video.category}</span>

<p>${video.desc}</p>

<div class="buttons">

<a
href="?aivideo=${video.slug}"
class="btn view">
Detail
</a>

</div>

</div>

</div>

`;

});

}


/* SEARCH */

document.getElementById("searchInput").addEventListener("input",function(){

let keyword=this.value.toLowerCase();

let filtered=prompts.filter(p=>

p.title.toLowerCase().includes(keyword) ||
p.desc.toLowerCase().includes(keyword)

);

renderPrompts(filtered);

});


/* CATEGORY FILTER */

document.getElementById("categoryFilter").addEventListener("change",function(){

let category=this.value;

if(category==="all"){

renderPrompts(prompts);

}else{

let filtered=prompts.filter(p=>p.category===category);

renderPrompts(filtered);

}

});


/* MODAL */

async function openModal(prompt){

const modal=document.getElementById("promptModal");
const modalTitle=document.getElementById("modalTitle");
const modalImage=document.getElementById("modalImage");
const promptBox=document.getElementById("modalPrompt");

/* cek apakah elemen ada */

if(!modal || !modalTitle || !modalImage || !promptBox){

console.error("Modal element tidak ditemukan");

return;

}

/* isi data */

modalTitle.innerText=prompt.title;
modalImage.src=prompt.image;

promptBox.innerText="Loading prompt...";

/* ambil prompt txt */

try{

const response=await fetch(prompt.prompt_file);

if(!response.ok){

throw new Error("Prompt file tidak ditemukan");

}

const text=await response.text();

promptBox.innerText=text;

}catch(error){

promptBox.innerText="Prompt gagal dimuat.";

console.error(error);

}

/* tampilkan modal */

modal.style.display="flex";

}

function closeModal(){

document.getElementById("promptModal").style.display="none";

history.pushState(null,null,"index.html");

}


/* COPY */

function copyPrompt(){

navigator.clipboard.writeText(modalPrompt.innerText);

alert("Prompt copied!");

}

/* URL Param */

function getUrlParam(param){

const urlParams=new URLSearchParams(window.location.search);

return urlParams.get(param);

}

function openPromptBySlug(slug){

    const selected=prompts.find(p=>p.slug===slug);

    if(selected){

    openModal(selected);

    }

}

function limitWords(text,limit){

const words=text.split(" ");

if(words.length>limit){

return words.slice(0,limit).join(" ")+"...";

}

return text;

}

