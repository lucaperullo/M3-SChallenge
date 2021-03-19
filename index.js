const navColorOnScroll = () => {
  let nav = document.querySelector(".navbar");
  const yaxis = window.scrollY;
  if (yaxis == 0 || yaxis == 1) {
    console.log(yaxis);
    nav.style.backgroundColor = "transparent";
  } else {
    console.log(yaxis);
    console.log("its running");

    nav.style.backgroundColor = "#141414";
  }
};
