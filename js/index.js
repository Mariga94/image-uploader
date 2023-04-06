import uploadFile from "./uploadImage.js";

// updates the dom to indicate an upload has been completed successfully
const uploadComplete = () => {
  const complete = document.querySelector(".complete");
  const h4 = document.querySelector(".card h4");
  const small = document.querySelector('.card small');
  complete.style.display = "block";
  small.style.display = "none";
  h4.textContent = "Upload Successfully!"
};

const copyFunc = () => {
  const copyText = document.querySelector('#copyText');
  const copyButton = document.querySelector('#copyButton');
  var snackbar = document.getElementById("snackbar");
  copyButton.addEventListener('click', ()=>{
    const textarea = document.createElement('textarea');
    textarea.value = copyText.innerText;
    document.body.appendChild(textarea);
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
    snackbar.classList.add("show");
    setTimeout(function(){ snackbar.classList.remove("show"); }, 3000);
  })
}

const handlUpload = async (e) => {
  const card = document.querySelector(".card");
  const load = document.querySelector(".load");
  const box_input = document.querySelector(".box__input");
  const copyText = document.querySelector('#copyText');
  const boxText = document.querySelector('.box__text');
  const fileLabel = document.querySelector('.file-label');
  const cp = document.querySelector('.cp');
  card.classList.add("visually-hidden");
  load.classList.remove("visually-hidden");
  fileLabel.classList.add('visually-hidden');
  boxText.classList.add('visually-hidden');
  cp.style.display = "flex";
  try {
    const { url } = await uploadFile(e);
    card.classList.remove("visually-hidden");
    load.classList.add("visually-hidden");
    copyText.textContent = `${url}`
    box_input.style.backgroundImage = `url(${url})`;
    box_input.style.background = 'center/contain no-repeat';
    uploadComplete();
    copyFunc()
  } catch (err) {
    console.log(err);
  }
};



(() => {
  const file = document.querySelector("input.box__file");
  file.addEventListener("change", (e) => {
    const imageFile = e.target.files[0];
    handlUpload(imageFile);
  });
})();
