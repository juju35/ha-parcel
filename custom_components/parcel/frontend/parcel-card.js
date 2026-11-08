var PARCEL_CARD_VERSION = '1.3.0';

// ── Header icon: same tinted round icon as the project page of the showcase site ──────────────────────────────
// (the integration keeps its brand/icon.png). Parcel accent, 16 % tint like the generic icons of the other cards.
var PARCEL_ACCENT = '#ff7a00';

// ── i18n ──────────────────────────────────────────────────────────────────────
var ParcelI18n = {
  fr: {
    default_title: 'Colis',
    empty: 'Aucun colis à afficher',
    no_entity: 'Capteur Parcel introuvable. Ajoutez l\'intégration Parcel ou renseignez « entity ».',
    unavailable: 'Parcel est indisponible. Les colis s\'afficheront après la prochaine mise à jour réussie.',
    in_progress: 'en cours',
    expected: 'Prévu :',
    add: 'Ajouter un colis',
    refresh: 'Actualiser',
    refresh_failed: 'Actualisation impossible :',
    tracking_number: 'Numéro de suivi',
    carrier: 'Transporteur',
    carrier_search: 'Rechercher un transporteur',
    description: 'Description',
    push: 'Notification de confirmation Parcel',
    submit: 'Ajouter',
    cancel: 'Annuler',
    adding: 'Ajout…',
    added: 'Colis ajouté. Il apparaîtra après la prochaine mise à jour de Parcel.',
    unknown_carrier: 'Choisissez un transporteur dans la liste.',
    required: 'Numéro de suivi, transporteur et description sont obligatoires.',
    limit: 'Parcel limite les ajouts à 20 par jour.',
    no_events: 'Aucun événement pour l\'instant',
    copy: 'Copier le numéro',
    today: 'attendus aujourd’hui',
    show_full: 'Afficher la carte complète',
    show_compact: 'Revenir à la vue compacte',
    editor: {
      entity: 'Capteur Parcel',
      title: 'Titre',
      show_delivered: 'Afficher les colis livrés',
      show_add: 'Afficher le bouton d\'ajout',
      show_refresh: 'Afficher le bouton Actualiser',
      max_events: 'Événements affichés quand un colis est déplié',
      language: 'Langue',
      lang_auto: 'Automatique',
    },
    status: {
      delivered: 'Livré',
      frozen: 'Sans mise à jour',
      in_transit: 'En transit',
      awaiting_pickup: 'À retirer',
      out_for_delivery: 'En cours de livraison',
      not_found: 'Introuvable',
      failed_attempt: 'Échec de livraison',
      exception: 'Problème',
      info_received: 'Annoncé',
      unknown: 'Inconnu',
    },
  },
  en: {
    default_title: 'Deliveries',
    empty: 'No deliveries to show',
    no_entity: 'Parcel sensor not found. Add the Parcel integration or set "entity".',
    unavailable: 'Parcel is unavailable. The deliveries will show up after the next successful update.',
    in_progress: 'active',
    expected: 'Expected:',
    add: 'Add a delivery',
    refresh: 'Refresh',
    refresh_failed: 'Refresh failed:',
    tracking_number: 'Tracking number',
    carrier: 'Carrier',
    carrier_search: 'Search a carrier',
    description: 'Description',
    push: 'Parcel push confirmation',
    submit: 'Add',
    cancel: 'Cancel',
    adding: 'Adding…',
    added: 'Delivery added. It will show up after the next Parcel update.',
    unknown_carrier: 'Pick a carrier from the list.',
    required: 'Tracking number, carrier and description are required.',
    limit: 'Parcel allows 20 additions per day.',
    no_events: 'No events yet',
    copy: 'Copy tracking number',
    today: 'arriving today',
    show_full: 'Show the full card',
    show_compact: 'Back to the compact view',
    editor: {
      entity: 'Parcel sensor',
      title: 'Title',
      show_delivered: 'Show delivered parcels',
      show_add: 'Show add button',
      show_refresh: 'Show refresh button',
      max_events: 'Events shown when a parcel is expanded',
      language: 'Language',
      lang_auto: 'Auto',
    },
    status: {
      delivered: 'Delivered',
      frozen: 'No updates',
      in_transit: 'In transit',
      awaiting_pickup: 'Awaiting pickup',
      out_for_delivery: 'Out for delivery',
      not_found: 'Not found',
      failed_attempt: 'Failed attempt',
      exception: 'Exception',
      info_received: 'Info received',
      unknown: 'Unknown',
    },
  },
  de: {
    default_title: 'Sendungen',
    empty: 'Keine Sendungen vorhanden',
    no_entity: 'Parcel-Sensor nicht gefunden. Füge die Parcel-Integration hinzu oder setze „entity“.',
    unavailable: 'Parcel ist nicht verfügbar. Die Sendungen erscheinen nach der nächsten erfolgreichen Aktualisierung.',
    in_progress: 'aktiv',
    expected: 'Erwartet:',
    add: 'Sendung hinzufügen',
    refresh: 'Aktualisieren',
    refresh_failed: 'Aktualisierung fehlgeschlagen:',
    tracking_number: 'Sendungsnummer',
    carrier: 'Versanddienstleister',
    carrier_search: 'Versanddienstleister suchen',
    description: 'Beschreibung',
    push: 'Push-Bestätigung von Parcel',
    submit: 'Hinzufügen',
    cancel: 'Abbrechen',
    adding: 'Wird hinzugefügt…',
    added: 'Sendung hinzugefügt. Sie erscheint nach der nächsten Aktualisierung von Parcel.',
    unknown_carrier: 'Wähle einen Versanddienstleister aus der Liste.',
    required: 'Sendungsnummer, Versanddienstleister und Beschreibung sind erforderlich.',
    limit: 'Parcel erlaubt maximal 20 neue Sendungen pro Tag.',
    no_events: 'Noch keine Ereignisse',
    copy: 'Sendungsnummer kopieren',
    today: 'heute erwartet',
    show_full: 'Vollständige Karte anzeigen',
    show_compact: 'Zurück zur kompakten Ansicht',
    editor: {
      entity: 'Parcel-Sensor',
      title: 'Titel',
      show_delivered: 'Zugestellte Sendungen anzeigen',
      show_add: 'Schaltfläche „Hinzufügen“ anzeigen',
      show_refresh: 'Schaltfläche „Aktualisieren“ anzeigen',
      max_events: 'Angezeigte Ereignisse bei aufgeklappter Sendung',
      language: 'Sprache',
      lang_auto: 'Automatisch',
    },
    status: {
      delivered: 'Zugestellt',
      frozen: 'Keine Aktualisierungen',
      in_transit: 'Unterwegs',
      awaiting_pickup: 'Zur Abholung bereit',
      out_for_delivery: 'In Zustellung',
      not_found: 'Nicht gefunden',
      failed_attempt: 'Fehlversuch',
      exception: 'Problem',
      info_received: 'Angekündigt',
      unknown: 'Unbekannt',
    },
  },
  es: {
    default_title: 'Envíos',
    empty: 'No hay envíos que mostrar',
    no_entity: 'No se encuentra el sensor de Parcel. Añade la integración Parcel o indica «entity».',
    unavailable: 'Parcel no está disponible. Los envíos aparecerán tras la próxima actualización correcta.',
    in_progress: 'en curso',
    expected: 'Previsto:',
    add: 'Añadir un envío',
    refresh: 'Actualizar',
    refresh_failed: 'No se pudo actualizar:',
    tracking_number: 'Número de seguimiento',
    carrier: 'Transportista',
    carrier_search: 'Buscar un transportista',
    description: 'Descripción',
    push: 'Confirmación push de Parcel',
    submit: 'Añadir',
    cancel: 'Cancelar',
    adding: 'Añadiendo…',
    added: 'Envío añadido. Aparecerá tras la próxima actualización de Parcel.',
    unknown_carrier: 'Elige un transportista de la lista.',
    required: 'El número de seguimiento, el transportista y la descripción son obligatorios.',
    limit: 'Parcel permite 20 envíos añadidos al día.',
    no_events: 'Aún no hay eventos',
    copy: 'Copiar el número de seguimiento',
    today: 'llegan hoy',
    show_full: 'Mostrar la tarjeta completa',
    show_compact: 'Volver a la vista compacta',
    editor: {
      entity: 'Sensor de Parcel',
      title: 'Título',
      show_delivered: 'Mostrar los envíos entregados',
      show_add: 'Mostrar el botón Añadir',
      show_refresh: 'Mostrar el botón Actualizar',
      max_events: 'Eventos mostrados al desplegar un envío',
      language: 'Idioma',
      lang_auto: 'Automático',
    },
    status: {
      delivered: 'Entregado',
      frozen: 'Sin actualizaciones',
      in_transit: 'En tránsito',
      awaiting_pickup: 'Listo para recoger',
      out_for_delivery: 'En reparto',
      not_found: 'No encontrado',
      failed_attempt: 'Intento fallido',
      exception: 'Incidencia',
      info_received: 'Información recibida',
      unknown: 'Desconocido',
    },
  },
  sr: {
    default_title: 'Пошиљке',
    empty: 'Нема пошиљки за приказ',
    no_entity: 'Parcel сензор није пронађен. Додајте интеграцију Parcel или подесите „entity“.',
    unavailable: 'Parcel је недоступан. Пошиљке ће се појавити после следећег успешног ажурирања.',
    in_progress: 'у току',
    expected: 'Очекује се:',
    add: 'Додај пошиљку',
    refresh: 'Освежи',
    refresh_failed: 'Освежавање није успело:',
    tracking_number: 'Број за праћење',
    carrier: 'Превозник',
    carrier_search: 'Претражи превознике',
    description: 'Опис',
    push: 'Parcel обавештење о потврди',
    submit: 'Додај',
    cancel: 'Откажи',
    adding: 'Додавање…',
    added: 'Пошиљка је додата. Појавиће се после следећег ажурирања Parcel-а.',
    unknown_carrier: 'Изаберите превозника са листе.',
    required: 'Број за праћење, превозник и опис су обавезни.',
    limit: 'Parcel дозвољава 20 додавања дневно.',
    no_events: 'Још нема догађаја',
    copy: 'Копирај број за праћење',
    today: 'стижу данас',
    show_full: 'Прикажи целу картицу',
    show_compact: 'Назад на компактни приказ',
    editor: {
      entity: 'Parcel сензор',
      title: 'Наслов',
      show_delivered: 'Прикажи испоручене пошиљке',
      show_add: 'Прикажи дугме за додавање',
      show_refresh: 'Прикажи дугме за освежавање',
      max_events: 'Догађаји приказани када се пошиљка прошири',
      language: 'Језик',
      lang_auto: 'Аутоматски',
    },
    status: {
      delivered: 'Испоручено',
      frozen: 'Без ажурирања',
      in_transit: 'У транзиту',
      awaiting_pickup: 'Чека преузимање',
      out_for_delivery: 'На достави',
      not_found: 'Није пронађено',
      failed_attempt: 'Неуспела достава',
      exception: 'Проблем',
      info_received: 'Најављено',
      unknown: 'Непознато',
    },
  },
  'sr-Latn': {
    default_title: 'Pošiljke',
    empty: 'Nema pošiljki za prikaz',
    no_entity: 'Parcel senzor nije pronađen. Dodajte integraciju Parcel ili podesite „entity“.',
    unavailable: 'Parcel je nedostupan. Pošiljke će se pojaviti posle sledećeg uspešnog ažuriranja.',
    in_progress: 'u toku',
    expected: 'Očekuje se:',
    add: 'Dodaj pošiljku',
    refresh: 'Osveži',
    refresh_failed: 'Osvežavanje nije uspelo:',
    tracking_number: 'Broj za praćenje',
    carrier: 'Prevoznik',
    carrier_search: 'Pretraži prevoznike',
    description: 'Opis',
    push: 'Parcel obaveštenje o potvrdi',
    submit: 'Dodaj',
    cancel: 'Otkaži',
    adding: 'Dodavanje…',
    added: 'Pošiljka je dodata. Pojaviće se posle sledećeg ažuriranja Parcel-a.',
    unknown_carrier: 'Izaberite prevoznika sa liste.',
    required: 'Broj za praćenje, prevoznik i opis su obavezni.',
    limit: 'Parcel dozvoljava 20 dodavanja dnevno.',
    no_events: 'Još nema događaja',
    copy: 'Kopiraj broj za praćenje',
    today: 'stižu danas',
    show_full: 'Prikaži celu karticu',
    show_compact: 'Nazad na kompaktni prikaz',
    editor: {
      entity: 'Parcel senzor',
      title: 'Naslov',
      show_delivered: 'Prikaži isporučene pošiljke',
      show_add: 'Prikaži dugme za dodavanje',
      show_refresh: 'Prikaži dugme za osvežavanje',
      max_events: 'Događaji prikazani kada se pošiljka proširi',
      language: 'Jezik',
      lang_auto: 'Automatski',
    },
    status: {
      delivered: 'Isporučeno',
      frozen: 'Bez ažuriranja',
      in_transit: 'U tranzitu',
      awaiting_pickup: 'Čeka preuzimanje',
      out_for_delivery: 'Na dostavi',
      not_found: 'Nije pronađeno',
      failed_attempt: 'Neuspela dostava',
      exception: 'Problem',
      info_received: 'Najavljeno',
      unknown: 'Nepoznato',
    },
  },
  it: {
    default_title: 'Spedizioni',
    empty: 'Nessuna spedizione da mostrare',
    no_entity: 'Sensore Parcel non trovato. Aggiungi l\'integrazione Parcel o imposta «entity».',
    unavailable: 'Parcel non è disponibile. Le spedizioni appariranno dopo il prossimo aggiornamento riuscito.',
    in_progress: 'in corso',
    expected: 'Prevista:',
    add: 'Aggiungi una spedizione',
    refresh: 'Aggiorna',
    refresh_failed: 'Aggiornamento non riuscito:',
    tracking_number: 'Numero di tracciamento',
    carrier: 'Corriere',
    carrier_search: 'Cerca un corriere',
    description: 'Descrizione',
    push: 'Notifica push di conferma Parcel',
    submit: 'Aggiungi',
    cancel: 'Annulla',
    adding: 'Aggiunta in corso…',
    added: 'Spedizione aggiunta. Apparirà dopo il prossimo aggiornamento di Parcel.',
    unknown_carrier: 'Scegli un corriere dall\'elenco.',
    required: 'Numero di tracciamento, corriere e descrizione sono obbligatori.',
    limit: 'Parcel consente 20 aggiunte al giorno.',
    no_events: 'Ancora nessun evento',
    copy: 'Copia il numero di tracciamento',
    today: 'in arrivo oggi',
    show_full: 'Mostra la scheda completa',
    show_compact: 'Torna alla vista compatta',
    editor: {
      entity: 'Sensore Parcel',
      title: 'Titolo',
      show_delivered: 'Mostra le spedizioni consegnate',
      show_add: 'Mostra il pulsante Aggiungi',
      show_refresh: 'Mostra il pulsante Aggiorna',
      max_events: 'Eventi mostrati quando una spedizione è espansa',
      language: 'Lingua',
      lang_auto: 'Automatica',
    },
    status: {
      delivered: 'Consegnata',
      frozen: 'Nessun aggiornamento',
      in_transit: 'In transito',
      awaiting_pickup: 'Da ritirare',
      out_for_delivery: 'In consegna',
      not_found: 'Non trovata',
      failed_attempt: 'Tentativo fallito',
      exception: 'Problema',
      info_received: 'Annunciata',
      unknown: 'Sconosciuta',
    },
  },
  nl: {
    default_title: 'Zendingen',
    empty: 'Geen zendingen om weer te geven',
    no_entity: 'Parcel-sensor niet gevonden. Voeg de Parcel-integratie toe of stel „entity” in.',
    unavailable: 'Parcel is niet beschikbaar. De zendingen verschijnen na de volgende geslaagde update.',
    in_progress: 'actief',
    expected: 'Verwacht:',
    add: 'Zending toevoegen',
    refresh: 'Vernieuwen',
    refresh_failed: 'Vernieuwen mislukt:',
    tracking_number: 'Trackingnummer',
    carrier: 'Vervoerder',
    carrier_search: 'Vervoerder zoeken',
    description: 'Omschrijving',
    push: 'Pushbevestiging van Parcel',
    submit: 'Toevoegen',
    cancel: 'Annuleren',
    adding: 'Toevoegen…',
    added: 'Zending toegevoegd. Deze verschijnt na de volgende update van Parcel.',
    unknown_carrier: 'Kies een vervoerder uit de lijst.',
    required: 'Trackingnummer, vervoerder en omschrijving zijn verplicht.',
    limit: 'Parcel staat 20 toevoegingen per dag toe.',
    no_events: 'Nog geen gebeurtenissen',
    copy: 'Trackingnummer kopiëren',
    today: 'vandaag verwacht',
    show_full: 'Volledige kaart tonen',
    show_compact: 'Terug naar de compacte weergave',
    editor: {
      entity: 'Parcel-sensor',
      title: 'Titel',
      show_delivered: 'Bezorgde zendingen tonen',
      show_add: 'Knop Toevoegen tonen',
      show_refresh: 'Knop Vernieuwen tonen',
      max_events: 'Getoonde gebeurtenissen bij een uitgeklapte zending',
      language: 'Taal',
      lang_auto: 'Automatisch',
    },
    status: {
      delivered: 'Bezorgd',
      frozen: 'Geen updates',
      in_transit: 'Onderweg',
      awaiting_pickup: 'Klaar om op te halen',
      out_for_delivery: 'Wordt bezorgd',
      not_found: 'Niet gevonden',
      failed_attempt: 'Bezorgpoging mislukt',
      exception: 'Probleem',
      info_received: 'Aangemeld',
      unknown: 'Onbekend',
    },
  },
  pt: {
    default_title: 'Encomendas',
    empty: 'Nenhuma encomenda a mostrar',
    no_entity: 'Sensor do Parcel não encontrado. Adicione a integração Parcel ou indique «entity».',
    unavailable: 'O Parcel está indisponível. As encomendas aparecerão após a próxima atualização bem-sucedida.',
    in_progress: 'em curso',
    expected: 'Prevista:',
    add: 'Adicionar uma encomenda',
    refresh: 'Atualizar',
    refresh_failed: 'Não foi possível atualizar:',
    tracking_number: 'Número de seguimento',
    carrier: 'Transportadora',
    carrier_search: 'Procurar uma transportadora',
    description: 'Descrição',
    push: 'Notificação push de confirmação do Parcel',
    submit: 'Adicionar',
    cancel: 'Cancelar',
    adding: 'A adicionar…',
    added: 'Encomenda adicionada. Aparecerá após a próxima atualização do Parcel.',
    unknown_carrier: 'Escolha uma transportadora da lista.',
    required: 'O número de seguimento, a transportadora e a descrição são obrigatórios.',
    limit: 'O Parcel permite 20 adições por dia.',
    no_events: 'Ainda não há eventos',
    copy: 'Copiar o número de seguimento',
    today: 'chegam hoje',
    show_full: 'Mostrar o cartão completo',
    show_compact: 'Voltar à vista compacta',
    editor: {
      entity: 'Sensor do Parcel',
      title: 'Título',
      show_delivered: 'Mostrar as encomendas entregues',
      show_add: 'Mostrar o botão Adicionar',
      show_refresh: 'Mostrar o botão Atualizar',
      max_events: 'Eventos mostrados ao expandir uma encomenda',
      language: 'Idioma',
      lang_auto: 'Automático',
    },
    status: {
      delivered: 'Entregue',
      frozen: 'Sem atualizações',
      in_transit: 'Em trânsito',
      awaiting_pickup: 'Pronta a levantar',
      out_for_delivery: 'Em distribuição',
      not_found: 'Não encontrada',
      failed_attempt: 'Tentativa falhada',
      exception: 'Problema',
      info_received: 'Anunciada',
      unknown: 'Desconhecida',
    },
  },
  pl: {
    default_title: 'Przesyłki',
    empty: 'Brak przesyłek do wyświetlenia',
    no_entity: 'Nie znaleziono sensora Parcel. Dodaj integrację Parcel lub ustaw „entity”.',
    unavailable: 'Parcel jest niedostępny. Przesyłki pojawią się po następnej udanej aktualizacji.',
    in_progress: 'aktywne',
    expected: 'Przewidywana dostawa:',
    add: 'Dodaj przesyłkę',
    refresh: 'Odśwież',
    refresh_failed: 'Odświeżanie nie powiodło się:',
    tracking_number: 'Numer przesyłki',
    carrier: 'Przewoźnik',
    carrier_search: 'Szukaj przewoźnika',
    description: 'Opis',
    push: 'Powiadomienie push z potwierdzeniem Parcel',
    submit: 'Dodaj',
    cancel: 'Anuluj',
    adding: 'Dodawanie…',
    added: 'Dodano przesyłkę. Pojawi się po następnej aktualizacji Parcel.',
    unknown_carrier: 'Wybierz przewoźnika z listy.',
    required: 'Numer przesyłki, przewoźnik i opis są wymagane.',
    limit: 'Parcel pozwala na 20 dodań dziennie.',
    no_events: 'Brak zdarzeń',
    copy: 'Kopiuj numer przesyłki',
    today: 'dostawa dziś',
    show_full: 'Pokaż pełną kartę',
    show_compact: 'Wróć do widoku kompaktowego',
    editor: {
      entity: 'Sensor Parcel',
      title: 'Tytuł',
      show_delivered: 'Pokaż doręczone przesyłki',
      show_add: 'Pokaż przycisk dodawania',
      show_refresh: 'Pokaż przycisk odświeżania',
      max_events: 'Zdarzenia wyświetlane po rozwinięciu przesyłki',
      language: 'Język',
      lang_auto: 'Automatycznie',
    },
    status: {
      delivered: 'Doręczono',
      frozen: 'Brak aktualizacji',
      in_transit: 'W transporcie',
      awaiting_pickup: 'Do odbioru',
      out_for_delivery: 'W doręczeniu',
      not_found: 'Nie znaleziono',
      failed_attempt: 'Nieudane doręczenie',
      exception: 'Problem',
      info_received: 'Zarejestrowano',
      unknown: 'Nieznany',
    },
  },
  ro: {
    default_title: 'Colete',
    empty: 'Niciun colet de afișat',
    no_entity: 'Senzorul Parcel nu a fost găsit. Adăugați integrarea Parcel sau setați „entity”.',
    unavailable: 'Parcel nu este disponibil. Coletele vor apărea după următoarea actualizare reușită.',
    in_progress: 'în curs',
    expected: 'Estimat:',
    add: 'Adăugați un colet',
    refresh: 'Reîmprospătare',
    refresh_failed: 'Reîmprospătarea a eșuat:',
    tracking_number: 'Număr de urmărire',
    carrier: 'Curier',
    carrier_search: 'Căutați un curier',
    description: 'Descriere',
    push: 'Confirmare push Parcel',
    submit: 'Adăugare',
    cancel: 'Anulare',
    adding: 'Se adaugă…',
    added: 'Colet adăugat. Va apărea după următoarea actualizare Parcel.',
    unknown_carrier: 'Alegeți un curier din listă.',
    required: 'Numărul de urmărire, curierul și descrierea sunt obligatorii.',
    limit: 'Parcel permite 20 de adăugări pe zi.',
    no_events: 'Încă niciun eveniment',
    copy: 'Copiați numărul de urmărire',
    today: 'sosesc azi',
    show_full: 'Afișează cardul complet',
    show_compact: 'Înapoi la vizualizarea compactă',
    editor: {
      entity: 'Senzor Parcel',
      title: 'Titlu',
      show_delivered: 'Afișează coletele livrate',
      show_add: 'Afișează butonul de adăugare',
      show_refresh: 'Afișează butonul de reîmprospătare',
      max_events: 'Evenimente afișate la extinderea unui colet',
      language: 'Limbă',
      lang_auto: 'Automat',
    },
    status: {
      delivered: 'Livrat',
      frozen: 'Fără actualizări',
      in_transit: 'În tranzit',
      awaiting_pickup: 'Gata de ridicare',
      out_for_delivery: 'În curs de livrare',
      not_found: 'Negăsit',
      failed_attempt: 'Livrare eșuată',
      exception: 'Problemă',
      info_received: 'Înregistrat',
      unknown: 'Necunoscut',
    },
  },
  da: {
    default_title: 'Pakker',
    empty: 'Ingen pakker at vise',
    no_entity: 'Parcel-sensoren blev ikke fundet. Tilføj Parcel-integrationen, eller angiv »entity«.',
    unavailable: 'Parcel er ikke tilgængelig. Pakkerne vises efter næste vellykkede opdatering.',
    in_progress: 'aktive',
    expected: 'Forventet:',
    add: 'Tilføj en pakke',
    refresh: 'Opdater',
    refresh_failed: 'Opdatering mislykkedes:',
    tracking_number: 'Trackingnummer',
    carrier: 'Fragtfirma',
    carrier_search: 'Søg efter et fragtfirma',
    description: 'Beskrivelse',
    push: 'Push-bekræftelse fra Parcel',
    submit: 'Tilføj',
    cancel: 'Annuller',
    adding: 'Tilføjer…',
    added: 'Pakken er tilføjet. Den vises efter næste opdatering fra Parcel.',
    unknown_carrier: 'Vælg et fragtfirma på listen.',
    required: 'Trackingnummer, fragtfirma og beskrivelse er påkrævet.',
    limit: 'Parcel tillader 20 tilføjelser om dagen.',
    no_events: 'Ingen hændelser endnu',
    copy: 'Kopiér trackingnummer',
    today: 'ankommer i dag',
    show_full: 'Vis hele kortet',
    show_compact: 'Tilbage til kompakt visning',
    editor: {
      entity: 'Parcel-sensor',
      title: 'Titel',
      show_delivered: 'Vis leverede pakker',
      show_add: 'Vis knappen Tilføj',
      show_refresh: 'Vis knappen Opdater',
      max_events: 'Hændelser, der vises, når en pakke er udvidet',
      language: 'Sprog',
      lang_auto: 'Automatisk',
    },
    status: {
      delivered: 'Leveret',
      frozen: 'Ingen opdateringer',
      in_transit: 'Undervejs',
      awaiting_pickup: 'Klar til afhentning',
      out_for_delivery: 'Under udbringning',
      not_found: 'Ikke fundet',
      failed_attempt: 'Mislykket levering',
      exception: 'Problem',
      info_received: 'Registreret',
      unknown: 'Ukendt',
    },
  },
  sv: {
    default_title: 'Paket',
    empty: 'Inga paket att visa',
    no_entity: 'Parcel-sensorn hittades inte. Lägg till Parcel-integrationen eller ange ”entity”.',
    unavailable: 'Parcel är inte tillgängligt. Paketen visas efter nästa lyckade uppdatering.',
    in_progress: 'aktiva',
    expected: 'Förväntas:',
    add: 'Lägg till ett paket',
    refresh: 'Uppdatera',
    refresh_failed: 'Uppdateringen misslyckades:',
    tracking_number: 'Spårningsnummer',
    carrier: 'Transportör',
    carrier_search: 'Sök efter en transportör',
    description: 'Beskrivning',
    push: 'Push-bekräftelse från Parcel',
    submit: 'Lägg till',
    cancel: 'Avbryt',
    adding: 'Lägger till…',
    added: 'Paketet har lagts till. Det visas efter nästa uppdatering från Parcel.',
    unknown_carrier: 'Välj en transportör i listan.',
    required: 'Spårningsnummer, transportör och beskrivning krävs.',
    limit: 'Parcel tillåter 20 tillägg per dag.',
    no_events: 'Inga händelser än',
    copy: 'Kopiera spårningsnummer',
    today: 'kommer i dag',
    show_full: 'Visa hela kortet',
    show_compact: 'Tillbaka till kompakt vy',
    editor: {
      entity: 'Parcel-sensor',
      title: 'Titel',
      show_delivered: 'Visa levererade paket',
      show_add: 'Visa knappen Lägg till',
      show_refresh: 'Visa knappen Uppdatera',
      max_events: 'Händelser som visas när ett paket är expanderat',
      language: 'Språk',
      lang_auto: 'Automatiskt',
    },
    status: {
      delivered: 'Levererat',
      frozen: 'Inga uppdateringar',
      in_transit: 'Under transport',
      awaiting_pickup: 'Redo att hämtas',
      out_for_delivery: 'Ute för leverans',
      not_found: 'Hittades inte',
      failed_attempt: 'Misslyckat leveransförsök',
      exception: 'Problem',
      info_received: 'Registrerat',
      unknown: 'Okänt',
    },
  },
  bg: {
    default_title: 'Пратки',
    empty: 'Няма пратки за показване',
    no_entity: 'Сензорът на Parcel не е намерен. Добавете интеграцията Parcel или задайте „entity“.',
    unavailable: 'Parcel не е достъпен. Пратките ще се покажат след следващото успешно обновяване.',
    in_progress: 'активни',
    expected: 'Очаква се:',
    add: 'Добавяне на пратка',
    refresh: 'Опресняване',
    refresh_failed: 'Опресняването не бе успешно:',
    tracking_number: 'Номер за проследяване',
    carrier: 'Куриер',
    carrier_search: 'Търсене на куриер',
    description: 'Описание',
    push: 'Push потвърждение от Parcel',
    submit: 'Добавяне',
    cancel: 'Отказ',
    adding: 'Добавяне…',
    added: 'Пратката е добавена. Ще се покаже след следващото обновяване на Parcel.',
    unknown_carrier: 'Изберете куриер от списъка.',
    required: 'Номерът за проследяване, куриерът и описанието са задължителни.',
    limit: 'Parcel позволява 20 добавяния на ден.',
    no_events: 'Все още няма събития',
    copy: 'Копиране на номера за проследяване',
    today: 'пристигат днес',
    show_full: 'Покажи цялата карта',
    show_compact: 'Обратно към компактния изглед',
    editor: {
      entity: 'Сензор на Parcel',
      title: 'Заглавие',
      show_delivered: 'Показване на доставените пратки',
      show_add: 'Показване на бутона за добавяне',
      show_refresh: 'Показване на бутона за опресняване',
      max_events: 'Събития, показвани при разгъната пратка',
      language: 'Език',
      lang_auto: 'Автоматично',
    },
    status: {
      delivered: 'Доставена',
      frozen: 'Без актуализации',
      in_transit: 'В транзит',
      awaiting_pickup: 'Очаква получаване',
      out_for_delivery: 'В процес на доставка',
      not_found: 'Не е намерена',
      failed_attempt: 'Неуспешна доставка',
      exception: 'Проблем',
      info_received: 'Регистрирана',
      unknown: 'Неизвестно',
    },
  },
  ru: {
    default_title: 'Посылки',
    empty: 'Нет посылок для отображения',
    no_entity: 'Сенсор Parcel не найден. Добавьте интеграцию Parcel или укажите «entity».',
    unavailable: 'Parcel недоступен. Посылки появятся после следующего успешного обновления.',
    in_progress: 'активные',
    expected: 'Ожидается:',
    add: 'Добавить посылку',
    refresh: 'Обновить',
    refresh_failed: 'Не удалось обновить:',
    tracking_number: 'Трек-номер',
    carrier: 'Служба доставки',
    carrier_search: 'Поиск службы доставки',
    description: 'Описание',
    push: 'Push-подтверждение от Parcel',
    submit: 'Добавить',
    cancel: 'Отмена',
    adding: 'Добавление…',
    added: 'Посылка добавлена. Она появится после следующего обновления Parcel.',
    unknown_carrier: 'Выберите службу доставки из списка.',
    required: 'Трек-номер, служба доставки и описание обязательны.',
    limit: 'Parcel позволяет добавлять до 20 посылок в день.',
    no_events: 'Событий пока нет',
    copy: 'Скопировать трек-номер',
    today: 'прибудут сегодня',
    show_full: 'Показать полную карточку',
    show_compact: 'Вернуться к компактному виду',
    editor: {
      entity: 'Сенсор Parcel',
      title: 'Заголовок',
      show_delivered: 'Показывать доставленные посылки',
      show_add: 'Показывать кнопку добавления',
      show_refresh: 'Показывать кнопку обновления',
      max_events: 'Число событий в раскрытой посылке',
      language: 'Язык',
      lang_auto: 'Автоматически',
    },
    status: {
      delivered: 'Доставлена',
      frozen: 'Нет обновлений',
      in_transit: 'В пути',
      awaiting_pickup: 'Готова к выдаче',
      out_for_delivery: 'Передана курьеру',
      not_found: 'Не найдена',
      failed_attempt: 'Неудачная доставка',
      exception: 'Проблема',
      info_received: 'Зарегистрирована',
      unknown: 'Неизвестно',
    },
  },
  uk: {
    default_title: 'Посилки',
    empty: 'Немає посилок для показу',
    no_entity: 'Сенсор Parcel не знайдено. Додайте інтеграцію Parcel або вкажіть «entity».',
    unavailable: 'Parcel недоступний. Посилки з’являться після наступного успішного оновлення.',
    in_progress: 'активні',
    expected: 'Очікується:',
    add: 'Додати посилку',
    refresh: 'Оновити',
    refresh_failed: 'Не вдалося оновити:',
    tracking_number: 'Номер відстеження',
    carrier: 'Служба доставки',
    carrier_search: 'Пошук служби доставки',
    description: 'Опис',
    push: 'Push-підтвердження від Parcel',
    submit: 'Додати',
    cancel: 'Скасувати',
    adding: 'Додавання…',
    added: 'Посилку додано. Вона з’явиться після наступного оновлення Parcel.',
    unknown_carrier: 'Виберіть службу доставки зі списку.',
    required: 'Номер відстеження, служба доставки та опис обов’язкові.',
    limit: 'Parcel дозволяє додавати до 20 посилок на день.',
    no_events: 'Подій поки немає',
    copy: 'Копіювати номер відстеження',
    today: 'прибудуть сьогодні',
    show_full: 'Показати повну картку',
    show_compact: 'Повернутися до компактного вигляду',
    editor: {
      entity: 'Сенсор Parcel',
      title: 'Заголовок',
      show_delivered: 'Показувати доставлені посилки',
      show_add: 'Показувати кнопку додавання',
      show_refresh: 'Показувати кнопку оновлення',
      max_events: 'Кількість подій у розгорнутій посилці',
      language: 'Мова',
      lang_auto: 'Автоматично',
    },
    status: {
      delivered: 'Доставлено',
      frozen: 'Немає оновлень',
      in_transit: 'У дорозі',
      awaiting_pickup: 'Очікує отримання',
      out_for_delivery: 'Передано кур’єру',
      not_found: 'Не знайдено',
      failed_attempt: 'Невдала спроба доставки',
      exception: 'Проблема',
      info_received: 'Зареєстровано',
      unknown: 'Невідомо',
    },
  },
  hu: {
    default_title: 'Csomagok',
    empty: 'Nincs megjeleníthető csomag',
    no_entity: 'A Parcel érzékelő nem található. Adja hozzá a Parcel integrációt, vagy állítsa be az „entity” értéket.',
    unavailable: 'A Parcel nem érhető el. A csomagok a következő sikeres frissítés után jelennek meg.',
    in_progress: 'aktív',
    expected: 'Várható:',
    add: 'Csomag hozzáadása',
    refresh: 'Frissítés',
    refresh_failed: 'A frissítés sikertelen:',
    tracking_number: 'Követési szám',
    carrier: 'Futárszolgálat',
    carrier_search: 'Futárszolgálat keresése',
    description: 'Leírás',
    push: 'Parcel push-visszaigazolás',
    submit: 'Hozzáadás',
    cancel: 'Mégse',
    adding: 'Hozzáadás…',
    added: 'A csomag hozzáadva. A Parcel következő frissítése után jelenik meg.',
    unknown_carrier: 'Válasszon futárszolgálatot a listából.',
    required: 'A követési szám, a futárszolgálat és a leírás megadása kötelező.',
    limit: 'A Parcel naponta 20 hozzáadást enged.',
    no_events: 'Még nincsenek események',
    copy: 'Követési szám másolása',
    today: 'ma érkezik',
    show_full: 'Teljes kártya megjelenítése',
    show_compact: 'Vissza a kompakt nézethez',
    editor: {
      entity: 'Parcel érzékelő',
      title: 'Cím',
      show_delivered: 'Kézbesített csomagok megjelenítése',
      show_add: 'Hozzáadás gomb megjelenítése',
      show_refresh: 'Frissítés gomb megjelenítése',
      max_events: 'Megjelenített események kibontott csomagnál',
      language: 'Nyelv',
      lang_auto: 'Automatikus',
    },
    status: {
      delivered: 'Kézbesítve',
      frozen: 'Nincs frissítés',
      in_transit: 'Szállítás alatt',
      awaiting_pickup: 'Átvételre vár',
      out_for_delivery: 'Kiszállítás alatt',
      not_found: 'Nem található',
      failed_attempt: 'Sikertelen kézbesítés',
      exception: 'Probléma',
      info_received: 'Bejelentve',
      unknown: 'Ismeretlen',
    },
  },
  sk: {
    default_title: 'Zásielky',
    empty: 'Žiadne zásielky na zobrazenie',
    no_entity: 'Senzor Parcel sa nenašiel. Pridajte integráciu Parcel alebo nastavte „entity“.',
    unavailable: 'Parcel nie je dostupný. Zásielky sa zobrazia po ďalšej úspešnej aktualizácii.',
    in_progress: 'aktívne',
    expected: 'Očakávané doručenie:',
    add: 'Pridať zásielku',
    refresh: 'Obnoviť',
    refresh_failed: 'Obnovenie zlyhalo:',
    tracking_number: 'Číslo zásielky',
    carrier: 'Prepravca',
    carrier_search: 'Hľadať prepravcu',
    description: 'Popis',
    push: 'Push potvrdenie z Parcel',
    submit: 'Pridať',
    cancel: 'Zrušiť',
    adding: 'Pridáva sa…',
    added: 'Zásielka bola pridaná. Zobrazí sa po ďalšej aktualizácii Parcel.',
    unknown_carrier: 'Vyberte prepravcu zo zoznamu.',
    required: 'Číslo zásielky, prepravca a popis sú povinné.',
    limit: 'Parcel umožňuje 20 pridaní denne.',
    no_events: 'Zatiaľ žiadne udalosti',
    copy: 'Kopírovať číslo zásielky',
    today: 'dorazia dnes',
    show_full: 'Zobraziť celú kartu',
    show_compact: 'Späť na kompaktné zobrazenie',
    editor: {
      entity: 'Senzor Parcel',
      title: 'Názov',
      show_delivered: 'Zobraziť doručené zásielky',
      show_add: 'Zobraziť tlačidlo pridania',
      show_refresh: 'Zobraziť tlačidlo obnovenia',
      max_events: 'Udalosti zobrazené po rozbalení zásielky',
      language: 'Jazyk',
      lang_auto: 'Automaticky',
    },
    status: {
      delivered: 'Doručené',
      frozen: 'Bez aktualizácií',
      in_transit: 'Na ceste',
      awaiting_pickup: 'Na vyzdvihnutie',
      out_for_delivery: 'Doručuje sa',
      not_found: 'Nenájdené',
      failed_attempt: 'Neúspešné doručenie',
      exception: 'Problém',
      info_received: 'Zaregistrované',
      unknown: 'Neznáme',
    },
  },
  cs: {
    default_title: 'Zásilky',
    empty: 'Žádné zásilky k zobrazení',
    no_entity: 'Senzor Parcel nebyl nalezen. Přidejte integraci Parcel nebo nastavte „entity“.',
    unavailable: 'Parcel není dostupný. Zásilky se zobrazí po další úspěšné aktualizaci.',
    in_progress: 'aktivní',
    expected: 'Očekávané doručení:',
    add: 'Přidat zásilku',
    refresh: 'Obnovit',
    refresh_failed: 'Obnovení se nezdařilo:',
    tracking_number: 'Číslo zásilky',
    carrier: 'Dopravce',
    carrier_search: 'Hledat dopravce',
    description: 'Popis',
    push: 'Push potvrzení z Parcel',
    submit: 'Přidat',
    cancel: 'Zrušit',
    adding: 'Přidávání…',
    added: 'Zásilka byla přidána. Zobrazí se po další aktualizaci Parcel.',
    unknown_carrier: 'Vyberte dopravce ze seznamu.',
    required: 'Číslo zásilky, dopravce a popis jsou povinné.',
    limit: 'Parcel umožňuje 20 přidání denně.',
    no_events: 'Zatím žádné události',
    copy: 'Kopírovat číslo zásilky',
    today: 'dorazí dnes',
    show_full: 'Zobrazit celou kartu',
    show_compact: 'Zpět na kompaktní zobrazení',
    editor: {
      entity: 'Senzor Parcel',
      title: 'Název',
      show_delivered: 'Zobrazit doručené zásilky',
      show_add: 'Zobrazit tlačítko přidání',
      show_refresh: 'Zobrazit tlačítko obnovení',
      max_events: 'Události zobrazené po rozbalení zásilky',
      language: 'Jazyk',
      lang_auto: 'Automaticky',
    },
    status: {
      delivered: 'Doručeno',
      frozen: 'Bez aktualizací',
      in_transit: 'Na cestě',
      awaiting_pickup: 'K vyzvednutí',
      out_for_delivery: 'Doručuje se',
      not_found: 'Nenalezeno',
      failed_attempt: 'Neúspěšné doručení',
      exception: 'Problém',
      info_received: 'Zaregistrováno',
      unknown: 'Neznámé',
    },
  },
  sl: {
    default_title: 'Pošiljke',
    empty: 'Ni pošiljk za prikaz',
    no_entity: 'Senzorja Parcel ni mogoče najti. Dodajte integracijo Parcel ali nastavite »entity«.',
    unavailable: 'Parcel ni na voljo. Pošiljke bodo prikazane po naslednji uspešni posodobitvi.',
    in_progress: 'v teku',
    expected: 'Pričakovano:',
    add: 'Dodaj pošiljko',
    refresh: 'Osveži',
    refresh_failed: 'Osvežitev ni uspela:',
    tracking_number: 'Številka za sledenje',
    carrier: 'Prevoznik',
    carrier_search: 'Iskanje prevoznika',
    description: 'Opis',
    push: 'Potrditev push iz Parcel',
    submit: 'Dodaj',
    cancel: 'Prekliči',
    adding: 'Dodajanje…',
    added: 'Pošiljka je dodana. Prikazana bo po naslednji posodobitvi Parcel.',
    unknown_carrier: 'Izberite prevoznika s seznama.',
    required: 'Številka za sledenje, prevoznik in opis so obvezni.',
    limit: 'Parcel dovoljuje 20 dodajanj na dan.',
    no_events: 'Še ni dogodkov',
    copy: 'Kopiraj številko za sledenje',
    today: 'prispejo danes',
    show_full: 'Prikaži celotno kartico',
    show_compact: 'Nazaj na kompaktni pogled',
    editor: {
      entity: 'Senzor Parcel',
      title: 'Naslov',
      show_delivered: 'Prikaži dostavljene pošiljke',
      show_add: 'Prikaži gumb za dodajanje',
      show_refresh: 'Prikaži gumb za osvežitev',
      max_events: 'Dogodki, prikazani ob razširjeni pošiljki',
      language: 'Jezik',
      lang_auto: 'Samodejno',
    },
    status: {
      delivered: 'Dostavljeno',
      frozen: 'Brez posodobitev',
      in_transit: 'Na poti',
      awaiting_pickup: 'Čaka na prevzem',
      out_for_delivery: 'V dostavi',
      not_found: 'Ni najdeno',
      failed_attempt: 'Neuspešna dostava',
      exception: 'Težava',
      info_received: 'Prijavljeno',
      unknown: 'Neznano',
    },
  },
  lv: {
    default_title: 'Sūtījumi',
    empty: 'Nav sūtījumu, ko parādīt',
    no_entity: 'Parcel sensors nav atrasts. Pievienojiet Parcel integrāciju vai iestatiet „entity”.',
    unavailable: 'Parcel nav pieejams. Sūtījumi parādīsies pēc nākamās veiksmīgās atjaunināšanas.',
    in_progress: 'aktīvi',
    expected: 'Paredzams:',
    add: 'Pievienot sūtījumu',
    refresh: 'Atsvaidzināt',
    refresh_failed: 'Atsvaidzināšana neizdevās:',
    tracking_number: 'Izsekošanas numurs',
    carrier: 'Pārvadātājs',
    carrier_search: 'Meklēt pārvadātāju',
    description: 'Apraksts',
    push: 'Parcel push apstiprinājums',
    submit: 'Pievienot',
    cancel: 'Atcelt',
    adding: 'Pievieno…',
    added: 'Sūtījums pievienots. Tas parādīsies pēc nākamās Parcel atjaunināšanas.',
    unknown_carrier: 'Izvēlieties pārvadātāju no saraksta.',
    required: 'Izsekošanas numurs, pārvadātājs un apraksts ir obligāti.',
    limit: 'Parcel atļauj 20 pievienošanas dienā.',
    no_events: 'Vēl nav notikumu',
    copy: 'Kopēt izsekošanas numuru',
    today: 'pienāks šodien',
    show_full: 'Rādīt pilno karti',
    show_compact: 'Atpakaļ uz kompakto skatu',
    editor: {
      entity: 'Parcel sensors',
      title: 'Virsraksts',
      show_delivered: 'Rādīt piegādātos sūtījumus',
      show_add: 'Rādīt pievienošanas pogu',
      show_refresh: 'Rādīt atsvaidzināšanas pogu',
      max_events: 'Notikumi, kas redzami izvērstam sūtījumam',
      language: 'Valoda',
      lang_auto: 'Automātiski',
    },
    status: {
      delivered: 'Piegādāts',
      frozen: 'Nav atjauninājumu',
      in_transit: 'Ceļā',
      awaiting_pickup: 'Gaida izņemšanu',
      out_for_delivery: 'Tiek piegādāts',
      not_found: 'Nav atrasts',
      failed_attempt: 'Neveiksmīga piegāde',
      exception: 'Problēma',
      info_received: 'Reģistrēts',
      unknown: 'Nezināms',
    },
  },
  el: {
    default_title: 'Δέματα',
    empty: 'Δεν υπάρχουν δέματα για εμφάνιση',
    no_entity: 'Δεν βρέθηκε ο αισθητήρας Parcel. Προσθέστε την ενσωμάτωση Parcel ή ορίστε το «entity».',
    unavailable: 'Το Parcel δεν είναι διαθέσιμο. Τα δέματα θα εμφανιστούν μετά την επόμενη επιτυχή ενημέρωση.',
    in_progress: 'ενεργά',
    expected: 'Αναμένεται:',
    add: 'Προσθήκη δέματος',
    refresh: 'Ανανέωση',
    refresh_failed: 'Η ανανέωση απέτυχε:',
    tracking_number: 'Αριθμός αποστολής',
    carrier: 'Μεταφορέας',
    carrier_search: 'Αναζήτηση μεταφορέα',
    description: 'Περιγραφή',
    push: 'Επιβεβαίωση push από το Parcel',
    submit: 'Προσθήκη',
    cancel: 'Ακύρωση',
    adding: 'Προσθήκη…',
    added: 'Το δέμα προστέθηκε. Θα εμφανιστεί μετά την επόμενη ενημέρωση του Parcel.',
    unknown_carrier: 'Επιλέξτε μεταφορέα από τη λίστα.',
    required: 'Ο αριθμός αποστολής, ο μεταφορέας και η περιγραφή είναι υποχρεωτικά.',
    limit: 'Το Parcel επιτρέπει 20 προσθήκες την ημέρα.',
    no_events: 'Δεν υπάρχουν συμβάντα ακόμη',
    copy: 'Αντιγραφή αριθμού αποστολής',
    today: 'φτάνουν σήμερα',
    show_full: 'Εμφάνιση πλήρους κάρτας',
    show_compact: 'Επιστροφή στη συμπαγή προβολή',
    editor: {
      entity: 'Αισθητήρας Parcel',
      title: 'Τίτλος',
      show_delivered: 'Εμφάνιση παραδομένων δεμάτων',
      show_add: 'Εμφάνιση κουμπιού προσθήκης',
      show_refresh: 'Εμφάνιση κουμπιού ανανέωσης',
      max_events: 'Συμβάντα που εμφανίζονται σε ανεπτυγμένο δέμα',
      language: 'Γλώσσα',
      lang_auto: 'Αυτόματα',
    },
    status: {
      delivered: 'Παραδόθηκε',
      frozen: 'Χωρίς ενημερώσεις',
      in_transit: 'Σε μεταφορά',
      awaiting_pickup: 'Προς παραλαβή',
      out_for_delivery: 'Σε διανομή',
      not_found: 'Δεν βρέθηκε',
      failed_attempt: 'Αποτυχία παράδοσης',
      exception: 'Πρόβλημα',
      info_received: 'Καταχωρίστηκε',
      unknown: 'Άγνωστο',
    },
  },
};

