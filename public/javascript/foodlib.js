// const value = "dosa";
// window.location.href = "/lib/food?param="+encodeURIComponent(value);

function foodclick(event){
    event.preventDefault();

    // Access the clicked element
  const clickedElement = event.target;

  // Access the ID of the clicked element
  const id = clickedElement.id;

  window.location.href = "/food?param="+encodeURIComponent(id);

}