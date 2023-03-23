const tabela = document.getElementById("vaktija-table");

// Učitaj podatke iz fajla
fetch("vaktija.json")
  .then((response) => response.json())
  .then((data) => {
    // Definiraj varijable za trenutni dan i trenutni datum
    const danas = new Date();
    const dns = formatirajDatum(danas)
    
    function formatirajDatum(datum) {
        const dan = datum.getDate();
        const mjesec = (datum.getMonth() + 1).toString().padStart(2, '0');
        const godina = datum.getFullYear().toString();
        return `${dan}.${mjesec}.${godina}.`;
    }

    // Definiraj varijable za podatke iz fajla
    let tabelaPodaci = "";

    // Prolazi kroz podatke i dodaj ih u tabelu
    for (let i = 0; i < data.data.length; i++) {
      const vaktija = data.data[i];

      // Kreiraj JavaScript Date objekat od string datuma
      const datum = new Date(vaktija.date.split(".").reverse().join("-"));

      const daniUTjednu = ["Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"];

      // Formatiranje datuma
      const danUTjednu = daniUTjednu[datum.getDay()];
      const dan = datum.getDate();
      const mjesec = datum.getMonth();
      const godina = datum.getFullYear();
      const formatiranDatum = `${danUTjednu} ${dan}.${mjesec + 1}.${godina}.`;
      const formatiranDatumbezDana = `${dan}.0${mjesec + 1}.${godina}.`;

      
      if (dns === formatiranDatumbezDana) {
        tabelaPodaci += `<tr class="trenutni-dan">`;
        tabelaPodaci += `<td >${formatiranDatum}</td>`;
        tabelaPodaci += `<td>${i + 1}</td>`;
        tabelaPodaci += `<td>${vaktija.sehur}</td>`;
        tabelaPodaci += `<td>${vaktija.iftar}</td>`;
        tabelaPodaci += "</tr>";
      } else {
        tabelaPodaci += "<tr`>";
        tabelaPodaci += `<td >${formatiranDatum}</td>`;
        tabelaPodaci += `<td>${i + 1}</td>`;
        tabelaPodaci += `<td>${vaktija.sehur}</td>`;
        tabelaPodaci += `<td>${vaktija.iftar}</td>`;
        tabelaPodaci += "</tr>";
      }
    }

    // Postavi podatke u tabelu
    const tbody = document.getElementById("dataBody");
    tbody.innerHTML = tabelaPodaci;
  })
  .catch((error) => console.error(error));