// Single source of the config defaults, shared by the card (setConfig) and the editor.
var PARCEL_DEFAULTS = { show_delivered: true, show_add: true, show_refresh: true, max_events: 5 };

var PARCEL_STATUS_STYLE = {
  delivered: { icon: 'mdi:package-variant-closed-check', color: 'var(--success-color, #43a047)' },
  frozen: { icon: 'mdi:snowflake', color: 'var(--disabled-text-color, #9e9e9e)' },
  in_transit: { icon: 'mdi:truck-fast-outline', color: 'var(--info-color, #039be5)' },
  awaiting_pickup: { icon: 'mdi:store-marker-outline', color: 'var(--warning-color, #ffa600)' },
  out_for_delivery: { icon: 'mdi:truck-delivery-outline', color: 'var(--primary-color, #03a9f4)' },
  not_found: { icon: 'mdi:help-circle-outline', color: 'var(--disabled-text-color, #9e9e9e)' },
  failed_attempt: { icon: 'mdi:alert-circle-outline', color: 'var(--error-color, #db4437)' },
  exception: { icon: 'mdi:alert-outline', color: 'var(--error-color, #db4437)' },
  info_received: { icon: 'mdi:package-variant', color: 'var(--secondary-text-color, #727272)' },
  unknown: { icon: 'mdi:package-variant', color: 'var(--secondary-text-color, #727272)' },
};

