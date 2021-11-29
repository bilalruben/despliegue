window.addEventListener("load", go)
function addContact(evento) {
    evento.preventDefault()
    let inputs = document.getElementsByTagName("input")
    let contacto = {
        id: last,
        nombre: inputs[0].value,
        telefono: inputs[1].value,
        email: inputs[2].value
    }
    if (!contacto.nombre) {
        alert("Por favor, introduzca el valor del nombre")
    } else if (!contacto.telefono) {
        alert("Por favor, introduzca el valor del teléfono")
    } else if (!contacto.email){
        alert("Por favor, introduzca el valor del email")
    } else {
        addContact2List(contacto)
        last++
        resetInputs()
    }
}
function resetInputs() {
    var inputs = document.getElementsByTagName("input")
    for (const input of inputs) {
        if (input.type == "text" || input.type == "email" || input.type == "tel") {
            input.value=""
        }
    }
}
function addContact2List(contacto) {
    var lista = document.getElementsByTagName("ul")
    if (lista.length == 0) {
        let listaContactos = document.createElement("div")
        listaContactos.setAttribute("id", "divLista")
        lista = document.createElement("ul")
        document.body.appendChild(listaContactos)
        listaContactos.appendChild(lista)
    } else {
        lista = lista[0]
    }
    let newLi = document.createElement("li")
    let enlace = document.createElement("a")
    let enlaceContent = document.createElement("span") 
    enlaceContent.innerHTML = contacto.nombre
    let hiddenContent = document.createElement("span")
    hiddenContent.innerHTML = contacto.telefono+"SPLIT"+contacto.email
    hiddenContent.setAttribute("class", "hiddenContent")
    enlace.setAttribute("id", "enlace"+contacto.id)
    enlace.setAttribute("href", "#")
    enlace.addEventListener("click", mostrarContacto)
    enlace.appendChild(enlaceContent)
    enlace.appendChild(hiddenContent)
    lista.appendChild(newLi)
    newLi.appendChild(enlace)
    addEditButton(contacto.id, newLi)
    addRemoveButton(contacto.id, newLi)
}
function addEditButton(contactId, node) {
    let editButton = document.createElement("input")
    editButton.setAttribute("id", "editar"+contactId)
    editButton.setAttribute("value", "Editar")
    editButton.setAttribute("type", "button")
    editButton.addEventListener("click", editContact)
    node.appendChild(editButton)
}
function addRemoveButton(contactId, node) {
    let removeButton = document.createElement("input")
    removeButton.setAttribute("id", "borrar"+contactId)
    removeButton.setAttribute("value", "Borrar")
    removeButton.setAttribute("type", "button")
    removeButton.addEventListener("click", removeContact)
    node.appendChild(removeButton)
}
function mostrarContacto(evento) {
    evento.preventDefault()
    let idContacto = parseInt(this.id.substring(6,this.length))
    let enlace = document.getElementById("enlace"+idContacto)
    let mostrarNombre = addParagraph("Nombre: " + enlace.children[0].innerHTML)
    let mostrarTelefono = addParagraph("Teléfono: " + enlace.children[1].innerHTML.split("SPLIT")[0])
    let mostrarEmail = addParagraph("Email: " + enlace.children[1].innerHTML.split("SPLIT")[1])
    cleanDivMostrarContacto()
    let cuadroMostrarContacto = document.createElement("div")
    cuadroMostrarContacto.setAttribute("id", "divMostrarContacto")
    cuadroMostrarContacto.appendChild(mostrarNombre)
    cuadroMostrarContacto.appendChild(mostrarTelefono)
    cuadroMostrarContacto.appendChild(mostrarEmail)
    document.body.appendChild(cuadroMostrarContacto)
}
function cleanDivMostrarContacto() {
    let cuadroMostrarContactoDOM = document.getElementById("divMostrarContacto")
    if (cuadroMostrarContactoDOM) {
        cuadroMostrarContactoDOM.remove()
    }
}
function addParagraph(value) {
    let paragraph = document.createElement("p")
    paragraph.innerHTML = value
    return paragraph
}
function editContact() {
    let form = document.getElementById("formulario")
    let enlace = this.parentNode.children[0]
    form.children[1].value = enlace.children[0].innerHTML
    form.children[5].value = enlace.children[1].innerHTML.split("SPLIT")[0]
    form.children[9].value = enlace.children[1].innerHTML.split("SPLIT")[1]
    let submitButton = document.getElementById("submit")
    if (submitButton){
        submitButton.value = "Guardar cambios"
        submitButton.setAttribute("id", "save"+this.id)
        submitButton.onclick = saveChanges
    }
}
function saveChanges(evento) {
    evento.preventDefault()
    let enlace = document.getElementById("enlace"+this.id.substring(10,this.length))
    let form = this.parentNode
    enlace.children[0].innerHTML = form.children[1].value
    enlace.children[1].innerHTML = form.children[5].value + "SPLIT" + form.children[9].value
    resetInputs()
    this.value = "Añadir"
    this.setAttribute("id", "submit")
    this.onclick = addContact
    cleanDivMostrarContacto()
}
function removeContact() {
    this.parentNode.remove()
    cleanDivMostrarContacto()
}
function go() {
    var botonEnviar = document.getElementById("formulario").children[12]
    botonEnviar.onclick = addContact
}
var last = 0