const charactersAPI = new APIHandler('https://minions-api.herokuapp.com');

window.addEventListener('load', () => {

  document.getElementById('fetch-all').addEventListener('click', function (event) {

    printCharacters()
  });

  document.getElementById('fetch-one').addEventListener('click', function (event) {

    let containerGlobal = document.querySelector('.characters-container')
    let id = document.querySelector("#character-id").value

    containerGlobal.innerHTML = ""

    charactersAPI
      .getOneRegister(id)
      .then((minion) => {
        let containerCard = document.createElement('div')
        containerCard.classList.add('character-info')
        console.log(minion)

        containerCard.textContent = `Id : ${minion.data.id}
        character name :  ${minion.data.name}
        Character Occupation : ${minion.data.occupation}
        Is a cartoon : ${minion.data.cartoon}
        Character Weapon : ${minion.data.weapon}`

        containerGlobal.appendChild(containerCard)

      })
      .catch(error => {
        console.error(error)
      })
  });

  document.getElementById('delete-one').addEventListener('click', function (event) {
    deleteOneMinion()
  });

  document.getElementById('edit-character-form').addEventListener('submit', function (event) {
    let btnUpdate = document.getElementById('send-data')
    let inputs = document.querySelectorAll('#edit-character-form')
    console.log(inputs)


  });

  document.getElementById('new-character-form').addEventListener('submit', function (event) {
    event.preventDefault()

    let minionValue = document.querySelectorAll('#new-character-form input')
    let btnSend = document.getElementById('send-data')
    btnSend.style.backgroundColor = "grey"

    if (!minionValue[3].value) {
      minionValue[3].value = true
    } else {
      minionValue[3].value = false
    }

    const minion = {
      name: minionValue[0].value,
      occupation: minionValue[1].value,
      weapon: minionValue[2].value,
      cartoon: minionValue[3].value,
    }
    charactersAPI
      .createOneRegister({
        name: minionValue[0].value,
        occupation: minionValue[1].value,
        weapon: minionValue[2].value,
        cartoon: minionValue[3].value
      })
      .then((minion) => {
        if (!minion.data) {
          console.log("elemento borrado!!")
          btnSend.style.backgroundColor = "red"
        }
        else {
          btnSend.style.backgroundColor = "green"
        }
        console.log(minion)
      })
      .catch(error => console.log(error))


  });
});

function deleteOneMinion() {
  let id = document.getElementById('character-id-delete').value
  let btnDelete = document.getElementById('delete-one')
  btnDelete.style.backgroundColor = "grey"

  console.log(id)

  charactersAPI
    .deleteOneRegister(id)
    .then((minion) => {
      console.log(minion.data)
      if (!minion.data) {
        console.log("elemento borrado!!")
        btnDelete.style.backgroundColor = "red"
      }
      else {
        btnDelete.style.backgroundColor = "green"
      }
    })
    .catch()
}


function printCharacters() {
  let containerGlobal = document.querySelector('.characters-container')
  charactersAPI
    .getFullList()
    .then((response) => {
      console.log(response)
      let text = ''
      response.data.reverse().forEach(element => {
        //podria ser una función, pero estoy corto de tiempo..... lo siento Teo...
        let containerCard = document.createElement('div')
        containerCard.classList.add('character-info')

        containerCard.textContent = `Id : ${element.id}
        character name :  ${element.name}
        Character Occupation : ${element.occupation}
        Is a cartoon : ${element.cartoon}
        Character Weapon : ${element.weapon}`

        containerGlobal.appendChild(containerCard)

      });
    }).catch(error => console.log(error))
}