function parcelEsc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

// Service errors carry a translation key (the `exceptions` of the integration's translations): show them in the
// Home Assistant language of the user, else the message the backend already translated in the server language.
function parcelErrorText(hass, err) {
  var fallback = String(err?.message || err || '').replace(/^Validation error: /, '');
  var key = err?.translation_key;
  if (!key || err.translation_domain !== 'parcel' || typeof hass?.loadBackendTranslation !== 'function') {
    return Promise.resolve(fallback);
  }
  return Promise.resolve(hass.loadBackendTranslation('exceptions', 'parcel'))
    .then((localize) => (localize || hass.localize)(`component.parcel.exceptions.${key}.message`, err.translation_placeholders || {}) || fallback)
    .catch(() => fallback);
}

// Adding a delivery is an admin-only service: hide the button from other users (true while hass.user is unknown).
function parcelIsAdmin(hass) {
  return hass?.user?.is_admin !== false;
}

// Parcel sends placeholders such as "--//--" when the carrier gave no date.
function parcelDate(s) {
  return /\d/.test(String(s || '')) ? String(s) : '';
}

// Parse a Parcel expected date into milliseconds (NaN when unparseable). "YYYY-MM-DD HH:MM:SS"
// needs the "T" for Safari/WebKit, and a date alone ("YYYY-MM-DD") is read by Date.parse as UTC
// midnight, i.e. the day before west of UTC: give it a local midnight instead.
function parcelParseDate(raw) {
  var s = String(raw || '').trim().replace(' ', 'T');
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) s += 'T00:00:00';
  return Date.parse(s);
}

