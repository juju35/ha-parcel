var PARCEL_CARD_VERSION = '1.9.0';

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
    tab_active: 'En cours',
    more: '+{n} autres',
    nothing: 'Aucun colis en route',
    editor: {
      entity: 'Capteur Parcel',
      title: 'Titre',
      show_delivered: 'Afficher les colis livrés',
      show_title: 'Afficher le titre',
      show_add: 'Afficher le bouton d\'ajout',
      show_refresh: 'Afficher le bouton Actualiser',
      max_events: 'Événements affichés quand un colis est déplié',
      language: 'Langue',
      lang_auto: 'Automatique',
      illustration: 'Illustration',
      illustration_theme: 'Thème de l\'illustration',
      illustration_background: 'Fond de l\'illustration',
      theme_auto: 'Automatique',
      theme_day: 'Jour',
      theme_night: 'Nuit',
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
    tab_active: 'Active',
    more: '+{n} more',
    nothing: 'Nothing on the way',
    editor: {
      entity: 'Parcel sensor',
      title: 'Title',
      show_delivered: 'Show delivered parcels',
      show_title: 'Show title',
      show_add: 'Show add button',
      show_refresh: 'Show refresh button',
      max_events: 'Events shown when a parcel is expanded',
      language: 'Language',
      lang_auto: 'Auto',
      illustration: 'Illustration',
      illustration_theme: 'Illustration theme',
      illustration_background: 'Illustration background',
      theme_auto: 'Automatic',
      theme_day: 'Day',
      theme_night: 'Night',
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
    tab_active: 'Aktiv',
    more: '+{n} weitere',
    nothing: 'Nichts unterwegs',
    editor: {
      entity: 'Parcel-Sensor',
      title: 'Titel',
      show_delivered: 'Zugestellte Sendungen anzeigen',
      show_title: 'Titel anzeigen',
      show_add: 'Schaltfläche „Hinzufügen“ anzeigen',
      show_refresh: 'Schaltfläche „Aktualisieren“ anzeigen',
      max_events: 'Angezeigte Ereignisse bei aufgeklappter Sendung',
      language: 'Sprache',
      lang_auto: 'Automatisch',
      illustration: 'Illustration',
      illustration_theme: 'Thema der Illustration',
      illustration_background: 'Hintergrund der Illustration',
      theme_auto: 'Automatisch',
      theme_day: 'Tag',
      theme_night: 'Nacht',
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
    tab_active: 'Activos',
    more: '+{n} más',
    nothing: 'Nada en camino',
    editor: {
      entity: 'Sensor de Parcel',
      title: 'Título',
      show_delivered: 'Mostrar los envíos entregados',
      show_title: 'Mostrar el título',
      show_add: 'Mostrar el botón Añadir',
      show_refresh: 'Mostrar el botón Actualizar',
      max_events: 'Eventos mostrados al desplegar un envío',
      language: 'Idioma',
      lang_auto: 'Automático',
      illustration: 'Ilustración',
      illustration_theme: 'Tema de la ilustración',
      illustration_background: 'Fondo de la ilustración',
      theme_auto: 'Automático',
      theme_day: 'Día',
      theme_night: 'Noche',
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
    tab_active: 'Активне',
    more: 'још {n}',
    nothing: 'Ништа није на путу',
    editor: {
      entity: 'Parcel сензор',
      title: 'Наслов',
      show_delivered: 'Прикажи испоручене пошиљке',
      show_title: 'Прикажи наслов',
      show_add: 'Прикажи дугме за додавање',
      show_refresh: 'Прикажи дугме за освежавање',
      max_events: 'Догађаји приказани када се пошиљка прошири',
      language: 'Језик',
      lang_auto: 'Аутоматски',
      illustration: 'Илустрација',
      illustration_theme: 'Тема илустрације',
      illustration_background: 'Позадина илустрације',
      theme_auto: 'Аутоматски',
      theme_day: 'Дан',
      theme_night: 'Ноћ',
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
    tab_active: 'Aktivne',
    more: 'još {n}',
    nothing: 'Ništa nije na putu',
    editor: {
      entity: 'Parcel senzor',
      title: 'Naslov',
      show_delivered: 'Prikaži isporučene pošiljke',
      show_title: 'Prikaži naslov',
      show_add: 'Prikaži dugme za dodavanje',
      show_refresh: 'Prikaži dugme za osvežavanje',
      max_events: 'Događaji prikazani kada se pošiljka proširi',
      language: 'Jezik',
      lang_auto: 'Automatski',
      illustration: 'Ilustracija',
      illustration_theme: 'Tema ilustracije',
      illustration_background: 'Pozadina ilustracije',
      theme_auto: 'Automatski',
      theme_day: 'Dan',
      theme_night: 'Noć',
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
    tab_active: 'Attive',
    more: '+{n} altre',
    nothing: 'Niente in arrivo',
    editor: {
      entity: 'Sensore Parcel',
      title: 'Titolo',
      show_delivered: 'Mostra le spedizioni consegnate',
      show_title: 'Mostra il titolo',
      show_add: 'Mostra il pulsante Aggiungi',
      show_refresh: 'Mostra il pulsante Aggiorna',
      max_events: 'Eventi mostrati quando una spedizione è espansa',
      language: 'Lingua',
      lang_auto: 'Automatica',
      illustration: 'Illustrazione',
      illustration_theme: 'Tema dell\'illustrazione',
      illustration_background: 'Sfondo dell\'illustrazione',
      theme_auto: 'Automatico',
      theme_day: 'Giorno',
      theme_night: 'Notte',
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
    tab_active: 'Actief',
    more: '+{n} meer',
    nothing: 'Niets onderweg',
    editor: {
      entity: 'Parcel-sensor',
      title: 'Titel',
      show_delivered: 'Bezorgde zendingen tonen',
      show_title: 'Titel tonen',
      show_add: 'Knop Toevoegen tonen',
      show_refresh: 'Knop Vernieuwen tonen',
      max_events: 'Getoonde gebeurtenissen bij een uitgeklapte zending',
      language: 'Taal',
      lang_auto: 'Automatisch',
      illustration: 'Illustratie',
      illustration_theme: 'Thema van de illustratie',
      illustration_background: 'Achtergrond van de illustratie',
      theme_auto: 'Automatisch',
      theme_day: 'Dag',
      theme_night: 'Nacht',
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
    tab_active: 'Ativas',
    more: '+{n} mais',
    nothing: 'Nada a caminho',
    editor: {
      entity: 'Sensor do Parcel',
      title: 'Título',
      show_delivered: 'Mostrar as encomendas entregues',
      show_title: 'Mostrar o título',
      show_add: 'Mostrar o botão Adicionar',
      show_refresh: 'Mostrar o botão Atualizar',
      max_events: 'Eventos mostrados ao expandir uma encomenda',
      language: 'Idioma',
      lang_auto: 'Automático',
      illustration: 'Ilustração',
      illustration_theme: 'Tema da ilustração',
      illustration_background: 'Fundo da ilustração',
      theme_auto: 'Automático',
      theme_day: 'Dia',
      theme_night: 'Noite',
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
    tab_active: 'Aktywne',
    more: '+{n} więcej',
    nothing: 'Nic nie jest w drodze',
    editor: {
      entity: 'Sensor Parcel',
      title: 'Tytuł',
      show_delivered: 'Pokaż doręczone przesyłki',
      show_title: 'Pokaż tytuł',
      show_add: 'Pokaż przycisk dodawania',
      show_refresh: 'Pokaż przycisk odświeżania',
      max_events: 'Zdarzenia wyświetlane po rozwinięciu przesyłki',
      language: 'Język',
      lang_auto: 'Automatycznie',
      illustration: 'Ilustracja',
      illustration_theme: 'Motyw ilustracji',
      illustration_background: 'Tło ilustracji',
      theme_auto: 'Automatycznie',
      theme_day: 'Dzień',
      theme_night: 'Noc',
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
    tab_active: 'Active',
    more: 'încă {n}',
    nothing: 'Nimic pe drum',
    editor: {
      entity: 'Senzor Parcel',
      title: 'Titlu',
      show_delivered: 'Afișează coletele livrate',
      show_title: 'Afișează titlul',
      show_add: 'Afișează butonul de adăugare',
      show_refresh: 'Afișează butonul de reîmprospătare',
      max_events: 'Evenimente afișate la extinderea unui colet',
      language: 'Limbă',
      lang_auto: 'Automat',
      illustration: 'Ilustrație',
      illustration_theme: 'Tema ilustrației',
      illustration_background: 'Fundalul ilustrației',
      theme_auto: 'Automat',
      theme_day: 'Zi',
      theme_night: 'Noapte',
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
    tab_active: 'Aktive',
    more: '+{n} mere',
    nothing: 'Intet på vej',
    editor: {
      entity: 'Parcel-sensor',
      title: 'Titel',
      show_delivered: 'Vis leverede pakker',
      show_title: 'Vis titel',
      show_add: 'Vis knappen Tilføj',
      show_refresh: 'Vis knappen Opdater',
      max_events: 'Hændelser, der vises, når en pakke er udvidet',
      language: 'Sprog',
      lang_auto: 'Automatisk',
      illustration: 'Illustration',
      illustration_theme: 'Illustrationstema',
      illustration_background: 'Illustrationens baggrund',
      theme_auto: 'Automatisk',
      theme_day: 'Dag',
      theme_night: 'Nat',
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
    tab_active: 'Aktiva',
    more: '+{n} till',
    nothing: 'Inget på väg',
    editor: {
      entity: 'Parcel-sensor',
      title: 'Titel',
      show_delivered: 'Visa levererade paket',
      show_title: 'Visa rubrik',
      show_add: 'Visa knappen Lägg till',
      show_refresh: 'Visa knappen Uppdatera',
      max_events: 'Händelser som visas när ett paket är expanderat',
      language: 'Språk',
      lang_auto: 'Automatiskt',
      illustration: 'Illustration',
      illustration_theme: 'Illustrationstema',
      illustration_background: 'Illustrationens bakgrund',
      theme_auto: 'Automatiskt',
      theme_day: 'Dag',
      theme_night: 'Natt',
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
    tab_active: 'Активни',
    more: 'още {n}',
    nothing: 'Нищо не е на път',
    editor: {
      entity: 'Сензор на Parcel',
      title: 'Заглавие',
      show_delivered: 'Показване на доставените пратки',
      show_title: 'Показване на заглавието',
      show_add: 'Показване на бутона за добавяне',
      show_refresh: 'Показване на бутона за опресняване',
      max_events: 'Събития, показвани при разгъната пратка',
      language: 'Език',
      lang_auto: 'Автоматично',
      illustration: 'Илюстрация',
      illustration_theme: 'Тема на илюстрацията',
      illustration_background: 'Фон на илюстрацията',
      theme_auto: 'Автоматично',
      theme_day: 'Ден',
      theme_night: 'Нощ',
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
    tab_active: 'Активные',
    more: 'ещё {n}',
    nothing: 'Ничего не в пути',
    editor: {
      entity: 'Сенсор Parcel',
      title: 'Заголовок',
      show_delivered: 'Показывать доставленные посылки',
      show_title: 'Показывать заголовок',
      show_add: 'Показывать кнопку добавления',
      show_refresh: 'Показывать кнопку обновления',
      max_events: 'Число событий в раскрытой посылке',
      language: 'Язык',
      lang_auto: 'Автоматически',
      illustration: 'Иллюстрация',
      illustration_theme: 'Тема иллюстрации',
      illustration_background: 'Фон иллюстрации',
      theme_auto: 'Автоматически',
      theme_day: 'День',
      theme_night: 'Ночь',
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
    tab_active: 'Активні',
    more: 'ще {n}',
    nothing: 'Нічого не в дорозі',
    editor: {
      entity: 'Сенсор Parcel',
      title: 'Заголовок',
      show_delivered: 'Показувати доставлені посилки',
      show_title: 'Показувати заголовок',
      show_add: 'Показувати кнопку додавання',
      show_refresh: 'Показувати кнопку оновлення',
      max_events: 'Кількість подій у розгорнутій посилці',
      language: 'Мова',
      lang_auto: 'Автоматично',
      illustration: 'Ілюстрація',
      illustration_theme: 'Тема ілюстрації',
      illustration_background: 'Тло ілюстрації',
      theme_auto: 'Автоматично',
      theme_day: 'День',
      theme_night: 'Ніч',
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
    tab_active: 'Aktív',
    more: '+{n} további',
    nothing: 'Semmi sincs úton',
    editor: {
      entity: 'Parcel érzékelő',
      title: 'Cím',
      show_delivered: 'Kézbesített csomagok megjelenítése',
      show_title: 'Cím megjelenítése',
      show_add: 'Hozzáadás gomb megjelenítése',
      show_refresh: 'Frissítés gomb megjelenítése',
      max_events: 'Megjelenített események kibontott csomagnál',
      language: 'Nyelv',
      lang_auto: 'Automatikus',
      illustration: 'Illusztráció',
      illustration_theme: 'Az illusztráció témája',
      illustration_background: 'Az illusztráció háttere',
      theme_auto: 'Automatikus',
      theme_day: 'Nappal',
      theme_night: 'Éjszaka',
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
    tab_active: 'Aktívne',
    more: '+{n} ďalšie',
    nothing: 'Nič nie je na ceste',
    editor: {
      entity: 'Senzor Parcel',
      title: 'Názov',
      show_delivered: 'Zobraziť doručené zásielky',
      show_title: 'Zobraziť názov',
      show_add: 'Zobraziť tlačidlo pridania',
      show_refresh: 'Zobraziť tlačidlo obnovenia',
      max_events: 'Udalosti zobrazené po rozbalení zásielky',
      language: 'Jazyk',
      lang_auto: 'Automaticky',
      illustration: 'Ilustrácia',
      illustration_theme: 'Téma ilustrácie',
      illustration_background: 'Pozadie ilustrácie',
      theme_auto: 'Automaticky',
      theme_day: 'Deň',
      theme_night: 'Noc',
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
    tab_active: 'Aktivní',
    more: '+{n} další',
    nothing: 'Nic není na cestě',
    editor: {
      entity: 'Senzor Parcel',
      title: 'Název',
      show_delivered: 'Zobrazit doručené zásilky',
      show_title: 'Zobrazit název',
      show_add: 'Zobrazit tlačítko přidání',
      show_refresh: 'Zobrazit tlačítko obnovení',
      max_events: 'Události zobrazené po rozbalení zásilky',
      language: 'Jazyk',
      lang_auto: 'Automaticky',
      illustration: 'Ilustrace',
      illustration_theme: 'Motiv ilustrace',
      illustration_background: 'Pozadí ilustrace',
      theme_auto: 'Automaticky',
      theme_day: 'Den',
      theme_night: 'Noc',
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
    tab_active: 'Aktivne',
    more: 'še {n}',
    nothing: 'Nič ni na poti',
    editor: {
      entity: 'Senzor Parcel',
      title: 'Naslov',
      show_delivered: 'Prikaži dostavljene pošiljke',
      show_title: 'Prikaži naslov',
      show_add: 'Prikaži gumb za dodajanje',
      show_refresh: 'Prikaži gumb za osvežitev',
      max_events: 'Dogodki, prikazani ob razširjeni pošiljki',
      language: 'Jezik',
      lang_auto: 'Samodejno',
      illustration: 'Ilustracija',
      illustration_theme: 'Tema ilustracije',
      illustration_background: 'Ozadje ilustracije',
      theme_auto: 'Samodejno',
      theme_day: 'Dan',
      theme_night: 'Noč',
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
    tab_active: 'Aktīvās',
    more: 'vēl {n}',
    nothing: 'Nekas nav ceļā',
    editor: {
      entity: 'Parcel sensors',
      title: 'Virsraksts',
      show_delivered: 'Rādīt piegādātos sūtījumus',
      show_title: 'Rādīt virsrakstu',
      show_add: 'Rādīt pievienošanas pogu',
      show_refresh: 'Rādīt atsvaidzināšanas pogu',
      max_events: 'Notikumi, kas redzami izvērstam sūtījumam',
      language: 'Valoda',
      lang_auto: 'Automātiski',
      illustration: 'Ilustrācija',
      illustration_theme: 'Ilustrācijas tēma',
      illustration_background: 'Ilustrācijas fons',
      theme_auto: 'Automātiski',
      theme_day: 'Diena',
      theme_night: 'Nakts',
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
    tab_active: 'Ενεργά',
    more: '+{n} ακόμη',
    nothing: 'Τίποτα καθ’ οδόν',
    editor: {
      entity: 'Αισθητήρας Parcel',
      title: 'Τίτλος',
      show_delivered: 'Εμφάνιση παραδομένων δεμάτων',
      show_title: 'Εμφάνιση τίτλου',
      show_add: 'Εμφάνιση κουμπιού προσθήκης',
      show_refresh: 'Εμφάνιση κουμπιού ανανέωσης',
      max_events: 'Συμβάντα που εμφανίζονται σε ανεπτυγμένο δέμα',
      language: 'Γλώσσα',
      lang_auto: 'Αυτόματα',
      illustration: 'Εικονογράφηση',
      illustration_theme: 'Θέμα εικονογράφησης',
      illustration_background: 'Φόντο εικονογράφησης',
      theme_auto: 'Αυτόματο',
      theme_day: 'Ημέρα',
      theme_night: 'Νύχτα',
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
var PARCEL_DEFAULTS = {
  show_title: true, show_delivered: true, show_add: true, show_refresh: true, max_events: 5, illustration: true, illustration_theme: 'auto', illustration_background: true,
};

// ── The illustration: a street with houses, and the delivery van of the featured parcel ──────────────────────
// Every animation lasts 8 s or a divisor of it, so a recording of 8 s loops. The scenery is drawn in a 200 × 80 box
// whose bottom 5 units overlap the road strip; the van's wheels roll on that strip, the houses stand at y = 75.
// The scene of the header follows the featured parcel (parcelFeatured): `drop` the van brings it to the door,
// `transit` the van drives by, `pickup` it waits in the parcel shop, `failed` the van leaves a notice on the door,
// `delivered` it lies on the doorstep, `idle` a quiet street.
var PARCEL_SCENE_OF = {
  out_for_delivery: 'drop', awaiting_pickup: 'pickup', failed_attempt: 'failed', exception: 'failed', delivered: 'delivered',
};
// The parcel the mini card puts forward: a problem first, then the one at the door, the one to pick up, the rest.
var PARCEL_FEATURE_RANK = { failed_attempt: 0, exception: 0, out_for_delivery: 1, awaiting_pickup: 2, in_transit: 3, info_received: 4 };

var PARCEL_STARS = [[8, 8], [26, 22], [44, 6], [62, 28], [80, 12], [98, 4], [110, 30], [134, 8], [160, 20], [178, 6], [194, 14]];

function parcelCloud(cls, x, y, s) {
  return `<g class="cloud ${cls}"><path transform="translate(${x} ${y}) scale(${s})" ` +
    'd="M-14,4 C-17,4 -18,0 -14.5,-1 C-14,-5 -8,-6 -6,-3 C-4,-8 4,-8 5,-2 C9,-3 12,0 10,4 Z"/></g>';
}

var PARCEL_BOX = '<rect width="7" height="6" rx="1" class="box"/><path d="M3.5,0 V6" class="tape"/>';

// Each card instance passes its own uid, so the moon's mask id never clashes with another card on the page.
var parcelUid = 0;
var parcelScene = (uid) =>
  '<svg class="scene" viewBox="0 0 200 80" preserveAspectRatio="xMaxYMax slice" aria-hidden="true" focusable="false">' +
  '<g class="stars">' + PARCEL_STARS.map((s, i) => `<circle class="${i % 3 ? '' : 'tw'}" cx="${s[0]}" cy="${s[1]}" r=".6"/>`).join('') + '</g>' +
  '<g class="sun"><circle cx="100" cy="18" r="10" opacity=".28"/><circle cx="100" cy="18" r="6.5"/></g>' +
  `<mask id="parcel-moon-${uid}">`+'<rect width="200" height="80" fill="#fff"/><circle cx="103.5" cy="15.5" r="5.4" fill="#000"/></mask>' +
  '<g class="moon"><circle cx="100" cy="18" r="9" opacity=".12"/><circle cx="100" cy="18" r="6" mask="url(#parcel-moon-' + uid + ')"/></g>' +
  '<g class="clouds">' + parcelCloud('c1', 70, 15, 0.9) + parcelCloud('c2', 186, 36, 0.65) + '</g>' +
  '<path class="hill" d="M0,75 C30,70 52,62 82,63 C110,64 130,55 160,57 C180,58 190,54 200,55 L200,75 Z"/>' +
  '<g class="shop">' +
  '<rect x="97" y="59" width="27" height="16" class="wall"/><path d="M94,54 H127 L125,60 H96 Z" class="awning"/>' +
  '<path d="M100,54 V60 M106,54 V60 M112,54 V60 M118,54 V60 M124,54 V59" class="stripes"/>' +
  '<rect x="100" y="63" width="9" height="12" class="win"/><rect x="112" y="63" width="9" height="8" class="win"/>' +
  '<g class="waiting" transform="translate(113 65)">' + PARCEL_BOX + '</g></g>' +
  '<g class="house">' +
  '<rect x="142" y="57" width="28" height="18" class="wall"/><path d="M139.5,58 L156,45.5 L172.5,58 Z" class="roof"/>' +
  '<path d="M139.5,58 L156,45.5 L172.5,58" class="eave"/>' +
  '<rect x="145" y="61" width="5" height="4.5" class="win"/><rect x="162" y="61" width="5" height="4.5" class="win"/>' +
  '<rect x="152" y="64" width="8" height="11" class="door"/>' +
  '<g class="notice"><rect x="152.5" y="65" width="7" height="5" rx=".6"/><path d="M156,66 V68.2 M156,69 V69.3"/></g></g>' +
  '<g class="house small"><rect x="177" y="61" width="18" height="14" class="wall"/><path d="M175,62 L186,53 L197,62 Z" class="roof grey"/>' +
  '<rect x="183.5" y="65" width="5" height="4.5" class="win"/></g>' +
  '<g class="left" transform="translate(147 69)">' + PARCEL_BOX +
  '<g class="tick"><circle cx="8" cy="-1.5" r="3"/><path d="M6.6,-1.5 L7.6,-.5 L9.5,-2.6"/></g></g>' +
  '<g class="carried">' + PARCEL_BOX + '</g>' +
  '<g class="van"><g class="bodywork">' +
  '<rect x="0" y="60" width="22" height="14" rx="2" class="cargo"/><rect x="3" y="64" width="10" height="2.5" rx="1.2" class="stripe"/>' +
  '<path d="M22,64 H28 L32.5,69 V74 H22 Z" class="cab"/><path d="M24,65.5 H27.4 L30,68.6 H24 Z" class="glass"/>' +
  '<path d="M32.5,70.5 L46,67 V76 Z" class="beam"/><circle cx="32" cy="71.5" r="1" class="lamp"/></g>' +
  '<circle cx="6.5" cy="76.5" r="3" class="wheel"/><circle cx="26.5" cy="76.5" r="3" class="wheel"/></g>' +
  '</svg>';

// Night illustration: forced by illustration_theme, else with the dark theme (a light sky on a dark dashboard
// glares), else when the sun is below the horizon.
function parcelNight(hass, config) {
  var mode = config?.illustration_theme;
  if (mode === 'night') return true;
  if (mode === 'day') return false;
  return !!hass?.themes?.darkMode || hass?.states?.['sun.sun']?.state === 'below_horizon';
}

// The featured parcel: the most pressing active one (PARCEL_FEATURE_RANK, then the list order: expected date),
// else the first delivered one; null without any parcel.
function parcelFeatured(deliveries) {
  var active = deliveries.filter((d) => d.status_code !== 0);
  if (!active.length) return deliveries[0] || null;
  var rank = (d) => (d.status in PARCEL_FEATURE_RANK ? PARCEL_FEATURE_RANK[d.status] : 5);
  return active.reduce((best, d) => (rank(d) < rank(best) ? d : best), active[0]);
}

// Colour of the header icon: the state of the featured parcel (out for delivery / in transit, awaiting pickup,
// delivered, failed attempt or exception), a neutral grey without any parcel or with the sensor unavailable.
// The header's status pill: a dot and the state of the featured parcel, in the header icon's colour.
var PARCEL_CHIP = '<span class="chip st" hidden><span class="dot"></span><span class="txt"></span></span>';

function parcelHeaderColor(d) {
  if (!d) return 'var(--disabled-text-color, #9e9e9e)';
  var key = d.status in PARCEL_STATUS_STYLE ? d.status : d.status_code === 0 ? 'delivered' : 'in_transit';
  if (key === 'info_received' || key === 'unknown') key = 'in_transit';
  return PARCEL_STATUS_STYLE[key].color;
}

function parcelSceneOf(d) {
  if (!d) return 'idle';
  return PARCEL_SCENE_OF[d.status] || (d.status_code === 0 ? 'delivered' : 'transit');
}

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
    // show_title: the header's title, hidden by the stylesheet
    this.toggleAttribute?.('hide-title', config?.show_title === false);
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
      '<ha-card><div class="header"></div><div class="tabs" role="tablist" hidden></div><div class="form" hidden></div><div class="list"></div></ha-card>';
    var list = this._root.querySelector('.list');
    list.addEventListener('click', this._onListClick.bind(this));
    list.addEventListener('keydown', this._onListKeydown.bind(this));
    this._root.querySelector('.tabs').addEventListener('click', this._onTabClick.bind(this));
  }

  // Active / Delivered tabs, under the header (like the flight board): shown when delivered parcels are listed.
  _renderTabs(all, t) {
    var done = all.filter((d) => d.status_code === 0).length;
    var show = !this._compact() && this._config.show_delivered && done > 0;
    var tabs = this._root.querySelector('.tabs');
    if (tabs) tabs.hidden = !show;
    if (!show) {
      this._tab = 'active';
      return false;
    }
    var tab = (id, label, n) =>
      `<button class="tab" role="tab" data-tab="${id}" aria-selected="${this._tab === id}">${parcelEsc(label)}` +
      ` <span class="n">${n}</span></button>`;
    if (tabs) tabs.innerHTML = tab('active', t.tab_active, all.length - done) + tab('delivered', t.status.delivered, done);
    return true;
  }

  _onTabClick(ev) {
    var btn = ev.target.closest && ev.target.closest('[data-tab]');
    if (!btn) return;
    ev.stopPropagation();
    this._tab = btn.getAttribute('data-tab');
    this._expanded = {};
    this._render();
  }

  _render() {
    if (!this._config || !this._hass) return;
    this._ensureShell();
    var t = this._t();
    var st = this._lastState;
    var header = this._root.querySelector('.header');
    var list = this._root.querySelector('.list');
    var title = this._config.title || t.default_title;
    this._tab = this._tab || 'active';

    // A failed update (rate limit, Parcel down) leaves the sensor unavailable, without its attributes:
    // say so instead of showing "unavailable active" and an empty list.
    var unavailable = !st || st.state === 'unavailable' || st.state === 'unknown';
    var deliveries = unavailable ? [] : (st.attributes?.deliveries || []).slice();
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

    this._renderHeader(header, t, st, title, deliveries);
    var tabbed = this._renderTabs(deliveries, t);
    if (!st) {
      list.innerHTML = `<div class="empty">${parcelEsc(t.no_entity)}</div>`;
      return;
    }
    if (unavailable) {
      list.innerHTML = `<div class="empty">${parcelEsc(t.unavailable)}</div>`;
      return;
    }
    // The compact mini card is its banner alone.
    if (this._compact()) {
      list.innerHTML = '';
      return;
    }
    // With the tabs, each one lists its own parcels.
    if (tabbed) deliveries = deliveries.filter((d) => (d.status_code === 0) === (this._tab === 'delivered'));
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
  _renderHeader(header, t, st, title, deliveries) {
    var c = this._config;
    var compact = this._compact();
    var hero = c.illustration !== false;
    var canAdd = c.show_add && parcelIsAdmin(this._hass);
    var key = [!!st, c.show_refresh, canAdd, parcelLang(this._hass, c), compact, hero].join('|');
    if (this._headerKey !== key || !header.querySelector('.head')) {
      this._headerKey = key;
      header.className = hero ? 'header hero' : 'header';
      header.innerHTML =
        (hero ? `${parcelScene(this._uid || (this._uid = ++parcelUid))}<div class="road"><span class="marks"></span></div>` : '') +
        '<div class="head">' +
        // The compact mini card counts the other parcels on the way in a badge on its icon.
        (compact ? `<div class="mark">${this._iconHtml()}<span class="more" hidden></span></div>` : this._iconHtml()) +
        (compact
          // The compact mini card: the featured parcel laid on the sky, like the next flight of the flight board.
          ? `<div class="next"><div class="trow"><div class="name"></div>${PARCEL_CHIP}</div>` +
            '<div class="l2"></div></div>'
          : `<div class="titles"><div class="trow"><div class="name"></div>${PARCEL_CHIP}</div><div class="sub count" hidden></div>` +
            // The refresh error survives re-renders (hass updates) until the next refresh attempt.
            '<div class="sub error" hidden></div></div>') +
        '</div>' +
        (st && !compact
          ? '<div class="buttons">' +
            (c.show_refresh
              ? `<ha-icon-button class="refresh-btn" label="${parcelEsc(t.refresh)}" title="${parcelEsc(t.refresh)}"><ha-icon icon="mdi:refresh"></ha-icon></ha-icon-button>`
              : '') +
            (canAdd
              ? `<ha-icon-button class="add-btn" label="${parcelEsc(t.add)}" title="${parcelEsc(t.add)}"><ha-icon icon="mdi:plus"></ha-icon></ha-icon-button>`
              : '') +
            this._detailButton(t) +
            '</div>'
          : this._detailButton(t));
      var addBtn = header.querySelector('.add-btn');
      if (addBtn) addBtn.addEventListener('click', this._toggleForm.bind(this));
      var refreshBtn = header.querySelector('.refresh-btn');
      if (refreshBtn) refreshBtn.addEventListener('click', this._refresh.bind(this));
      var detailBtn = header.querySelector('.detail');
      if (detailBtn) detailBtn.addEventListener('click', this._toggleDetail.bind(this));
    }
    var unavailable = !st || st.state === 'unavailable' || st.state === 'unknown';
    var featured = unavailable ? null : parcelFeatured(deliveries);
    header.style?.setProperty('--pc-state', parcelHeaderColor(featured));
    if (hero) {
      header.classList?.toggle('night', parcelNight(this._hass, c));
      // illustration_background: false keeps the houses and the van, without the sky and the road.
      header.classList?.toggle('bare', c.illustration_background === false);
      header.setAttribute?.('data-scene', parcelSceneOf(featured));
    }
    if (compact) {
      this._renderNext(header, t, st, title, deliveries, featured);
    } else {
      var name = header.querySelector('.name');
      if (name) name.textContent = title;
      var count = header.querySelector('.count');
      if (count) {
        // An unavailable sensor has no count to show: the list says it is unavailable.
        // The sensor's state is the active count (its filter included); the parcels arriving today follow it.
        var today = unavailable ? 0 : this._counts(st.attributes?.deliveries || []).today;
        count.hidden = unavailable || !!this._refreshError;
        count.textContent = unavailable ? '' : `${st.state} ${t.in_progress}` + (today ? ` · ${today} ${t.today}` : '');
      }
      // The status pill: the featured parcel's state (the one the icon's colour and the street show), else nothing
      // on the way.
      var pill = header.querySelector('.chip.st');
      if (pill) {
        pill.hidden = unavailable;
        pill.style.setProperty('--c', parcelHeaderColor(featured));
        var label = featured ? t.status[featured.status || 'unknown'] || featured.status : t.nothing;
        pill.querySelector('.txt').textContent = unavailable ? '' : label;
        pill.title = unavailable ? '' : label;
      }
      var sub = header.querySelector('.sub.error');
      if (sub) {
        sub.hidden = !(st && this._refreshError);
        sub.textContent = (st && this._refreshError) || '';
      }
    }
    var refresh = header.querySelector('.refresh-btn');
    if (refresh) refresh.classList.toggle('spinning', !!this._refreshing);
  }

  // The banner of the compact mini card: the featured parcel, its state pill, its carrier and what comes next.
  _renderNext(header, t, st, title, deliveries, featured) {
    var name = header.querySelector('.name');
    var chip = header.querySelector('.chip');
    var l2 = header.querySelector('.l2');
    var more = header.querySelector('.more');
    if (!name || !chip || !l2 || !more) return;
    var unavailable = !st || st.state === 'unavailable' || st.state === 'unknown';
    chip.hidden = !featured;
    more.hidden = true;
    if (!featured) {
      name.textContent = title;
      l2.textContent = !st ? t.no_entity : unavailable ? t.unavailable : t.nothing;
      return;
    }
    var key = featured.status || 'unknown';
    var style = PARCEL_STATUS_STYLE[key] || PARCEL_STATUS_STYLE.unknown;
    name.textContent = featured.description || featured.tracking_number;
    chip.style.setProperty('--c', parcelHeaderColor(featured));
    chip.querySelector('.txt').textContent = t.status[key] || key;
    chip.title = t.status[key] || key;
    var last = (featured.events || [])[0];
    var expected = featured.status_code !== 0 ? this._formatExpected(featured) : '';
    var ms = featured.timestamp_expected ? featured.timestamp_expected * 1000 : parcelParseDate(featured.date_expected);
    if (featured.status_code === 4 || (expected && !Number.isNaN(ms) && parcelIsToday(ms, Date.now()))) expected = t.today;
    var where = expected || last?.location || '';
    l2.textContent = (featured.carrier_name || featured.carrier_code || '') + (where ? ` · ${where}` : '');
    var others = deliveries.filter((d) => d.status_code !== 0 && d !== featured).length;
    more.hidden = !others;
    more.textContent = others ? `+${others}` : '';
    more.title = others ? t.more.replace('{n}', others) : '';
    if (more.setAttribute) more.setAttribute('aria-label', more.title);
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

  // A delivery is a tile (the common tile of the cards): a tinted round icon with its state badge, the description
  // in bold, the state line in the state color, then the expected date and the carrier as pills.
  _renderDelivery(d, t) {
    var key = d.status || 'unknown';
    var style = PARCEL_STATUS_STYLE[key] || PARCEL_STATUS_STYLE.unknown;
    var id = `${d.carrier_code}:${d.tracking_number}`;
    var expanded = !!this._expanded[id];
    var events = d.events || [];
    var last = events[0];
    var done = d.status_code === 0;
    var expected = done ? '' : this._formatExpected(d);
    var icon = done
      // Delivered: a check mark drawn in the round icon.
      ? '<svg class="draw" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5,12.5 L10,17 L18.5,7.5"/></svg>'
      : `<ha-icon icon="${style.icon}"></ha-icon>`;
    var where = [last?.location, parcelDate(last?.date)].filter(Boolean).join(' ');

    var html =
      `<div class="delivery s-${parcelEsc(key)}${done ? ' done' : ''}" data-id="${parcelEsc(id)}" style="--c:${style.color}">` +
      // Only the description is the keyboard toggle: a role="button" row would hide the copy button
      // inside it from screen readers (nested interactive). A click anywhere on the row still toggles it.
      '<div class="row">' +
      `<div class="pill" aria-hidden="true">${icon}<span class="badge"></span></div>` +
      '<div class="main">' +
      '<div class="line1"><span class="desc" role="button" tabindex="0" aria-expanded="' + expanded + '">' + parcelEsc(d.description || d.tracking_number) + '</span></div>' +
      `<div class="state"><span class="label">${parcelEsc(t.status[key] || key)}</span>${where ? ` · ${parcelEsc(where)}` : ''}</div>` +
      (last ? `<div class="line3">${parcelEsc(last.event)}</div>` : '') +
      (key === 'out_for_delivery' ? '<div class="track" aria-hidden="true"><span class="fill"></span><ha-icon icon="mdi:truck-fast"></ha-icon></div>' : '') +
      '<div class="chips">' +
      (expected ? `<span class="chip expected" title="${parcelEsc(t.expected)}"><ha-icon icon="mdi:clock-outline"></ha-icon>${parcelEsc(expected)}</span>` : '') +
      '<span class="chip carrier">' + parcelEsc(d.carrier_name || d.carrier_code) + ' · ' +
      '<span class="tracking" role="button" tabindex="0" data-copy="' + parcelEsc(d.tracking_number) + '" title="' + parcelEsc(t.copy) + '">' + parcelEsc(d.tracking_number) + '</span></span>' +
      '</div></div>' +
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
      ':host { display: block; --pc-accent: ' + PARCEL_ACCENT + '; }',
      // The container query needs size containment, which gives ha-card no intrinsic width: in an auto-sized parent
      // (inline-block, grid `auto` column, layout-card) the card fell to a few pixels. This empty, 0 px high line
      // gives the host a preferred width of 320 px (max-content) but no minimum (min-content 0), so a `1fr 1fr` grid
      // can still shrink it, even with the card wrapped in a div. contain-intrinsic-inline-size gave both: the card
      // then refused to shrink and overflowed such a grid.
      ':host::before { content: ""; display: grid; grid-template-columns: minmax(0, 320px); height: 0; }',
      'ha-card { padding: 0 0 4px; overflow: hidden; container-type: inline-size; container-name: pc-card; }',
      // ── Header. Classic (illustration: false): the round icon, the title and its subtitle, the buttons.
      '.header { position: relative; display: flex; align-items: center; gap: 10px; padding: 12px 10px 8px 12px; min-height: 40px; }',
      '.head { flex: 1 1 0; min-width: 0; display: flex; align-items: center; gap: 10px; }',
      '.logo { width: 40px; height: 40px; flex: none; border-radius: 50%; display: grid; place-items: center;' +
        ' color: var(--pc-state, var(--pc-accent)); background: color-mix(in srgb, var(--pc-state, var(--pc-accent)) 16%, transparent); }',
      '.logo ha-icon { --mdc-icon-size: 24px; }',
      '.titles { flex: 1 1 0; min-width: 0; overflow: hidden; display: flex; flex-direction: column; }',
      // Title row: the name, then the status pill right after it (the name gives way first, down to four characters).
      // When the row is too narrow for both, the pill takes a line of its own under the subtitle; on the narrowest
      // cards only its dot stays (its label in its title).
      '.titles, .next { container: pc-titles / inline-size; }',
      '.trow { display: flex; align-items: center; gap: 8px; min-width: 0; }',
      '.trow > .name { flex: 0 1 auto; min-width: 4ch; }',
      '.head .chip.st { flex: none; max-width: 51%; display: inline-flex; align-items: center; gap: 4px; padding: 1px 8px; border-radius: 12px; box-sizing: border-box;' +
        ' overflow: hidden; white-space: nowrap; font-size: 11px; font-weight: 500; line-height: 16px;' +
        ' color: color-mix(in srgb, var(--c) 45%, var(--primary-text-color)); background: color-mix(in srgb, var(--c) 15%, transparent); }',
      '.head .chip.st .txt { min-width: 0; overflow: hidden; text-overflow: ellipsis; }',
      '.head .chip.st .dot { width: 7px; height: 7px; flex: none; border-radius: 50%; background: var(--c); }',
      // On a line of its own the pill may run past the texts over the street's sky (a long label beside a short title).
      '.hero .titles { overflow: visible; }',
      '@container pc-titles (max-width: 230px) { .trow { display: contents; } .head .chip.st { order: 3; align-self: flex-start; max-width: none; margin-top: 2px; } }',
      '@container pc-card (max-width: 260px) { .trow { display: contents; } .head .chip.st { order: 3; align-self: flex-start; max-width: 100%; margin-top: 2px; } }',
      '@container pc-card (max-width: 200px) { .head .chip.st { padding: 0; width: 16px; height: 16px; justify-content: center; } .head .chip.st .txt { display: none; } }',
      ':host([hide-title]) .titles > .name { display: none; }',
      '.name { font-size: 16px; font-weight: 500; line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.header:not(.hero) .name { color: var(--primary-text-color); }',
      '.sub { font-size: 12px; line-height: 16px; color: var(--sky-muted, var(--secondary-text-color)); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }',
      '.sub[hidden], .more[hidden], .chip[hidden], .tabs[hidden] { display: none; }',
      '.sub.error { color: color-mix(in srgb, var(--error-color, #db4437) 55%, var(--sky-text, var(--primary-text-color))); }',
      '.buttons { display: flex; align-items: center; gap: 4px; flex: none; }',
      // HA's default ha-icon-button is 48 px with a 24 px glyph; match the 28/16 px icon actions of the sibling cards.
      '.buttons ha-icon-button { flex: none; --mdc-icon-button-size: 28px; --mdc-icon-size: 16px; color: var(--secondary-text-color); }',
      '.refresh-btn.spinning ha-icon { animation: parcel-spin 1s linear infinite; }',
      '@keyframes parcel-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }',
      // ── Illustrated header: the sky, the street on the right, the road, the texts laid on the sky (as on the flight
      // and train boards). The scene takes 2.5 times its height, at most --scene-max of the card; the texts the rest.
      '.header.hero { display: block; padding: 0; height: var(--hero-h); overflow: hidden; --hero-h: 90px; --road-h: 10px; --scene-max: 56%;' +
        ' --scene-w: min(calc((var(--hero-h) - var(--road-h) + 5px) * 2.5), var(--scene-max));' +
        ' --sky-text: #0d2a45; --sky-muted: #3b5b78; color: var(--sky-text);' +
        ' background: linear-gradient(90deg, #f1f8ff 0%, #e2f1fd 34%, #b9def8 70%, #9fd0f3 100%); }',
      '.header.hero.night { --sky-text: #ffffff; --sky-muted: rgba(255,255,255,.78);' +
        ' background: linear-gradient(90deg, #1b2f52 0%, #15284a 36%, #0f1f3d 72%, #0a1830 100%); }',
      '.hero .scene { position: absolute; z-index: 1; right: 0; bottom: calc(var(--road-h) - 5px); height: calc(100% - var(--road-h) + 5px); width: var(--scene-w); }',
      '.hero .road { position: absolute; left: 0; right: 0; bottom: 0; height: var(--road-h); background: #8e9399; box-shadow: inset 0 1px 0 #7a8087; }',
      '.hero.night .road { background: #2c323b; box-shadow: inset 0 1px 0 #1f242b; }',
      '.hero .road .marks { position: absolute; left: 0; right: 0; top: calc(50% - .8px); height: 1.6px;' +
        ' background: repeating-linear-gradient(90deg, rgba(255,255,255,.85) 0 10px, transparent 10px 20px); }',
      '.hero.night .road .marks { background: repeating-linear-gradient(90deg, rgba(255,255,255,.4) 0 10px, transparent 10px 20px); }',
      '.hero .head { position: absolute; z-index: 2; left: 0; top: 0; bottom: var(--road-h); right: var(--scene-w); box-sizing: border-box; padding: 8px 8px 8px 14px; }',
      // The round icon on the sky: frosted glass, the Parcel accent.
      '.hero .logo { background: rgba(255,255,255,.62); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--pc-state, var(--pc-accent)) 22%, transparent); }',
      // At night the state colour is lifted toward white so it stays readable on the dark sky.
      '.hero.night .logo { background: rgba(255,255,255,.12); color: color-mix(in srgb, var(--pc-state, var(--pc-accent)) 78%, #ffffff); box-shadow: inset 0 0 0 1px rgba(255,255,255,.14); }',
      // The buttons on the sky: frosted glass, never a plain filled button.
      // The header's buttons in the banner's top right corner, small frosted rounds, the detail button last.
      '.hero .buttons { position: absolute; z-index: 3; top: 5px; right: 5px; gap: 4px; }',
      '.hero .buttons ha-icon-button, .hero .detail { color: #33506b; background: rgba(255,255,255,.55); border-radius: 50%; box-shadow: inset 0 0 0 1px rgba(255,255,255,.7); }',
      '.hero .buttons ha-icon-button { --mdc-icon-button-size: 24px; --mdc-icon-size: 16px; backdrop-filter: blur(4px); }',
      '.hero.night .buttons ha-icon-button, .hero.night .detail { color: #ffffff; background: rgba(255,255,255,.12); box-shadow: inset 0 0 0 1px rgba(255,255,255,.2); }',
      // Scenery colours, day and night.
      '.scene .sun { fill: #ffd65a; } .scene .moon, .scene .stars { display: none; fill: #f3eed2; }',
      '.night .scene .sun { display: none; } .night .scene .moon, .night .scene .stars { display: inline; } .scene .stars { fill: #ffffff; }',
      '.scene .clouds { fill: #ffffff; opacity: .92; } .night .scene .clouds { opacity: .1; }',
      '.scene .hill { fill: #a7d39f; } .night .scene .hill { fill: #1d3a4a; }',
      '.scene .wall { fill: #f4f6f8; stroke: #cfd7df; stroke-width: .5; } .night .scene .wall { fill: #2a3646; stroke: #3a4759; }',
      '.scene .roof { fill: #ffffff; } .scene .roof.grey { fill: #90a4ae; } .night .scene .roof { fill: #34404f; } .night .scene .roof.grey { fill: #3a4759; }',
      '.scene .eave { fill: none; stroke: var(--pc-accent); stroke-width: 2.2; stroke-linejoin: round; stroke-linecap: round; }',
      '.scene .win { fill: #86b9de; } .night .scene .win { fill: #ffcf6e; }',
      '.scene .door { fill: #8d6e63; transform-box: fill-box; transform-origin: left; } .night .scene .door { fill: #5d4037; }',
      '.scene .awning { fill: #ffa600; } .scene .stripes { stroke: #ffffff; stroke-width: 1.6; }',
      '.scene .box { fill: #e0a85a; stroke: #a86a25; stroke-width: .5; } .scene .tape { stroke: #a86a25; stroke-width: .5; }',
      '.scene .notice rect { fill: #ffffff; stroke: #db4437; stroke-width: .6; } .scene .notice path { stroke: #db4437; stroke-width: 1; stroke-linecap: round; }',
      '.scene .tick circle { fill: #43a047; } .scene .tick path { fill: none; stroke: #ffffff; stroke-width: .9; stroke-linecap: round; stroke-linejoin: round; }',
      '.scene .cargo { fill: #ffffff; stroke: #cfd5db; stroke-width: .5; } .night .scene .cargo { fill: #dfe5ea; }',
      '.scene .stripe { fill: var(--pc-accent); } .scene .cab { fill: #039be5; } .scene .glass { fill: #e3f4fd; } .night .scene .glass { fill: #ffe7a8; }',
      '.scene .beam { fill: #ffe9a0; opacity: 0; } .night .scene .beam { opacity: .35; } .scene .lamp { fill: #ffd54a; }',
      '.scene .wheel { fill: #37474f; stroke: #263238; stroke-width: .6; }',
      // What each scene shows (data-scene on the header): the van, the parcel it carries, the shop, the notice…
      '.scene .shop, .scene .notice, .scene .left, .scene .carried, .scene .van { display: none; }',
      '[data-scene="pickup"] .scene .shop, [data-scene="failed"] .scene .notice, [data-scene="delivered"] .scene .left { display: inline; }',
      '[data-scene="drop"] .scene .carried, [data-scene="drop"] .scene .van, [data-scene="failed"] .scene .van, [data-scene="transit"] .scene .van { display: inline; }',
      // ── Animations of the scene, each one 8 s or a divisor of it, so a recording of 8 s loops.
      '.scene .van { transform: translateX(104px); } .scene .carried { transform: translate(152.5px, 69px); }',
      '.scene .bodywork { animation: parcel-bob .5s ease-in-out infinite; }',
      '[data-scene="drop"] .scene .van, [data-scene="failed"] .scene .van { animation: parcel-stop 8s infinite; }',
      '[data-scene="transit"] .scene .van { animation: parcel-pass 8s linear infinite; }',
      '[data-scene="drop"] .scene .carried { animation: parcel-carry 8s ease-in-out infinite; }',
      '[data-scene="drop"] .scene .door { animation: parcel-door 8s ease-in-out infinite; }',
      '[data-scene="failed"] .scene .notice { animation: parcel-notice 8s ease-in-out infinite; }',
      '.scene .tick { transform-box: fill-box; transform-origin: center; animation: parcel-pop 4s ease-out infinite; }',
      '.scene .waiting { animation: parcel-blink 2s ease-in-out infinite; }',
      '.scene .cloud { animation: parcel-drift 4s ease-in-out infinite alternate; } .scene .cloud.c2 { animation-delay: -2s; animation-direction: alternate-reverse; }',
      '.scene .stars .tw { animation: parcel-blink 4s ease-in-out infinite; }',
      '@keyframes parcel-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-.6px); } }',
      '@keyframes parcel-stop { 0% { transform: translateX(-46px); animation-timing-function: ease-out; } 38%, 62% { transform: translateX(104px); animation-timing-function: ease-in; } 100% { transform: translateX(236px); } }',
      '@keyframes parcel-pass { from { transform: translateX(-46px); } to { transform: translateX(236px); } }',
      '@keyframes parcel-carry { 0%, 42% { transform: translate(118px, 64px) scale(.5); opacity: 0; } 47% { transform: translate(132px, 60px) scale(1); opacity: 1; }' +
        ' 55%, 94% { transform: translate(152.5px, 69px); opacity: 1; } 100% { transform: translate(152.5px, 69px); opacity: 0; } }',
      '@keyframes parcel-door { 0%, 42%, 60%, 100% { transform: scaleX(1); } 46%, 56% { transform: scaleX(.2); } }',
      '@keyframes parcel-notice { 0%, 56% { opacity: 0; transform: rotate(0); } 60% { opacity: 1; transform: rotate(-6deg); } 64% { transform: rotate(5deg); } 68%, 94% { opacity: 1; transform: rotate(0); } 100% { opacity: 0; } }',
      '.scene .notice { transform-box: fill-box; transform-origin: top center; }',
      '@keyframes parcel-pop { 0% { transform: scale(0); } 12% { transform: scale(1.25); } 18%, 100% { transform: scale(1); } }',
      '@keyframes parcel-blink { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }',
      '@keyframes parcel-drift { from { transform: translateX(-7px); } to { transform: translateX(7px); } }',
      // Without background (illustration_background: false): the houses and the van stand on a hairline of the card,
      // without the sky, its sun, moon, stars, clouds and hill, nor the road; texts, icon and buttons take the card's look.
      '.header.hero.bare, .header.hero.bare.night { background: none; --sky-text: var(--primary-text-color); --sky-muted: var(--secondary-text-color); }',
      '.bare .scene .sun, .bare .scene .moon, .bare .scene .stars, .bare .scene .clouds, .bare .scene .hill, .bare .road .marks { display: none; }',
      '.hero.bare .road, .hero.bare.night .road { background: none; box-shadow: inset 0 -1px 0 var(--divider-color, rgba(127,127,127,.25)); }',
      '.hero.bare .logo, .hero.bare.night .logo { color: var(--pc-state, var(--pc-accent)); background: color-mix(in srgb, var(--pc-state, var(--pc-accent)) 16%, transparent); box-shadow: none; }',
      '.hero.bare .buttons ha-icon-button, .hero.bare .detail, .hero.bare.night .buttons ha-icon-button, .hero.bare.night .detail { color: var(--secondary-text-color); background: none; box-shadow: none; }',
      '.hero.bare .head .chip.st, .hero.bare.night .head .chip.st { color: color-mix(in srgb, var(--c) 50%, var(--primary-text-color)); background: color-mix(in srgb, var(--c) 15%, transparent); }',
      '.hero.bare .more, .hero.bare.night .more { box-shadow: 0 0 0 2px var(--card-background-color, #fff); }',
      // A narrow card keeps the sky and the road for its texts: no scenery.
      // Narrow card: no street, the texts take the width; only the title line keeps clear of the corner buttons.
      '.hero { --btns-w: 34px; } .hero:has(.buttons > :nth-child(2)) { --btns-w: 62px; } .hero:has(.buttons > :nth-child(3)) { --btns-w: 90px; }',
      '@container pc-card (max-width: 300px) { ha-card:not(.mini) .hero .scene { display: none; } ha-card:not(.mini) .hero .head { right: 0; padding-right: var(--btns-w); } }',
      '@container pc-card (max-width: 260px) { .hero .head { padding-right: 8px !important; } .hero .trow > .name { margin-right: calc(var(--btns-w) - 8px); } }',
      // ── Tabs, right under the header.
      '.tabs { display: flex; gap: 18px; padding: 0 16px; border-bottom: 1px solid var(--divider-color, rgba(127,127,127,.2)); }',
      '.tab { all: unset; cursor: pointer; padding: 9px 0 7px; font-size: 14px; font-weight: 500; color: var(--secondary-text-color);' +
        ' border-bottom: 2px solid transparent; margin-bottom: -1px; white-space: nowrap; }',
      '.tab .n { font-weight: 400; }',
      '.tab:hover { color: var(--primary-text-color); }',
      '.tab:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }',
      '.tab[aria-selected="true"] { color: var(--primary-text-color); border-bottom-color: var(--pc-accent); }',
      // ── Deliveries: the tiles of the cards (neutral background, tinted round icon, coloured state line).
      '.list { display: flex; flex-direction: column; gap: 6px; padding: 8px 10px 6px; }',
      '.list:empty { display: none; }',
      '.empty { padding: 6px 4px; font-size: 13px; color: var(--secondary-text-color); }',
      '.delivery { padding: 8px 10px 8px 8px; cursor: pointer; border-radius: 12px; background: var(--secondary-background-color, rgba(127,127,127,.1)); transition: background .2s; }',
      '.delivery:hover { background: color-mix(in srgb, var(--c) 12%, var(--secondary-background-color, transparent)); }',
      '.desc:focus-visible, .tracking:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; border-radius: 4px; }',
      '.row { display: flex; align-items: flex-start; gap: 10px; }',
      '.pill { position: relative; flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center;' +
        ' color: var(--c); background: color-mix(in srgb, var(--c) 18%, transparent); --mdc-icon-size: 24px; }',
      // The state badge of every tile, on the icon's corner (red for an alert, without tinting the tile).
      '.pill .badge { position: absolute; right: -1px; bottom: -1px; width: 10px; height: 10px; border-radius: 50%; background: var(--c);' +
        ' box-shadow: 0 0 0 2px var(--secondary-background-color, var(--card-background-color, #fff)); }',
      '.pill .draw { width: 24px; height: 24px; fill: none; stroke: currentColor; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round;' +
        ' stroke-dasharray: 20; animation: parcel-draw 4s ease-out infinite; }',
      '.s-out_for_delivery .pill { animation: parcel-ping 2s ease-out infinite; }',
      '.s-out_for_delivery .pill ha-icon { animation: parcel-bob-icon 1s ease-in-out infinite; }',
      '.main { flex: 1; min-width: 0; }',
      '.line1 { display: flex; min-width: 0; }',
      '.desc { min-width: 0; max-width: 100%; font-size: 14px; font-weight: 500; line-height: 1.3; color: var(--primary-text-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }',
      // State texts are mixed with the text colour to stay readable (WCAG 4.5:1); the state colour stays on the icon.
      '.state { font-size: 12.5px; line-height: 1.3; color: color-mix(in srgb, var(--c) 70%, var(--primary-text-color)); overflow-wrap: anywhere; }',
      '.done .state, .s-info_received .state, .s-unknown .state, .s-frozen .state, .s-not_found .state { color: var(--secondary-text-color); }',
      '.done .state .label { color: color-mix(in srgb, var(--c) 70%, var(--primary-text-color)); }',
      '.s-failed_attempt .state .label, .s-exception .state .label { display: inline-block; animation: parcel-shake 4s ease-in-out infinite; }',
      '.line3 { font-size: 12px; line-height: 1.3; color: var(--secondary-text-color); margin-top: 1px; overflow-wrap: anywhere; }',
      // Out for delivery: a van runs along the last part of the way.
      '.track { position: relative; height: 3px; margin: 10px 18px 4px 0; border-radius: 2px; background: color-mix(in srgb, var(--c) 22%, transparent); }',
      '.track .fill { position: absolute; inset: 0 auto 0 0; width: 78%; border-radius: 2px; background: var(--c); animation: parcel-way 4s ease-in-out infinite; }',
      '.track ha-icon { position: absolute; top: -9px; left: 74%; --mdc-icon-size: 16px; color: var(--c); animation: parcel-van 4s ease-in-out infinite; }',
      '.chips { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 5px; }',
      '.chip { display: inline-flex; align-items: center; gap: 3px; max-width: 100%; box-sizing: border-box; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;' +
        ' font-size: 11.5px; font-weight: 500; line-height: 18px; padding: 0 7px; border-radius: 999px; --mdc-icon-size: 12px; }',
      '.chip.expected { color: color-mix(in srgb, var(--c) 60%, var(--primary-text-color)); background: color-mix(in srgb, var(--c) 15%, transparent); }',
      '.chip.carrier { color: var(--secondary-text-color); background: color-mix(in srgb, var(--secondary-text-color) 13%, transparent); font-weight: 400; }',
      '.tracking { font-family: var(--code-font-family, monospace); cursor: copy; overflow: hidden; text-overflow: ellipsis; }',
      '.tracking.copied::after { content: " ✓"; color: var(--primary-text-color); }',
      '.date { color: var(--secondary-text-color); font-size: 12px; }',
      '.chevron { flex: none; color: var(--secondary-text-color); margin-top: 8px; transition: transform .2s ease; }',
      '.chevron.closed { transform: rotate(-90deg); }',
      '.events { list-style: none; margin: 6px 0 0 50px; padding: 0 0 0 12px; border-left: 2px solid color-mix(in srgb, var(--c) 35%, transparent); font-size: 12px; color: var(--primary-text-color); }',
      '.events li { margin: 4px 0; }',
      '.additional { color: var(--secondary-text-color); }',
      '@keyframes parcel-ping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--c) 50%, transparent); } 70%, 100% { box-shadow: 0 0 0 8px transparent; } }',
      '@keyframes parcel-bob-icon { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1.5px); } }',
      '@keyframes parcel-draw { 0%, 20% { stroke-dashoffset: 20; } 45%, 100% { stroke-dashoffset: 0; } }',
      '@keyframes parcel-shake { 0%, 80%, 100% { transform: translateX(0); } 84% { transform: translateX(-2px); } 88% { transform: translateX(2px); } 92% { transform: translateX(-1px); } }',
      '@keyframes parcel-way { 0% { width: 30%; } 60%, 100% { width: 78%; } }',
      '@keyframes parcel-van { 0% { left: 26%; } 60%, 100% { left: 74%; } }',
      // ── Add form, under the header.
      '.form { padding: 10px 12px 4px; display: flex; flex-direction: column; gap: 6px; }',
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
      // ── Mini card: a 240 px preferred width, a lower banner with the featured parcel, the detail button top right.
      ':host([mini])::before { grid-template-columns: minmax(0, 240px); }',
      'ha-card.mini { padding: 0; }',
      'ha-card.mini .header.hero { --scene-max: 36%; }',
      'ha-card.mini .header:not(.hero) { padding-bottom: 12px; }',
      '.detail { all: unset; flex: none; cursor: pointer; width: 26px; height: 26px; border-radius: 50%; align-self: flex-start;' +
        ' display: grid; place-items: center; color: var(--secondary-text-color); --mdc-icon-size: 16px; }',
      '.hero > .detail { position: absolute; z-index: 3; top: 5px; right: 5px; }',
      // Classic header: the mini card's detail button in the card's top right corner, out of the title row.
      'ha-card.mini .header:not(.hero) { padding-right: 40px; }',
      '.header:not(.hero) > .detail { position: absolute; top: 8px; right: 8px; box-shadow: inset 0 0 0 1px var(--divider-color, rgba(127,127,127,.3)); }',
      '.hero .detail { width: 24px; height: 24px; align-self: center; backdrop-filter: blur(4px); }',
      '.detail:hover { background: color-mix(in srgb, var(--secondary-text-color) 14%, transparent); color: var(--primary-text-color); }',
      '.hero .detail:hover { background: rgba(255,255,255,.75); } .hero.night .detail:hover { background: rgba(255,255,255,.22); }',
      '.detail:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 1px; }',
      '.next { flex: 1 1 0; min-width: 0; display: flex; flex-direction: column; gap: 1px; }',
      '.next .name { font-size: 17px; line-height: 22px; }',
      'ha-card.mini .hero .head { gap: 8px; padding-left: 12px; }',
      '.next .l2 { font-size: 12.5px; line-height: 16px; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--sky-muted, var(--secondary-text-color)); }',
      // The other parcels on the way: a count badge on the icon's corner, the Parcel accent.
      '.mark { position: relative; flex: none; display: flex; }',
      '.more { position: absolute; right: -5px; bottom: -3px; min-width: 18px; height: 18px; box-sizing: border-box; padding: 0 5px; border-radius: 9px;' +
        ' font-size: 11px; font-weight: 500; line-height: 18px; text-align: center; color: #ffffff; background: var(--pc-accent);' +
        ' box-shadow: 0 0 0 2px var(--card-background-color, #fff); }',
      '.hero .more { box-shadow: 0 0 0 2px rgba(255,255,255,.85); } .hero.night .more { box-shadow: 0 0 0 2px #15284a; }',
      // The state pill of the featured parcel, on the sky: frosted glass under the tint.
      '.hero .head .chip.st { color: color-mix(in srgb, var(--c) 45%, #0d2a45); background: color-mix(in srgb, var(--c) 18%, rgba(255,255,255,.78)); }',
      '.hero.night .head .chip.st { color: color-mix(in srgb, var(--c) 35%, #ffffff); background: color-mix(in srgb, var(--c) 30%, rgba(8,18,38,.55)); }',
      'ha-card.mini .hero .head { padding-right: 8px; }',
      // A very narrow mini card keeps the sky for its texts, up to the detail button.
      '@container pc-card (max-width: 280px) { ha-card.mini .hero .scene { display: none; } ha-card.mini .hero .head { right: 0; padding-right: var(--btns-w); } }',
      '@media (prefers-reduced-motion: reduce) { .scene *, .pill, .pill *, .state .label, .track *, .refresh-btn.spinning ha-icon { animation: none !important; }' +
        ' .pill .draw { stroke-dasharray: none; } .chevron, .delivery { transition: none; } }',
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
// A lower illustrated banner with the featured parcel (parcelFeatured), like the next flight of the flight board.
// Its detail button (top right) switches to the full card and back; a click outside the card folds it back.
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
        { name: 'show_title', selector: { boolean: {} } },
        { name: 'show_delivered', selector: { boolean: {} } },
        { name: 'show_refresh', selector: { boolean: {} } },
        { name: 'show_add', selector: { boolean: {} } },
        { name: 'illustration', selector: { boolean: {} } },
        { name: 'illustration_background', selector: { boolean: {} } },
      ],
    },
    {
      name: 'illustration_theme',
      selector: {
        select: {
          mode: 'dropdown',
          options: [
            { value: 'auto', label: t.theme_auto },
            { value: 'day', label: t.theme_day },
            { value: 'night', label: t.theme_night },
          ],
        },
      },
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
    description: 'Deliveries tracked in Parcel under an animated street, with a form to add one.',
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
    description: 'The featured delivery on an animated street, with a button to show the full Parcel card.',
    preview: true,
    documentationURL: 'https://github.com/juju35/ha-parcel',
  });
}
if (parcelDefined) {
  console.info(`%c PARCEL-CARD %c v${PARCEL_CARD_VERSION} `, 'color:#fff;background:#f59e0b;font-weight:700', 'color:#f59e0b;background:#fff');
}
