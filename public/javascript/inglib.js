function ingclick(event){
    event.preventDefault();

    const clickedElement = event.target;

    let id = clickedElement.id;

    let className = clickedElement.className;

    window.location.href = "/ing?param="+encodeURIComponent(id);

    console.log(id);
}