// The card's `language` option wins over the Home Assistant language. A full code the card knows
// (sr-Latn) is kept, otherwise its part before the dash (fr-FR gives fr, pt-BR gives the European
// Portuguese pt), otherwise English.
function parcelLang(hass, config) {
  var lang = String(config?.language || (hass && (hass.locale?.language || hass.language)) || navigator.language || 'en');
  if (ParcelI18n[lang]) return lang;
  lang = lang.split('-')[0];
  return ParcelI18n[lang] ? lang : 'en';
}

// Locale for Intl / toLocale*: the full code (fr-CA, pt-BR) of the card's `language` option, else of
// Home Assistant, when its base is the card's resolved language, otherwise the resolved language.
// Plain "pt" is European Portuguese in Home Assistant but Brazilian in Intl, so it becomes pt-PT.
// The sr / sr-Latn scripts never mix.
function parcelLocale(hass, config) {
  var lang = parcelLang(hass, config);
  var full = String(config?.language || (hass && (hass.locale?.language || hass.language)) || '');
  var sameScript = /-Latn\b/i.test(full) === /-Latn\b/i.test(lang);
  var locale = full && full.split('-')[0] === lang.split('-')[0] && sameScript ? full : lang;
  return locale === 'pt' ? 'pt-PT' : locale;
}

