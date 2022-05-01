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
predisporre una lista di frasi e/o citazioni da utilizzare al posto della risposta "ok:" quando il pc risponde, anziché scrivere "ok", scegliere una frase random dalla lista e utilizzarla come testo del messaggio di risposta del pc
visualizzare nella lista dei contatti l'ultimo messaggio inviato/ricevuto da ciascun contatto
inserire l'orario corretto nei messaggi (v. note day.js)
sotto al nome del contatto nella parte in alto a destra, cambiare l'indicazione dello stato: visualizzare il testo "sta scrivendo..." 
nel timeout in cui il pc risponde, poi mantenere la scritta "online" per un paio di secondi e infine visualizzare "ultimo accesso alle xx:yy" con l'orario corretto

dare la possibilità all'utente di cancellare tutti i messaggi di un contatto o di cancellare l'intera chat con tutti i suoi dati: cliccando sull'icona 
con i tre pallini in alto a destra, si apre un dropdown menu in cui sono presenti le voci "Elimina messaggi" ed "Elimina chat"; cliccando su di essi si cancellano rispettivamente 
tutti i messaggi di quel contatto (quindi rimane la conversazione vuota) oppure l'intera chat comprensiva di tutti i dati del contatto oltre che tutti i suoi messaggi (quindi sparisce il contatto anche dalla lista di sinistra)

*/


const app = new Vue({
    el: '#app',

    data: {

        activeUser: 0, //Dichiaro un contatore per l'indice

        newMessage: '', // Definisco una nuova proprietà legata attraverso il v-model all'input per inviare i messaggi

        search: '', // Definisco una nuova proprietà per il metodo di ricerca

        autoReplyMessages: [ //Definisco un array di messaggi casuali
            'Forza Juve',
            'Che la forza sia con te',
            'Ciao Ciao',
            'Buonanotte',
            'TVB'
        ],

        contacts: [{
                name: 'Michele',
                avatar: '_1',
                visible: true,
                isWriting: false,
                messages: [{
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
                isWriting: false,
                isOnline: false,
                messages: [{
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
                isWriting: false,
                isOnline: false,
                messages: [{
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
                isWriting: false,
                isOnline: false,
                messages: [{
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
                isWriting: false,
                isOnline: false,
                messages: [{
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
                isWriting: false,
                isOnline: false,
                messages: [{
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
                isWriting: false,
                isOnline: false,
                messages: [{
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
                isWriting: false,
                isOnline: false,
                messages: [{
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

        sendMessage() {
            //console.log('message sent');
            const newText = this.newMessage.trim() // Definisco una variabile con il messaggio "trimmato"
            const activeContact = this.contacts[this.activeUser] // Definisco una variabile per il contatto attivo

            if (newText) {
                activeContact.messages.push({ click: false, date: new Date().toLocaleString('it'), message: this.newMessage, status: 'sent' }); // "Pusho" nell'Array dei messagi un nuovo oggetto con il messaggio scritto dall'utente
                this.newMessage = '' // Pulisco l'input dopo l'invio del messaggio
                activeContact.isWriting = true; // Imposto la proprietà isWriting su true
                activeContact.isOnline = true; // Imposto la proprietà isOnline su true
                setTimeout(() => { // Imposto un time out di 1 secondo per il messaggio di risposta automatico
                    activeContact.messages.push({ click: false, date: new Date().toLocaleString('it'), message: this.pickRandomMessage(this.autoReplyMessages), status: 'received' }); // Imposto un timer di un secondo che invii una risposta automatica 
                    activeContact.isWriting = false // Imposto la proprietà isWriting su false
                }, 1000);
                setTimeout(() => { // Imposto un timer di 3 secondi per cambiare lo stato dell'utente
                    activeContact.isOnline = false // Imposto la proprietà isOnline su false

                }, 3000);







            }
        },

        searchContact() { //Creo una funzione che filtri i contatti
            const search = this.search.toLowerCase(); //Dichiaro una variabile per il testo scritto nell'input
            // console.log(search);

            const contacts = this.contacts //Definisco una variabile per l'array di contatti
            contacts.forEach(contact => { //Ciclo all'interno dell'array
                const name = contact.name.toLowerCase() //Definisco una varibile per il nome del singolo contatto
                contact.visible = true //Imposto la proprietà visible su true per ogni singolo contatto

                if (!name.includes(search)) { // Verifico se il nome del contatto contiene il testo scritto nell'input
                    contact.visible = false // Imposto la proprietà visible su false se il testo scritto non contiene il nome
                }

            })
        },

        isClicked(index) {
            //console.log('click');
            const clickValue = this.contacts[this.activeUser].messages[index]
                //console.log(clickValue);
            if (clickValue) {
                clickValue.click === false ? clickValue.click = true : clickValue.click = false
                    // console.log(clickValue.click);
            }

        },

        closeDropdown(index) {
            const clickValue = this.contacts[this.activeUser].messages[index]
            clickValue.click = false
        },

        deleteMessage(index) {
            this.contacts[this.activeUser].messages.splice(index, 1) // Elimino dall'array il messaggio
        },

        deleteContactMessages() {
            console.log('delete all messages');
            this.contacts[this.activeUser].messages.splice(0, this.contacts[this.activeUser].messages.length)
        },

        deleteContact() {
            console.log('delete contact');
            const contacts = this.contacts
            console.log(contacts);
            contacts.forEach(contact => {
                console.log(contact);

            })
        },

        pickRandomMessage(array) {
            // Creo una funzione che selezioni un messaggio casuale dall'array di messaggi casuali
            const randomMessage = array[Math.floor(Math.random() * array.length)];

            return randomMessage

        }
    },

    // computed: { //Creo una funzione che filtri i nomi dei contatti
    //     filteredUser() {
    //         return this.contacts.filter(contact => { //Filtro all'interno dell'array contacts
    //             return contact.name.toLowerCase().includes(this.search.toLowerCase()) //Restituisco un nuovo array che mi permatta di filtrare i nomi sia scritti in maiuscolo che in minuscolo
    //         })
    //     }
    // }
})