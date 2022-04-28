/* 
Milestone 1
Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) 
e dall’interlocutore (bianco) assegnando due classi CSS diverse
Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, 
visualizzare nome e immagine di ogni contatto.

Milestone 2
Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, 
visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
Click sul contatto mostra la conversazione del contatto cliccato

Milestone 3
Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
“enter” il testo viene aggiunto al thread sopra, come messaggio verde
 Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
un “ok” come risposta, che apparirà dopo 1 secondo

Milestone 4
Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti 
il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

Milestone 5
Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti

Funzionalità
evitare che l'utente possa inviare un messaggio vuoto o composto solamente da spazi
A) cambiare icona in basso a destra (a fianco all'input per scrivere un nuovo messaggio) finché l'utente sta scrivendo: di default si visualizza l'icona del microfono, quando l'input non è vuoto si visualizza l'icona dell'aeroplano. Quando il messaggio è stato inviato e l'input si svuota, si torna a visualizzare il microfono. B) inviare quindi il messaggio anche cliccando sull'icona dell'aeroplano

*/


const app = new Vue ({
   el: '#app',

   data: {
    activeUser: 0, //Dichiaro un contatore per l'indice

    newMessage:'', // Definisco una nuova proprietà legata attraverso il v-model all'input per inviare i messaggi

    search: '', // Definisco una nuova proprietà per il metodo di ricerca

    autoReplyMessages: [  //Definisco un array di messaggi casuali
        'Forza Juve',
        'Che la forza sia con te',
        'Ciao Ciao',
        'Buonanotte',
        'TVB'
    ],

    contacts: [
        {
            name: 'Michele',
            avatar: '_1',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent',
                    click: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di stendere i panni',
                    status: 'sent',
                    click: false
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received',
                    click: false
                }
            ],
        },
        {
            name: 'Fabio',
            avatar: '_2',
            visible: true,
            messages: [
                {
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent',
                    click: false
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received',
                    click: false
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent',
                    click: false
                }
            ],
        },
        {
            name: 'Samuele',
            avatar: '_3',
            visible: true,
            messages: [
                {
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received',
                    click: false
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent',
                    click: false
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received',
                    click: false
                }
            ],
        },
        {
            name: 'Alessandro B.',
            avatar: '_4',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent',
                    click: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received',
                    click: false
                }
            ],
        },
        {
            name: 'Alessandro L.',
            avatar: '_5',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ricordati di chiamare la nonna',
                    status: 'sent',
                    click: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Va bene, stasera la sento',
                    status: 'received',
                    click: false
                }
            ],
        },
        {
            name: 'Claudia',
            avatar: '_6',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao Claudia, hai novità?',
                    status: 'sent',
                    click: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Non ancora',
                    status: 'received',
                    click: false
                },
                {
                    date: '10/01/2020 15:51:00',
                    message: 'Nessuna nuova, buona nuova',
                    status: 'sent',
                    click: false
                }
            ],
        },
        {
            name: 'Federico',
            avatar: '_7',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Fai gli auguri a Martina che è il suo compleanno!',
                    status: 'sent',
                    click: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Grazie per avermelo ricordato, le scrivo subito!',
                    status: 'received',
                    click: false
                }
            ],
        },
        {
            name: 'Davide',
            avatar: '_8',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao, andiamo a mangiare la pizza stasera?',
                    status: 'received',
                    click: false
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                    status: 'sent',
                    click: false
                },
                {
                    date: '10/01/2020 15:51:00',
                    message: 'OK!!',
                    status: 'received',
                    click: false
                } 
            ],
        }
    ]
   },

   methods: {
       changeChat(index) {
        // console.log('change chat');
        this.activeUser = index; //Attribuisco all'indice il valore activeUser
       },

       sendMessage(autoReplyMessages,pickRandomMessage) {
        //    console.log('message sent');
        console.log(this.autoReplyMessages);
           if(this.newMessage) {
               this.contacts[this.activeUser].messages.push({click: false, date: new Date().toLocaleString('it') , message: this.newMessage, status: 'sent'}); // "Pusho" nell'Array dei messagi un nuovo oggetto con il messaggio scritto dall'utente
               this.newMessage = '' // Pulisco l'input dopo l'invio del messaggio
               setTimeout(() => {
                this.contacts[this.activeUser].messages.push({click: false, date: new Date().toLocaleString('it'), message: this.pickRandomMessage(this.autoReplyMessages), status: 'received'}) // Imposto un timer di un secondo che invii una risposta automatica
               }, 1000);

            //    console.log(autoReplyMessages);

            
           }
       },

       isClicked(index) {
            //console.log('click');
            const clickValue = this.contacts[this.activeUser].messages[index]
            //console.log(clickValue);
            if(clickValue) {
            clickValue.click === false ? clickValue.click = true : clickValue.click = false
            // console.log(clickValue.click);
       }
       
       },

       deleteMessage(index) {
           this.contacts[this.activeUser].messages.splice(index, 1) // Elimino dall'array il messaggio
       },

       pickRandomMessage(array) {
        // Creo una funzione che selezioni un messaggio casuale dall'array di messaggi casuali
        const randomMessage = array[Math.floor(Math.random() * array.length)];

        return randomMessage

       }
    },
 
    computed: { //Creo una funzione che filtri i nomi dei contatti
        filteredUser() {
            return this.contacts.filter(contact => { //Filtro all'interno dell'array contacts
                return contact.name.toLowerCase().includes(this.search.toLowerCase()) //Restituisco un nuovo array che mi permatta di filtrare i nomi sia scritti in maiuscolo che in minuscolo
            })
        }
    }
})