// ── parcel-card ───────────────────────────────────────────────────────────────
class ParcelCard extends HTMLElement {
  static getConfigElement() {
    return document.createElement('parcel-card-editor');
  }

  static getStubConfig(hass) {
    var entity = ParcelCard._findEntity(hass);
    return entity ? { entity: entity } : {};
  }

  static _findEntity(hass) {
    if (!hass?.states) return null;
    var ids = Object.keys(hass.states);
    for (var i = 0; i < ids.length; i++) {
      var st = hass.states[ids[i]];
      if (ids[i].indexOf('sensor.') === 0 && st.attributes && Array.isArray(st.attributes.deliveries) && st.attributes.config_entry_id) {
        return ids[i];
      }
    }
    // An unavailable sensor (failed update) has no attributes: fall back to the entity registry.
    var entities = hass.entities || {};
    var reg = Object.keys(entities);
    for (var j = 0; j < reg.length; j++) {
      if (reg[j].indexOf('sensor.') === 0 && entities[reg[j]].platform === 'parcel' && hass.states[reg[j]]) return reg[j];
    }
    return null;
  }

  setConfig(config) {
    this._config = Object.assign({}, PARCEL_DEFAULTS, config || {});
    this._expanded = this._expanded || {};
    // Read the sensor now: with hass already set (visual editor, dashboard change), waiting for the
    // next hass update would show "sensor not found" meanwhile.
    var entityId = this._hass ? this._entityId() : null;
    this._lastState = entityId ? this._hass.states[entityId] || null : null;
    if (this._hass) this._render();
  }

  set hass(hass) {
    var first = !this._hass;
    this._hass = hass;
    var entityId = this._entityId();
    var st = entityId ? hass.states[entityId] : null;
    // Only redraw when the sensor changed, so typing in the form is never interrupted.
    if (first || st !== this._lastState) {
      this._lastState = st;
      this._render();
    }
  }

