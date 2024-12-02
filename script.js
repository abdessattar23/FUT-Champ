let playersdata = new XMLHttpRequest();
playersdata.open("GET", "./players.json", true);
playersdata.send();

playersdata.onreadystatechange = function () {
  if (playersdata.readyState === 4 && playersdata.status === 200) {
    let ourdata = JSON.parse(localStorage.getItem("players")) || [], data = [];
    if (ourdata.players.length <= 0) {
      document.querySelector("#all h1").classList.remove("hidden");
    } else {
      document.querySelector("#all h1").classList.add("hidden");
      data = ourdata.players;
    }

    function addFiltreplayerToPosition(positionFilter) {
      const filteredPlayers = data.filter(player => player.position === positionFilter);
      const filtredPlayersCase = document.getElementById("filtredPlayers");
      filtredPlayersCase.innerHTML = '';

      filteredPlayers.forEach(player => {
        let div = document.createElement("div");
        div.setAttribute("class", "card-container cursor-pointer w-32 h-44");
        div.setAttribute("draggable", "true");

        let innerDiv = document.createElement("div");
        innerDiv.setAttribute("class", "card-inner");

        let frontDiv = document.createElement("div");
        frontDiv.setAttribute("class", "card-front goldcard bg-no-repeat bg-center bg-cover w-32 h-44 flex flex-col pt-8 items-center");

        let backDiv = document.createElement("div");
        backDiv.setAttribute("class", "card-back goldcard bg-no-repeat bg-center bg-cover w-32 h-44 flex flex-col justify-center items-center");
        backDiv.innerHTML = `
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded mb-2 add-to-btn">
            Add
          </button>  
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-2 edit-btn">
            Edit
          </button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded delete-btn">
            Delete
          </button>
        `;

        frontDiv.innerHTML = `
          <div class="flex">
            <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
              <span class="mb-[-5px] font-bold">${player.rating}</span>
              <span class="text-[10px] font-medium">${player.position}</span>
            </div>
            <img class="w-20" src="${player.photo}" alt="${player.name}">
          </div>
          <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${player.name}</p>
          <div class="text-[#362f16] gap-1 flex">
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">PAC</span>
              <span class="font-bold text-[10px]">${player.pace}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">SHO</span>
              <span class="font-bold text-[10px]">${player.shooting}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">PAS</span>
              <span class="font-bold text-[10px]">${player.passing}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">DRI</span>
              <span class="font-bold text-[10px]">${player.dribbling}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">DEF</span>
              <span class="font-bold text-[10px]">${player.defending}</span>
            </div>
            <div class="flex flex-col gap-0 justify-center items-center">
              <span class=" text-[7px] font-medium mb-[-4px]">PHY</span>
              <span class="font-bold text-[10px]">${player.physical}</span>
            </div>
          </div>
          <div class="flex justify-center items-center w-3 gap-2">
            <img src="${player.flag}" alt="${player.name}">
            <img src="${player.logo}" alt="${player.club}">
          </div>
        `;

        innerDiv.appendChild(frontDiv);
        innerDiv.appendChild(backDiv);
        div.appendChild(innerDiv);

        backDiv.querySelector('.edit-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          const modal = document.getElementById('Addplayermodal');
          modal.classList.add('flex');
          modal.classList.remove('hidden');

          document.getElementById('PlayerName').value = player.name;
          document.getElementById('PlayerPhoto').value = player.photo;
          document.getElementById('Position').value = player.position;
          document.getElementById('Nationality').value = player.nationality;
          document.getElementById('FlagUrl').value = player.flag;
          document.getElementById('clubName').value = player.club;
          document.getElementById('clubLogo').value = player.logo;
          document.getElementById('Rating').value = player.rating;

          const event = new Event('change');
          document.getElementById('Position').dispatchEvent(event);

          if (player.position === 'GK') {
            document.getElementById('diving').value = player.diving;
            document.getElementById('handling').value = player.handling;
            document.getElementById('kicking').value = player.kicking;
            document.getElementById('reflexes').value = player.reflexes;
            document.getElementById('speed').value = player.speed;
            document.getElementById('positioning').value = player.positioning;
          } else {
            document.getElementById('pace').value = player.pace;
            document.getElementById('shooting').value = player.shooting;
            document.getElementById('passing').value = player.passing;
            document.getElementById('dribbling').value = player.dribbling;
            document.getElementById('defending').value = player.defending;
            document.getElementById('physical').value = player.physical;
          }

          const addButton = document.querySelector('.addnew');
          addButton.textContent = 'Update Player';
          addButton.setAttribute("data-editing-player", player.name);
        });

        backDiv.querySelector('.delete-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          let existingPlayers = JSON.parse(localStorage.getItem('players')) || [];
          existingPlayers.players = existingPlayers.players.filter(p => p.name !== player.name);
          localStorage.setItem('players', JSON.stringify(existingPlayers));
          location.reload();
        });

        div.addEventListener('click', function () {
          let positionElement = document.querySelector(`[position="${player.position}"]`);
          positionElement.classList.remove("blackcard");
          positionElement.classList.add("goldcard");
          if (player.position !== "GK") {
            positionElement.innerHTML = `
            <div class="flex">
              <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
                <span class="mb-[-5px] font-bold">${player.rating}</span>
                <span class="text-[10px] font-medium">${player.position}</span>
              </div>
              <img class="w-20" src="${player.photo}" alt="${player.name}">
            </div>
            <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${player.name}</p>
            <div class="text-[#362f16] gap-1 flex">
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">PAC</span>
                <span class="font-bold text-[10px]">${player.pace}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">SHO</span>
                <span class="font-bold text-[10px]">${player.shooting}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">PAS</span>
                <span class="font-bold text-[10px]">${player.passing}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">DRI</span>
                <span class="font-bold text-[10px]">${player.dribbling}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">DEF</span>
                <span class="font-bold text-[10px]">${player.defending}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">PHY</span>
                <span class="font-bold text-[10px]">${player.physical}</span>
              </div>
            </div>
            <div class="flex justify-center items-center w-3 gap-2">
              <img src="${player.flag}" alt="${player.name}">
              <img src="${player.logo}" alt="${player.club}">
            </div>
          `
          } else {
            positionElement.innerHTML = `
            <div class="flex">
              <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
                <span class="mb-[-5px] font-bold">${player.rating}</span>
                <span class="text-[10px] font-medium">${player.position}</span>
              </div>
              <img class="w-20" src="${player.photo}" alt="${player.name}">
            </div>
            <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${player.name}</p>
            <div class="text-[#362f16] gap-1 flex">
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">DIV</span>
                <span class="font-bold text-[10px]">${player.diving}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">HAN</span>
                <span class="font-bold text-[10px]">${player.handling}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">KIC</span>
                <span class="font-bold text-[10px]">${player.kicking}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">REF</span>
                <span class="font-bold text-[10px]">${player.reflexes}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">SPE</span>
                <span class="font-bold text-[10px]">${player.speed}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class=" text-[7px] font-medium mb-[-4px]">POS</span>
                <span class="font-bold text-[10px]">${player.positioning}</span>
              </div>
            </div>
            <div class="flex justify-center items-center w-3 gap-2">
              <img src="${player.flag}" alt="${player.name}">
              <img src="${player.logo}" alt="${player.club}">
            </div>
          `
          }


          document.getElementById("modalfilter").classList.add("hidden");
          document.getElementById("modalfilter").classList.remove("flex");
          data = data.filter(playerss => {
            return playerss.name !== player.name;
          })
        });

        div.addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', JSON.stringify(player));
          e.target.classList.add('opacity-50');
        });

        div.addEventListener('dragend', (e) => {
          e.target.classList.remove('opacity-50');
        });

        filtredPlayersCase.appendChild(div);
      });
    }
    data.forEach(player => {
      let div = document.createElement("div");
      div.setAttribute("class", "card-container cursor-pointer w-32 h-44");
      div.setAttribute("draggable", "true");

      let innerDiv = document.createElement("div");
      innerDiv.setAttribute("class", "card-inner");

      let frontDiv = document.createElement("div");
      frontDiv.setAttribute("class", "card-front goldcard bg-no-repeat bg-center bg-cover w-32 h-44 flex flex-col pt-8 items-center");

      let backDiv = document.createElement("div");
      backDiv.setAttribute("class", "card-back goldcard bg-no-repeat bg-center bg-cover w-32 h-44 flex flex-col justify-center items-center");
      backDiv.innerHTML = `
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded add-to-btn">
            Add
          </button> 
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-2 edit-btn">
          Edit
        </button>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded delete-btn">
          Delete
        </button>
      `;
      if (player.position !== "GK") {
        frontDiv.innerHTML = `
        <div class="flex">
          <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
            <span class="mb-[-5px] font-bold">${player.rating}</span>
            <span class="text-[10px] font-medium">${player.position}</span>
          </div>
          <img class="w-20" src="${player.photo}" alt="${player.name}">
        </div>
        <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${player.name}</p>
        <div class="text-[#362f16] gap-1 flex">
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">PAC</span>
            <span class="font-bold text-[10px]">${player.pace}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">SHO</span>
            <span class="font-bold text-[10px]">${player.shooting}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">PAS</span>
            <span class="font-bold text-[10px]">${player.passing}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">DRI</span>
            <span class="font-bold text-[10px]">${player.dribbling}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">DEF</span>
            <span class="font-bold text-[10px]">${player.defending}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">PHY</span>
            <span class="font-bold text-[10px]">${player.physical}</span>
          </div>
        </div>
        <div class="flex justify-center items-center w-3 gap-2">
          <img src="${player.flag}" alt="${player.name}">
          <img src="${player.logo}" alt="${player.club}">
        </div>
      `;
      } else {
        frontDiv.innerHTML = `
        <div class="flex">
          <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
            <span class="mb-[-5px] font-bold">${player.rating}</span>
            <span class="text-[10px] font-medium">${player.position}</span>
          </div>
          <img class="w-20" src="${player.photo}" alt="${player.name}">
        </div>
        <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${player.name}</p>
        <div class="text-[#362f16] gap-1 flex">
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">DIV</span>
            <span class="font-bold text-[10px]">${player.diving}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">HAN</span>
            <span class="font-bold text-[10px]">${player.handling}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">KIC</span>
            <span class="font-bold text-[10px]">${player.kicking}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">REF</span>
            <span class="font-bold text-[10px]">${player.reflexes}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">SPE</span>
            <span class="font-bold text-[10px]">${player.speed}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">POS</span>
            <span class="font-bold text-[10px]">${player.positioning}</span>
          </div>
        </div>
        <div class="flex justify-center items-center w-3 gap-2">
          <img src="${player.flag}" alt="${player.name}">
          <img src="${player.logo}" alt="${player.club}">
        </div>
      `;
      }

      innerDiv.appendChild(frontDiv);
      innerDiv.appendChild(backDiv);
      div.appendChild(innerDiv);

      backDiv.querySelector('.edit-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const modal = document.getElementById('Addplayermodal');
        modal.classList.add('flex');
        modal.classList.remove('hidden');

        document.getElementById('PlayerName').value = player.name;
        document.getElementById('PlayerPhoto').value = player.photo;
        document.getElementById('Position').value = player.position;
        document.getElementById('Nationality').value = player.nationality;
        document.getElementById('FlagUrl').value = player.flag;
        document.getElementById('clubName').value = player.club;
        document.getElementById('clubLogo').value = player.logo;
        document.getElementById('Rating').value = player.rating;

        const event = new Event('change');
        document.getElementById('Position').dispatchEvent(event);

        if (player.position === 'GK') {
          document.getElementById('diving').value = player.diving;
          document.getElementById('handling').value = player.handling;
          document.getElementById('kicking').value = player.kicking;
          document.getElementById('reflexes').value = player.reflexes;
          document.getElementById('speed').value = player.speed;
          document.getElementById('positioning').value = player.positioning;
        } else {
          document.getElementById('pace').value = player.pace;
          document.getElementById('shooting').value = player.shooting;
          document.getElementById('passing').value = player.passing;
          document.getElementById('dribbling').value = player.dribbling;
          document.getElementById('defending').value = player.defending;
          document.getElementById('physical').value = player.physical;
        }

        const addButton = document.querySelector('.addnew');
        addButton.textContent = 'Update Player';
        addButton.setAttribute("data-editing-player", player.name);
      });

      backDiv.querySelector('.delete-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this player?')) {
          let existingPlayers = JSON.parse(localStorage.getItem('players')) || { players: [] };
          existingPlayers.players = existingPlayers.players.filter(p => p.name !== player.name);
          localStorage.setItem('players', JSON.stringify(existingPlayers));
          location.reload();
        }
      });

      div.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify(player));
        e.target.classList.add('opacity-50');
      });

      div.addEventListener('dragend', (e) => {
        e.target.classList.remove('opacity-50');
      });

      div.addEventListener('click', function () {
        let positionElement = document.querySelector(`[position="${player.position}"]`);
        positionElement.classList.remove("blackcard");
        positionElement.classList.add("goldcard");
        if (player.position !== "GK") {
          positionElement.innerHTML = `
        <div class="flex">
          <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
            <span class="mb-[-5px] font-bold">${player.rating}</span>
            <span class="text-[10px] font-medium">${player.position}</span>
          </div>
          <img class="w-20" src="${player.photo}" alt="${player.name}">
        </div>
        <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${player.name}</p>
        <div class="text-[#362f16] gap-1 flex">
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">PAC</span>
            <span class="font-bold text-[10px]">${player.pace}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">SHO</span>
            <span class="font-bold text-[10px]">${player.shooting}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">PAS</span>
            <span class="font-bold text-[10px]">${player.passing}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">DRI</span>
            <span class="font-bold text-[10px]">${player.dribbling}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">DEF</span>
            <span class="font-bold text-[10px]">${player.defending}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">PHY</span>
            <span class="font-bold text-[10px]">${player.physical}</span>
          </div>
        </div>
        <div class="flex justify-center items-center w-3 gap-2">
          <img src="${player.flag}" alt="${player.name}">
          <img src="${player.logo}" alt="${player.club}">
        </div>
      `
        } else {
          positionElement.innerHTML = `
        <div class="flex">
          <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
            <span class="mb-[-5px] font-bold">${player.rating}</span>
            <span class="text-[10px] font-medium">${player.position}</span>
          </div>
          <img class="w-20" src="${player.photo}" alt="${player.name}">
        </div>
        <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${player.name}</p>
        <div class="text-[#362f16] gap-1 flex">
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">DIV</span>
            <span class="font-bold text-[10px]">${player.diving}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">HAN</span>
            <span class="font-bold text-[10px]">${player.handling}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">KIC</span>
            <span class="font-bold text-[10px]">${player.kicking}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">REF</span>
            <span class="font-bold text-[10px]">${player.reflexes}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">SPE</span>
            <span class="font-bold text-[10px]">${player.speed}</span>
          </div>
          <div class="flex flex-col gap-0 justify-center items-center">
            <span class=" text-[7px] font-medium mb-[-4px]">POS</span>
            <span class="font-bold text-[10px]">${player.positioning}</span>
          </div>
        </div>
        <div class="flex justify-center items-center w-3 gap-2">
          <img src="${player.flag}" alt="${player.name}">
          <img src="${player.logo}" alt="${player.club}">
        </div>
      `
        }


        document.getElementById("modalfilter").classList.add("hidden");
        document.getElementById("modalfilter").classList.remove("flex");
        data = data.filter(playerss => {
          return playerss.name !== player.name;
        })
      });


      document.getElementById("all").appendChild(div);
    });

    document.querySelectorAll('.position-button').forEach(button => {
      button.addEventListener('click', function () {
        const position = button.getAttribute('position');
        addFiltreplayerToPosition(position);
        document.getElementById("modalfilter").classList.add("flex");
        document.getElementById("modalfilter").classList.remove("hidden");
      });
    });

    const positionSelect = document.getElementById('Position');
    const gkStats = document.getElementById('gkStats');
    const playerStats = document.getElementById('playerStats');

    positionSelect.addEventListener('change', function () {
      if (this.value === 'GK') {
        gkStats.classList.remove('hidden');
        gkStats.classList.add('grid');
        if (playerStats) {
          playerStats.classList.add('hidden');
          playerStats.classList.remove('grid');
        }
      } else {
        gkStats.classList.add('hidden');
        gkStats.classList.remove('grid');
        if (playerStats) {
          playerStats.classList.remove('hidden');
          playerStats.classList.add('grid');
        }
      }
    });

    document.querySelector('.addnew').addEventListener('click', function () {
      const position = positionSelect.value;
      const playerData = {
        name: document.getElementById('PlayerName').value,
        photo: document.getElementById('PlayerPhoto').value,
        position: position,
        nationality: document.getElementById('Nationality').value,
        flag: document.getElementById('FlagUrl').value,
        club: document.getElementById('clubName').value,
        logo: document.getElementById('clubLogo').value,
        rating: document.getElementById('Rating').value,
      };

      if (position === 'GK') {
        playerData.diving = document.getElementById('diving').value;
        playerData.handling = document.getElementById('handling').value;
        playerData.kicking = document.getElementById('kicking').value;
        playerData.reflexes = document.getElementById('reflexes').value;
        playerData.speed = document.getElementById('speed').value;
        playerData.positioning = document.getElementById('positioning').value;
      } else {
        playerData.pace = document.getElementById('pace').value;
        playerData.shooting = document.getElementById('shooting').value;
        playerData.passing = document.getElementById('passing').value;
        playerData.dribbling = document.getElementById('dribbling').value;
        playerData.defending = document.getElementById('defending').value;
        playerData.physical = document.getElementById('physical').value;
      }

      let existingPlayers = JSON.parse(localStorage.getItem('players')) || { players: [] };

      if (this.getAttribute("data-editing-player")) {
        existingPlayers.players = existingPlayers.players.map(p =>
          p.name === this.getAttribute("data-editing-player") ? playerData : p
        );
        this.textContent = 'Add Player';
        delete this.getAttribute("data-editing-player");
      } else {
        existingPlayers.players.push(playerData);
      }

      localStorage.setItem('players', JSON.stringify(existingPlayers));

      document.getElementById('Addplayermodal').classList.add('hidden');
      document.getElementById('modalform').reset();

      location.reload();
    });

    document.querySelectorAll('.position-button').forEach(positionSlot => {
      positionSlot.addEventListener('dragover', (e) => {
        e.preventDefault();
        positionSlot.classList.add('border-2', 'border-green-500');
      });

      positionSlot.addEventListener('dragleave', (e) => {
        positionSlot.classList.remove('border-2', 'border-green-500');
      });

      positionSlot.addEventListener('drop', (e) => {
        e.preventDefault();
        positionSlot.classList.remove('border-2', 'border-green-500');

        const playerData = JSON.parse(e.dataTransfer.getData('text/plain'));

        positionSlot.classList.remove("blackcard");
        positionSlot.classList.add("goldcard");

        if (playerData.position === 'GK') {
          positionSlot.innerHTML = `
            <div class="flex">
              <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
                <span class="mb-[-5px] font-bold">${playerData.rating}</span>
                <span class="text-[10px] font-medium">${playerData.position}</span>
              </div>
              <img class="w-20" src="${playerData.photo}" alt="${playerData.name}">
            </div>
            <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${playerData.name}</p>
            <div class="text-[#362f16] gap-1 flex">
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class="text-[7px] font-medium mb-[-4px]">DIV</span>
                <span class="font-bold text-[10px]">${playerData.diving}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class="text-[7px] font-medium mb-[-4px]">HAN</span>
                <span class="font-bold text-[10px]">${playerData.handling}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class="text-[7px] font-medium mb-[-4px]">KIC</span>
                <span class="font-bold text-[10px]">${playerData.kicking}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class="text-[7px] font-medium mb-[-4px]">REF</span>
                <span class="font-bold text-[10px]">${playerData.reflexes}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class="text-[7px] font-medium mb-[-4px]">SPE</span>
                <span class="font-bold text-[10px]">${playerData.speed}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class="text-[7px] font-medium mb-[-4px]">POS</span>
                <span class="font-bold text-[10px]">${playerData.positioning}</span>
              </div>
            </div>
            <div class="flex justify-center items-center w-3 gap-2">
              <img src="${playerData.flag}" alt="${playerData.name}">
              <img src="${playerData.logo}" alt="${playerData.club}">
            </div>
          `;
        } else {
          positionSlot.innerHTML = `
            <div class="flex">
              <div class="flex flex-col mr-[-8px] text-[#362f16] items-center">
                <span class="mb-[-5px] font-bold">${playerData.rating}</span>
                <span class="text-[10px] font-medium">${playerData.position}</span>
              </div>
              <img class="w-20" src="${playerData.photo}" alt="${playerData.name}">
            </div>
            <p class="font-Raleway text-[11px] font-bold text-[#362f16] mb-[-4px]">${playerData.name}</p>
            <div class="text-[#362f16] gap-1 flex">
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class="text-[7px] font-medium mb-[-4px]">PAC</span>
                <span class="font-bold text-[10px]">${playerData.pace}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class="text-[7px] font-medium mb-[-4px]">SHO</span>
                <span class="font-bold text-[10px]">${playerData.shooting}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class="text-[7px] font-medium mb-[-4px]">PAS</span>
                <span class="font-bold text-[10px]">${playerData.passing}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class="text-[7px] font-medium mb-[-4px]">DRI</span>
                <span class="font-bold text-[10px]">${playerData.dribbling}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class="text-[7px] font-medium mb-[-4px]">DEF</span>
                <span class="font-bold text-[10px]">${playerData.defending}</span>
              </div>
              <div class="flex flex-col gap-0 justify-center items-center">
                <span class="text-[7px] font-medium mb-[-4px]">PHY</span>
                <span class="font-bold text-[10px]">${playerData.physical}</span>
              </div>
            </div>
            <div class="flex justify-center items-center w-3 gap-2">
              <img src="${playerData.flag}" alt="${playerData.name}">
              <img src="${playerData.logo}" alt="${playerData.club}">
            </div>
          `;
        }

        data = data.filter(p => p.name !== playerData.name);
      });
    });
    document.querySelector("#Formations").addEventListener("change", function (e) {
      const val = e.target.value;
      if (val === "442") {
        if (!document.querySelector("#second-line #RW")) {
          const content = document.querySelector("#attackers #RW").outerHTML;
          document.querySelector("#second-line").innerHTML += content;
          document.querySelector("#attackers #RW").remove();
        }
      } else {
        if (!document.querySelector("#attackers #RW")) {
          document.querySelector("#attackers").innerHTML += document.querySelector("#second-line #RW").outerHTML;
          document.querySelector("#second-line #RW").remove();
        }
      }
    });
  }
};