  connectedCallback() {
    this._onOutside = this._onOutside || ((ev) => {
      var form = this._root && this._root.querySelector('.form');
      var formOpen = !!(form && !form.hidden);
      var anyExpanded = Object.keys(this._expanded || {}).some((k) => this._expanded[k]);
      if (!formOpen && !anyExpanded) return;
      var path = ev.composedPath ? ev.composedPath() : [];
      if (path.indexOf(this) !== -1) return;
      // Like the other cards: a click outside collapses the expanded deliveries and the add form.
      if (formOpen) form.hidden = true;
      if (anyExpanded) {
        this._expanded = {};
        this._render();
      }
    });
    document.addEventListener('click', this._onOutside, true);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._onOutside, true);
  }

  getCardSize() {
    var st = this._lastState;
    var deliveries = st?.attributes && Array.isArray(st.attributes.deliveries) ? st.attributes.deliveries : [];
    // Count only the rows actually shown.
    if (this._config && !this._config.show_delivered) deliveries = deliveries.filter((d) => d.status_code !== 0);
    return 2 + deliveries.length;
  }

  getGridOptions() {
    // 6 columns of a phone section (~160 px) cannot hold a 4-letter title, the pill and the two buttons.
    return { columns: 12, min_columns: 8, rows: 'auto' };
  }

  // Without a configured entity, the Parcel sensor found is kept: scanning all the states on every hass update
  // (several times a second) is wasted work. It is looked up again only when it disappears.
  _entityId() {
    if (this._config?.entity) return this._config.entity;
    if (!this._autoEntity || !this._hass?.states[this._autoEntity]) this._autoEntity = ParcelCard._findEntity(this._hass);
    return this._autoEntity;
  }

  // Parcel account of the sensor, sent with the actions so several accounts can be used. An unavailable
  // sensor has no attributes: the account then comes from the entity and device registries.
  _entryId() {
    var st = this._lastState;
    if (st?.attributes?.config_entry_id) return st.attributes.config_entry_id;
    var entityId = this._entityId();
    var ent = entityId ? this._hass?.entities?.[entityId] : null;
    var dev = ent?.device_id ? this._hass?.devices?.[ent.device_id] : null;
    return (dev && Array.isArray(dev.config_entries) && dev.config_entries[0]) || null;
  }

  _t() {
    return ParcelI18n[parcelLang(this._hass, this._config)];
  }

  _ensureShell() {
    if (this._root) return;
    this._root = this.attachShadow({ mode: 'open' });
    this._root.innerHTML =
      '<style>' + ParcelCard._styles() + '</style>' +
      '<ha-card><div class="header"></div><div class="form" hidden></div><div class="list"></div></ha-card>';
    var list = this._root.querySelector('.list');
    list.addEventListener('click', this._onListClick.bind(this));
    list.addEventListener('keydown', this._onListKeydown.bind(this));
  }

  _render() {
    if (!this._config || !this._hass) return;
    this._ensureShell();
    var t = this._t();
    var st = this._lastState;
    var header = this._root.querySelector('.header');
    var list = this._root.querySelector('.list');
    var title = this._config.title || t.default_title;

    this._renderHeader(header, t, st, title);
    if (!st) {
      list.innerHTML = `<div class="empty">${parcelEsc(t.no_entity)}</div>`;
      return;
    }

    // A failed update (rate limit, Parcel down) leaves the sensor unavailable, without its attributes:
    // say so instead of showing "unavailable active" and an empty list.
    var unavailable = st.state === 'unavailable' || st.state === 'unknown';
    var deliveries = (st.attributes?.deliveries || []).slice();
    if (!this._config.show_delivered) {
      deliveries = deliveries.filter((d) => d.status_code !== 0);
    }
    // Active first, then by expected date, parsed like _formatExpected does (parcelParseDate).
    var expectedTs = (d) => d.timestamp_expected || parcelParseDate(d.date_expected) / 1000 || Infinity;
    deliveries.sort((a, b) => {
      var da = a.status_code === 0 ? 1 : 0, db = b.status_code === 0 ? 1 : 0;
      if (da !== db) return da - db;
      return expectedTs(a) - expectedTs(b);
    });

    if (unavailable) {
      list.innerHTML = `<div class="empty">${parcelEsc(t.unavailable)}</div>`;
      return;
    }
    if (this._compact()) {
      list.innerHTML = this._renderSummary(st.attributes?.deliveries || [], t);
      return;
    }
    if (!deliveries.length) {
      list.innerHTML = `<div class="empty">${parcelEsc(t.empty)}</div>`;
      return;
    }
    // innerHTML replaces the focused row: put the keyboard focus back on the same row or tracking number.
    var focus = this._focusSelector();
    list.innerHTML = deliveries.map((d) => this._renderDelivery(d, t)).join('');
    var again = focus && list.querySelector ? list.querySelector(focus) : null;
    // Without preventScroll the browser scrolls the dashboard to the row on every sensor update.
    if (again) again.focus({ preventScroll: true });
  }

  // The header is built once and then updated in place: rebuilding it with innerHTML on every sensor update or
  // refresh dropped the keyboard focus of its buttons. It is rebuilt only when its buttons or language change.
  _renderHeader(header, t, st, title) {
    var c = this._config;
    var compact = this._compact();
    var canAdd = c.show_add && parcelIsAdmin(this._hass);
    var key = [!!st, c.show_refresh, canAdd, parcelLang(this._hass, c), compact].join('|');
    if (this._headerKey !== key || !header.querySelector('.title')) {
      this._headerKey = key;
      header.innerHTML =
        '<div class="title">' + this._iconHtml() + '<div class="titles"><div class="name"></div>' +
        // The refresh error survives re-renders (hass updates) until the next refresh attempt.
        '<div class="sub error" hidden></div></div></div>' +
        (st && !compact
          // Status pill on the right of the header (card convention), not a subtitle under the title.
          ? '<span class="status" hidden><span class="status-text"></span></span>' +
            '<div class="buttons">' +
            (c.show_refresh
              ? `<ha-icon-button class="refresh-btn" label="${parcelEsc(t.refresh)}" title="${parcelEsc(t.refresh)}"><ha-icon icon="mdi:refresh"></ha-icon></ha-icon-button>`
              : '') +
            (canAdd
              ? `<ha-icon-button class="add-btn" label="${parcelEsc(t.add)}" title="${parcelEsc(t.add)}"><ha-icon icon="mdi:plus"></ha-icon></ha-icon-button>`
              : '') +
            '</div>'
          : '') +
        this._detailButton(t);
      var addBtn = header.querySelector('.add-btn');
      if (addBtn) addBtn.addEventListener('click', this._toggleForm.bind(this));
      var refreshBtn = header.querySelector('.refresh-btn');
      if (refreshBtn) refreshBtn.addEventListener('click', this._refresh.bind(this));
      var detailBtn = header.querySelector('.detail');
      if (detailBtn) detailBtn.addEventListener('click', this._toggleDetail.bind(this));
    }
    var name = header.querySelector('.name');
    if (name) name.textContent = title;
    var sub = header.querySelector('.sub');
    if (sub) {
      sub.hidden = !(st && this._refreshError);
      sub.textContent = (st && this._refreshError) || '';
    }
    var pill = header.querySelector('.status');
    if (pill) {
      // An unavailable sensor has no count to show: the list says it is unavailable.
      var unavailable = st.state === 'unavailable' || st.state === 'unknown';
      var count = unavailable ? '' : `${st.state} ${t.in_progress}`;
      pill.hidden = unavailable;
      // Narrow cards only show the pill's dot: the count stays in its tooltip and for screen readers.
      pill.title = count;
      var text = header.querySelector('.status-text');
      if (text) text.textContent = count;
    }
    var refresh = header.querySelector('.refresh-btn');
    if (refresh) refresh.classList.toggle('spinning', !!this._refreshing);
  }

  // Overridden by the mini card: compact view, and its detail button at the top right.
  _compact() {
    return false;
  }

  _detailButton() {
    return '';
  }

  // Selector of the delivery description or tracking number that has the focus, to find it again after a re-render.
  _focusSelector() {
    var el = this._root?.activeElement;
    if (!el || !el.closest) return null;
    var item = el.closest('.delivery');
    if (!item) return null;
    var base = `.delivery[data-id="${String(item.getAttribute('data-id')).replace(/["\\]/g, '\\$&')}"]`;
    if (el.closest('[data-copy]')) return `${base} .tracking`;
    return el.closest('.desc') ? `${base} .desc` : null;
  }

  _iconHtml() {
    return '<div class="logo" aria-hidden="true"><ha-icon icon="mdi:package-variant-closed"></ha-icon></div>';
  }

  _renderDelivery(d, t) {
    var key = d.status || 'unknown';
    var style = PARCEL_STATUS_STYLE[key] || PARCEL_STATUS_STYLE.unknown;
    var id = `${d.carrier_code}:${d.tracking_number}`;
    var expanded = !!this._expanded[id];
    var events = d.events || [];
    var last = events[0];
    var expected = this._formatExpected(d);

    var html =
      '<div class="delivery' + (d.status_code === 0 ? ' done' : '') + '" data-id="' + parcelEsc(id) + '">' +
      // Only the description is the keyboard toggle: a role="button" row would hide the copy button
      // inside it from screen readers (nested interactive). A click anywhere on the row still toggles it.
      '<div class="row">' +
      '<ha-icon class="status-icon" icon="' + style.icon + '" style="color:' + style.color + '"></ha-icon>' +
      '<div class="main">' +
      '<div class="line1"><span class="desc" role="button" tabindex="0" aria-expanded="' + expanded + '">' + parcelEsc(d.description || d.tracking_number) + '</span>' +
      '<span class="chip" style="--c:' + style.color + '">' + parcelEsc(t.status[key] || key) + '</span></div>' +
      '<div class="line2">' + parcelEsc(d.carrier_name || d.carrier_code) + ' · ' +
      '<span class="tracking" role="button" tabindex="0" data-copy="' + parcelEsc(d.tracking_number) + '" title="' + parcelEsc(t.copy) + '">' + parcelEsc(d.tracking_number) + '</span></div>' +
      (last
        ? '<div class="line3">' + parcelEsc(last.event) + (last.location ? ` · ${parcelEsc(last.location)}` : '') +
          (parcelDate(last.date) ? ` <span class="date">${parcelEsc(parcelDate(last.date))}</span>` : '') + '</div>'
        : '') +
      (expected && d.status_code !== 0 ? `<div class="expected">${parcelEsc(t.expected)} ${parcelEsc(expected)}</div>` : '') +
      '</div>' +
      '<ha-icon class="chevron' + (expanded ? '' : ' closed') + '" icon="mdi:chevron-down"></ha-icon>' +
      '</div>';

    if (expanded) {
      var shown = events.slice(0, Math.max(1, this._config.max_events));
      html += '<ul class="events">' +
        (shown.length
          ? shown.map((e) => '<li>' + (parcelDate(e.date) ? `<span class="date">${parcelEsc(parcelDate(e.date))}</span> ` : '') + parcelEsc(e.event) +
                (e.location ? ` · ${parcelEsc(e.location)}` : '') +
                (e.additional ? `<div class="additional">${parcelEsc(e.additional)}</div>` : '') + '</li>').join('')
          : `<li>${parcelEsc(t.no_events)}</li>`) +
        '</ul>';
    }
    return `${html}</div>`;
  }

  _formatExpected(d) {
    var locale = parcelLocale(this._hass, this._config);
    var opts = { weekday: 'short', day: 'numeric', month: 'short' };
    var fmt = (ts, raw) => {
      if (ts) return new Date(ts * 1000).toLocaleString(locale, Object.assign({ hour: '2-digit', minute: '2-digit' }, opts));
      if (!raw) return '';
      var parsed = parcelParseDate(raw);
      if (Number.isNaN(parsed)) return raw;
      var hasTime = /\d{2}:\d{2}/.test(raw) && !/(^|[ T])00:00(:00)?$/.test(String(raw).trim());
      return new Date(parsed).toLocaleString(locale, hasTime ? Object.assign({ hour: '2-digit', minute: '2-digit' }, opts) : opts);
    };
    var start = fmt(d.timestamp_expected, d.date_expected);
    var end = fmt(d.timestamp_expected_end, d.date_expected_end);
    return start && end && end !== start ? `${start} – ${end}` : start;
  }

  _onListClick(ev) {
    var copy = ev.target.closest('[data-copy]');
    if (copy) {
      ev.stopPropagation();
      this._copy(copy);
      return;
    }
    var item = ev.target.closest('.delivery');
    if (!item) return;
    var id = item.getAttribute('data-id');
    this._expanded[id] = !this._expanded[id];
    this._render();
  }

  // Enter and Space act like a click on a description or a tracking number (both are role="button").
  _onListKeydown(ev) {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    if (!ev.target.closest('[data-copy]') && !ev.target.closest('.desc')) return;
    ev.preventDefault();
    this._onListClick(ev);
  }

  // The copy can be refused (iframe, companion app permission, plain http): caught, and a short
  // check mark confirms a successful copy.
  _copy(el) {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(el.getAttribute('data-copy')).then(() => {
      el.classList.add('copied');
      setTimeout(() => el.classList.remove('copied'), 1000);
    }).catch(() => {});
  }

  _refresh() {
    if (this._refreshing) return;
    var data = {};
    var entryId = this._entryId();
    if (entryId) data.config_entry_id = entryId;
    this._refreshing = true;
    this._refreshError = null;
    this._render();
    var t = this._t();
    this._hass.callService('parcel', 'refresh', data).catch((err) => parcelErrorText(this._hass, err).then((text) => {
      // Kept in state and rendered under the title: a tooltip on the button
      // would be wiped by the next re-render. A translated error already says the update failed.
      this._refreshError = err?.translation_key ? text : `${t.refresh_failed} ${text}`;
    })).finally(() => {
      this._refreshing = false;
      this._render();
    });
  }

  // ── add form ────────────────────────────────────────────────────────────────
  _toggleForm() {
    var form = this._root.querySelector('.form');
    if (!form.hidden) {
      form.hidden = true;
      return;
    }
    if (!form.firstChild) this._buildForm(form);
    form.hidden = false;
    this._loadCarriers();
    form.querySelector('[name=tracking]').focus();
  }

  _buildForm(form) {
    var t = this._t();
    form.innerHTML =
      '<label>' + parcelEsc(t.tracking_number) + '<input name="tracking" autocomplete="off"></label>' +
      '<label>' + parcelEsc(t.carrier) + '<input name="carrier" list="parcel-carriers" placeholder="' + parcelEsc(t.carrier_search) + '" autocomplete="off"></label>' +
      '<datalist id="parcel-carriers"></datalist>' +
      '<label>' + parcelEsc(t.description) + '<input name="description" autocomplete="off"></label>' +
      '<label class="check"><input type="checkbox" name="push"> ' + parcelEsc(t.push) + '</label>' +
      '<div class="msg"></div>' +
      '<div class="hint">' + parcelEsc(t.limit) + '</div>' +
      '<div class="actions"><button type="button" class="cancel">' + parcelEsc(t.cancel) + '</button>' +
      '<button type="button" class="submit">' + parcelEsc(t.submit) + '</button></div>';
    form.querySelector('.cancel').addEventListener('click', this._toggleForm.bind(this));
    form.querySelector('.submit').addEventListener('click', this._submit.bind(this));
    form.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter' && ev.target.tagName === 'INPUT' && ev.target.type !== 'checkbox') this._submit();
    }.bind(this));
  }

  _loadCarriers() {
    if (this._carriers || this._loadingCarriers) return;
    this._loadingCarriers = true;
    var msg = { type: 'parcel/carriers' };
    var entryId = this._entryId();
    if (entryId) msg.config_entry_id = entryId;
    this._hass.callWS(msg).then((res) => {
      var carriers = res.carriers || {};
      // An empty list means the backend couldn't load the carriers yet: don't cache it, the next opening asks again.
      if (!Object.keys(carriers).length) return;
      this._carriers = carriers;
      var codes = Object.keys(this._carriers).sort((a, b) => this._carriers[a].localeCompare(this._carriers[b]));
      this._root.querySelector('#parcel-carriers').innerHTML = codes.map((c) => `<option value="${parcelEsc(this._carriers[c])}">${parcelEsc(c)}</option>`).join('');
    }).catch(() => {
      this._carriers = null;
    }).finally(() => {
      this._loadingCarriers = false;
    });
  }

  _carrierCode(value) {
    var v = String(value || '').trim();
    if (!v) return null;
    var carriers = this._carriers || {};
    if (carriers[v]) return v;
    var lower = v.toLowerCase();
    var codes = Object.keys(carriers);
    for (var i = 0; i < codes.length; i++) {
      if (carriers[codes[i]].toLowerCase() === lower || codes[i].toLowerCase() === lower) return codes[i];
    }
    // Carriers list unavailable: trust what was typed as a code.
    return codes.length ? null : v;
  }

  _submit() {
    var t = this._t();
    var form = this._root.querySelector('.form');
    var msgEl = form.querySelector('.msg');
    var btn = form.querySelector('.submit');
    if (btn.disabled) return;
    var tracking = form.querySelector('[name=tracking]').value.trim();
    var carrierInput = form.querySelector('[name=carrier]').value;
    var description = form.querySelector('[name=description]').value.trim();
    var push = form.querySelector('[name=push]').checked;

    msgEl.className = 'msg error';
    if (!tracking || !carrierInput.trim() || !description) {
      msgEl.textContent = t.required;
      return;
    }
    var code = this._carrierCode(carrierInput);
    if (!code) {
      msgEl.textContent = t.unknown_carrier;
      return;
    }

    var data = { tracking_number: tracking, carrier_code: code, description: description, send_push_confirmation: push };
    var entryId = this._entryId();
    if (entryId) data.config_entry_id = entryId;

    btn.disabled = true;
    btn.textContent = t.adding;
    msgEl.textContent = '';
    this._hass.callService('parcel', 'add_delivery', data).then(() => {
      msgEl.className = 'msg ok';
      msgEl.textContent = t.added;
      form.querySelector('[name=tracking]').value = '';
      form.querySelector('[name=carrier]').value = '';
      form.querySelector('[name=description]').value = '';
    }).catch((err) => parcelErrorText(this._hass, err).then((text) => {
      msgEl.className = 'msg error';
      msgEl.textContent = text;
    })).finally(() => {
      btn.disabled = false;
      btn.textContent = t.submit;
    });
  }

  static _styles() {
    return [
      ':host { display: block; }',
      // The container query needs size containment, which gives ha-card no intrinsic width: in an auto-sized parent
      // (inline-block, grid `auto` column, layout-card) the card fell to a few pixels. This empty, 0 px high line
      // gives the host a preferred width of 320 px (max-content) but no minimum (min-content 0), so a `1fr 1fr` grid
      // can still shrink it, even with the card wrapped in a div. contain-intrinsic-inline-size gave both: the card
      // then refused to shrink and overflowed such a grid.
      ':host::before { content: ""; display: grid; grid-template-columns: minmax(0, 320px); height: 0; }',
      'ha-card { padding: 0 0 8px; overflow: hidden; container-type: inline-size; }',
      '.header { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 8px 8px 12px; min-height: 36px; }',
      // Narrow header: the title takes what is left (flex-basis 0, so it does not take the pill's room) and keeps a
      // few letters; the pill shrinks only when it really lacks room; the buttons never do.
      '.title { flex: 1 1 0; min-width: calc(5ch + 50px); font-size: 16px; display: flex; align-items: center; gap: 10px; }',
      '.logo { width: 40px; height: 40px; flex: none; border-radius: 50%; display: grid; place-items: center;' +
        ' color: ' + PARCEL_ACCENT + '; background: color-mix(in srgb, ' + PARCEL_ACCENT + ' 16%, transparent); }',
      '.logo ha-icon { --mdc-icon-size: 24px; }',
      // 5ch of the 16 px title font is the width of four letters and the ellipsis ("Deli…"). The title block has the
      // same minimum plus the logo's 40 px and gap: a smaller one let the title slide under the pill.
      '.titles { flex: 1 1 0; min-width: 5ch; overflow: hidden; }',
      '.name { font-size: 16px; font-weight: 500; line-height: 1.25; color: var(--primary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.sub { font-size: 12px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.sub.error { color: color-mix(in srgb, var(--error-color, #db4437) 50%, var(--primary-text-color)); }',
      '.buttons { display: flex; align-items: center; flex: none; margin-left: -6px; }',
      '.buttons ha-icon-button { flex: none; }',
      // State colors stay on the backgrounds; texts are mixed with the text color to stay readable (WCAG 4.5:1).
      '.status { flex: 0 1 auto; min-width: 0; max-width: 50%; display: flex; align-items: center; overflow: hidden; font-size: 12px; font-weight: 500; line-height: 1; white-space: nowrap; border-radius: 12px; padding: 5px 10px;' +
        ' color: color-mix(in srgb, var(--primary-color) 50%, var(--primary-text-color)); background: color-mix(in srgb, var(--primary-color) 15%, transparent); }',
      '.status[hidden] { display: none; }',
      '.status-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; }',
      // Narrow card (8-9 columns of a phone section, up to a 12-column 320 px phone section): the logo goes and the
      // pill and the buttons get a little closer, so the pill keeps its whole label next to a 4-letter title.
      '@container (max-width: 320px) { .header { gap: 4px; } .title { min-width: 5ch; } .logo { display: none; } .buttons { margin-left: -4px; } .status { padding: 5px 8px; } }',
      // Narrower (the 8-column minimum on a small phone, ~210-240 px): the pill keeps only a colored dot.
      '@container (max-width: 240px) { .status { padding: 5px; } .status::before { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--primary-color); }' +
        ' .status-text { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; } }',
      '.refresh-btn.spinning ha-icon { animation: parcel-spin 1s linear infinite; }',
      '@keyframes parcel-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
      '.empty { padding: 12px 16px; color: var(--secondary-text-color); }',
      '.delivery { padding: 6px 12px; cursor: pointer; border-top: 1px solid var(--divider-color, rgba(0,0,0,.12)); }',
      '.delivery:first-child { border-top: none; }',
      '.delivery:hover { background: color-mix(in srgb, var(--primary-text-color) 4%, transparent); }',
      // A delivered row is quieter through its title color only: fading the whole row made its texts unreadable.
      '.delivery.done .desc { color: var(--secondary-text-color); font-weight: 400; }',
      '.desc:focus-visible, .tracking:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; border-radius: 4px; }',
      '.row { display: flex; align-items: flex-start; gap: 10px; }',
      '.status-icon { flex: none; margin-top: 2px; }',
      '.main { flex: 1; min-width: 0; }',
      // The chip is secondary: on a narrow card it moves under the description instead of squeezing it.
      '.line1 { display: flex; flex-wrap: wrap; align-items: center; column-gap: 8px; row-gap: 2px; justify-content: space-between; }',
      '.desc { min-width: 0; max-width: 100%; font-weight: 500; color: var(--primary-text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
      '.chip { flex: none; max-width: 100%; overflow: hidden; text-overflow: ellipsis; font-size: 11px; font-weight: 500; border-radius: 12px; padding: 1px 8px; white-space: nowrap; color: color-mix(in srgb, var(--c) 50%, var(--primary-text-color)); background: color-mix(in srgb, var(--c) 15%, transparent); }',
      '.line2, .line3, .expected { font-size: 12px; color: var(--secondary-text-color); margin-top: 1px; overflow-wrap: anywhere; }',
      '.tracking { font-family: var(--code-font-family, monospace); cursor: copy; }',
      '.tracking.copied::after { content: " \u2713"; color: var(--primary-text-color); }',
      '.expected { color: var(--primary-text-color); }',
      '.date { color: var(--secondary-text-color); font-size: 12px; }',
      '.chevron { flex: none; color: var(--secondary-text-color); transition: transform .2s ease; }',
      '.chevron.closed { transform: rotate(-90deg); }',
      '.events { list-style: none; margin: 4px 0 0 34px; padding: 0 0 0 12px; border-left: 2px solid var(--divider-color, rgba(0,0,0,.12)); font-size: 12px; color: var(--primary-text-color); }',
      '.events li { margin: 4px 0; }',
      '.additional { color: var(--secondary-text-color); }',
      '.form { padding: 6px 12px 4px; border-block: 1px solid var(--divider-color, rgba(0,0,0,.12)); display: flex; flex-direction: column; gap: 6px; }',
      '.form[hidden] { display: none; }',
      '.form label { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: var(--secondary-text-color); }',
      '.form label.check { flex-direction: row; align-items: center; gap: 8px; }',
      '.form input:not([type=checkbox]) { font: inherit; font-size: 16px; padding: 8px 12px; border-radius: 10px; border: 1px solid var(--divider-color, #ccc); background: var(--card-background-color, #fff); color: var(--primary-text-color); }',
      '.hint { font-size: 12px; color: var(--secondary-text-color); }',
      '.msg { font-size: 13px; }',
      '.msg:empty { display: none; }',
      '.msg.error { color: color-mix(in srgb, var(--error-color, #db4437) 50%, var(--primary-text-color)); }',
      '.msg.ok { color: color-mix(in srgb, var(--success-color, #43a047) 50%, var(--primary-text-color)); }',
      '.actions { display: flex; justify-content: flex-end; gap: 8px; }',
      '.actions button { font: inherit; padding: 6px 14px; border-radius: 10px; border: none; cursor: pointer;' +
        ' background: var(--secondary-background-color, rgba(127,127,127,.12)); color: var(--primary-text-color); }',
      '.actions .submit { background: color-mix(in srgb, var(--primary-color) 16%, transparent); color: color-mix(in srgb, var(--primary-color) 50%, var(--primary-text-color)); }',
      '.actions .submit:hover:not(:disabled) { background: color-mix(in srgb, var(--primary-color) 24%, transparent); }',
      '.actions button:disabled { opacity: 0.6; cursor: default; }',
      // Mini card: a 240 px preferred width, two count tiles, and the detail button at the top right.
      ':host([mini])::before { grid-template-columns: minmax(0, 240px); }',
      'ha-card.mini { padding-bottom: 12px; }',
      '.detail { all: unset; flex: none; cursor: pointer; width: 24px; height: 24px; margin-right: 4px; border-radius: 50%; align-self: flex-start;' +
        ' display: grid; place-items: center; color: var(--secondary-text-color); --mdc-icon-size: 16px; }',
      '.detail:hover { background: color-mix(in srgb, var(--secondary-text-color) 14%, transparent); color: var(--primary-text-color); }',
      '.detail:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }',
      '.summary { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; padding: 0 12px; }',
      '.tile { min-width: 0; padding: 8px 10px; border-radius: 12px; background: color-mix(in srgb, var(--c) 12%, transparent); }',
      '.tile .v { display: flex; align-items: center; gap: 6px; font-size: 22px; font-weight: 600; line-height: 1.1; color: var(--primary-text-color); --mdc-icon-size: 20px; }',
      '.tile .v ha-icon { color: var(--c); }',
      '.tile .l { font-size: 12px; color: var(--secondary-text-color); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      // The mini card keeps its 40 px header icon, also where the full card hides it: it is the card's identity.
      '@container (max-width: 320px) { ha-card.mini .logo { display: grid; } }',
      '@container (max-width: 180px) { .summary { grid-template-columns: minmax(0, 1fr); } }',
      '@media (prefers-reduced-motion: reduce) { .refresh-btn.spinning ha-icon { animation: none; opacity: .5; } .chevron { transition: none; } }',
    ].join('\n');
  }
}

// A click inside Home Assistant's dialogs (more-info, confirmations) is not "outside" the card.
function parcelInDialog(ev) {
  return ev.composedPath().some((n) => ['ha-more-info-dialog', 'ha-dialog', 'dialog'].includes(n.localName));
}

// Same calendar day, in the browser's time zone.
function parcelIsToday(ms, now) {
  var d = new Date(ms);
  var n = new Date(now);
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
}

// ── parcel-mini-card ──────────────────────────────────────────────────────────
// Two counts (active deliveries, deliveries arriving today) under the header. Its detail button (top right)
// switches to the full card and back; a click outside the card folds it back to the compact view.
class ParcelMiniCard extends ParcelCard {
  constructor() {
    super();
    this._zoomed = false;
    this._onOutsideMini = (ev) => {
      if (this._zoomed && !ev.composedPath().includes(this) && !parcelInDialog(ev)) this._setZoom(false);
    };
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onOutsideMini, true);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onOutsideMini, true);
  }

  setConfig(config) {
    // The host attribute behind the mini card's styles; never set in the constructor.
    this.setAttribute?.('mini', '');
    super.setConfig(config);
  }

  getCardSize() {
    return this._zoomed ? super.getCardSize() : 2;
  }

  getGridOptions() {
    return this._zoomed ? super.getGridOptions() : { columns: 6, min_columns: 4, rows: 'auto' };
  }

  _compact() {
    return !this._zoomed;
  }

  _detailButton(t) {
    var label = this._zoomed ? t.show_compact : t.show_full;
    return `<button class="detail" title="${parcelEsc(label)}" aria-label="${parcelEsc(label)}">` +
      `<ha-icon icon="mdi:${this._zoomed ? 'arrow-collapse' : 'arrow-expand'}"></ha-icon></button>`;
  }

  _toggleDetail(ev) {
    ev.stopPropagation();
    this._setZoom(!this._zoomed);
    // Keyboard use (Enter / Space: no click count) keeps the focus on the button, without scrolling the page.
    if (!ev.detail) this._root.querySelector('.detail')?.focus?.({ preventScroll: true });
  }

  _setZoom(zoomed) {
    this._zoomed = zoomed;
    if (!zoomed) {
      this._expanded = {};
      var form = this._root?.querySelector('.form');
      if (form) form.hidden = true;
    }
    this._render();
  }

  _render() {
    super._render();
    var card = this._root?.querySelector('ha-card');
    if (card) card.classList.toggle('mini', this._compact());
  }

  // Active: not delivered yet. Arriving today: out for delivery, or expected today.
  _counts(deliveries) {
    var now = Date.now();
    var active = deliveries.filter((d) => d.status_code !== 0);
    var today = active.filter((d) => {
      if (d.status_code === 4) return true;
      var ms = d.timestamp_expected ? d.timestamp_expected * 1000 : parcelParseDate(d.date_expected);
      return !Number.isNaN(ms) && parcelIsToday(ms, now);
    });
    return { active: active.length, today: today.length };
  }

  _renderSummary(deliveries, t) {
    var c = this._counts(deliveries);
    var tile = (value, label, style) =>
      `<div class="tile" style="--c:${style.color}"><div class="v"><ha-icon icon="${style.icon}"></ha-icon>${value}</div>` +
      `<div class="l">${parcelEsc(label)}</div></div>`;
    return '<div class="summary">' +
      tile(c.active, t.in_progress, PARCEL_STATUS_STYLE.in_transit) +
      tile(c.today, t.today, PARCEL_STATUS_STYLE.out_for_delivery) +
      '</div>';
  }
}

// ── parcel-card-editor ────────────────────────────────────────────────────────
function parcelEditorSchema(t) {
  return [
    { name: 'entity', selector: { entity: { domain: 'sensor', integration: 'parcel' } } },
    { name: 'title', selector: { text: {} } },
    {
      type: 'grid',
      name: '',
      schema: [
        { name: 'show_delivered', selector: { boolean: {} } },
        { name: 'show_refresh', selector: { boolean: {} } },
        { name: 'show_add', selector: { boolean: {} } },
      ],
    },
    { name: 'max_events', selector: { number: { min: 1, max: 20, mode: 'box' } } },
    {
      name: 'language',
      selector: {
        select: {
          mode: 'dropdown',
          options: [
            { value: '', label: t.lang_auto },
            { value: 'en', label: 'English' },
            { value: 'fr', label: 'Français' },
            { value: 'de', label: 'Deutsch' },
            { value: 'es', label: 'Español' },
            { value: 'sr', label: 'Српски' },
            { value: 'sr-Latn', label: 'Srpski (latinica)' },
            { value: 'it', label: 'Italiano' },
            { value: 'nl', label: 'Nederlands' },
            { value: 'pt', label: 'Português (Portugal)' },
            { value: 'pl', label: 'Polski' },
            { value: 'ro', label: 'Română' },
            { value: 'da', label: 'Dansk' },
            { value: 'sv', label: 'Svenska' },
            { value: 'bg', label: 'Български' },
            { value: 'ru', label: 'Русский' },
            { value: 'uk', label: 'Українська' },
            { value: 'hu', label: 'Magyar' },
            { value: 'sk', label: 'Slovenčina' },
            { value: 'cs', label: 'Čeština' },
            { value: 'sl', label: 'Slovenščina' },
            { value: 'lv', label: 'Latviešu' },
            { value: 'el', label: 'Ελληνικά' },
          ],
        },
      },
    },
  ];
}

class ParcelCardEditor extends HTMLElement {
  setConfig(config) {
    this._config = Object.assign({}, config);
    this._render();
  }

  set hass(hass) {
    this._hass = hass;
    if (this._form) this._form.hass = hass;
    else this._render();
  }

  _render() {
    if (!this._hass || !this._config) return;
    if (!this._form) {
      this._form = document.createElement('ha-form');
      this._form.addEventListener('value-changed', this._valueChanged.bind(this));
      this.appendChild(this._form);
    }
    // The labels follow the language picked in the editor: rebuilt only when it changes.
    var lang = parcelLang(this._hass, this._config);
    if (lang !== this._lang) {
      this._lang = lang;
      var t = ParcelI18n[lang].editor;
      this._form.schema = parcelEditorSchema(t);
      this._form.computeLabel = (field) => t[field.name] || field.name;
    }
    this._form.hass = this._hass;
    // Show the defaults as set, so the toggles match what the card does.
    this._form.data = Object.assign({}, PARCEL_DEFAULTS, this._config);
  }

  _valueChanged(ev) {
    var value = Object.assign({}, ev.detail.value);
    // Keep the YAML short: drop options left at their default.
    Object.keys(PARCEL_DEFAULTS).forEach((key) => {
      if (value[key] === PARCEL_DEFAULTS[key]) delete value[key];
    });
    if (!value.title) delete value.title;
    if (!value.entity) delete value.entity;
    if (!value.language) delete value.language;
    this._config = value;
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: value }, bubbles: true, composed: true }));
  }
}

if (!customElements.get('parcel-card-editor')) {
  customElements.define('parcel-card-editor', ParcelCardEditor);
}

var parcelDefined = false;
if (!customElements.get('parcel-card')) {
  customElements.define('parcel-card', ParcelCard);
  parcelDefined = true;
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'parcel-card',
    name: 'Parcel',
    description: 'Deliveries tracked in Parcel, with a form to add one.',
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-parcel',
  });
}
if (!customElements.get('parcel-mini-card')) {
  customElements.define('parcel-mini-card', ParcelMiniCard);
  parcelDefined = true;
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: 'parcel-mini-card',
    name: 'Parcel mini',
    description: 'Active deliveries and deliveries arriving today, with a button to show the full Parcel card.',
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-parcel',
  });
}
if (parcelDefined) {
  console.info(`%c PARCEL-CARD %c v${PARCEL_CARD_VERSION} `, 'color:#fff;background:#f59e0b;font-weight:700', 'color:#f59e0b;background:#fff');
}
