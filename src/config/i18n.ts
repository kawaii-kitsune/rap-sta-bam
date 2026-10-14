export const locales = ["el", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "el";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const dictionaries = {
  el: {
    nav: {
      home: "Αρχική",
      episodes: "Sessions",
      artists: "Το crew",
      products: "Releases",
      about: "Το project",
      contact: "Μίλα μας"
    },
    common: {
      skipToContent: "Μετάβαση στο περιεχόμενο",
      available: "Διαθέσιμο",
      upcoming: "Σύντομα",
      backToHome: "Επιστροφή στην αρχική",
      backToEpisode: "Πίσω στο επεισόδιο",
      viewEpisodes: "Δες τα επεισόδια",
      allEpisodes: "Όλα τα sessions",
      openSession: "Μέσα στο επεισόδιο",
      preview: "Προεπισκόπηση",
      nextRelease: "Επόμενη κυκλοφορία",
      listenAudio: "Ακρόαση σε mp3",
      watchVideo: "Προβολή video",
      photos: "Φωτογραφίες",
      credits: "Συντελεστές",
      gear: "Εξοπλισμός",
      facts: "Στοιχεία",
      open: "Άνοιγμα",
      listen: "Ακρόαση",
      support: "Στήριξη",
      languageName: "Ελληνικά",
      switchLanguage: "English",
      searchPlaceholder: "Αναζήτηση (καλλιτέχνης, στίχοι, εξοπλισμός)...",
      searchLabel: "Αναζήτηση",
      podcastBadge: "Άκου το Podcast στο Spotify",
      shareEpisode: "Κοινοποίηση",
      linkCopied: "Ο σύνδεσμος αντιγράφηκε!",
      copyLink: "Αντιγραφή link"
    },
    cookie: {
      title: "Η επιλογή σου για τα cookies",
      copy: "Αποθηκεύουμε την επιλογή σου. Με τη συγκατάθεσή σου, χρησιμοποιούμε στατιστικά επισκέψεων και ακρόασης για να βελτιώνουμε το site.",
      more: "Περισσότερα",
      necessary: "Μόνο απαραίτητα",
      accept: "Αποδοχή στατιστικών"
    },
    audio: {
      lockedTitle: "Το audio θα είναι διαθέσιμο στην πρεμιέρα",
      lockedStart: "Θα ανοίξει στις",
      lockedEnd: "μαζί με τη δημοσίευση του επεισοδίου. Θα μπορείς να ακούσεις ολόκληρο το session",
      withCaptions: " με συγχρονισμένους υπότιτλους",
      unsupported: "Το πρόγραμμα περιήγησης δεν υποστηρίζει audio playback.",
      description: "Πλήρες επεισόδιο με απλά χειριστήρια ακρόασης.",
      play: "Αναπαραγωγή",
      pause: "Παύση",
      mute: "Σίγαση",
      unmute: "Κατάργηση σίγασης",
      failed: "Η φόρτωση απέτυχε",
      buffering: "Φόρτωση…",
      playing: "Παίζει τώρα",
      ready: "Έτοιμο για ακρόαση",
      loading: "Φόρτωση audio…",
      playbackTime: "Χρόνος αναπαραγωγής",
      playShortcut: "Space: Αναπαραγωγή / Παύση",
      muteShortcut: "M: Σίγαση",
      transcriptShortcut: "C: Κείμενο",
      error: "Δεν ήταν δυνατή η φόρτωση του audio. Έλεγξε τη σύνδεσή σου και δοκίμασε ξανά.",
      retry: "Δοκίμασε ξανά",
      captions: "Υπότιτλοι",
      collapse: "Σύμπτυξη",
      transcript: "Όλο το κείμενο",
      captionsError: "Οι υπότιτλοι δεν φορτώθηκαν. Η ακρόαση παραμένει διαθέσιμη.",
      captionsReady: "Οι υπότιτλοι εμφανίζονται κατά την ακρόαση.",
      captionsLoading: "Φόρτωση υποτίτλων…"
    },
    contact: {
      heading: "Στείλε μας ένα μήνυμα",
      note: "Τα πεδία με * είναι υποχρεωτικά.",
      name: "Ονοματεπώνυμο",
      email: "Email",
      topic: "Θέμα",
      topicSelect: "Διάλεξε θέμα",
      message: "Μήνυμα",
      send: "Αποστολή μηνύματος",
      sending: "Αποστολή...",
      success: "Το μήνυμά σου στάλθηκε επιτυχώς! Θα επικοινωνήσουμε σύντομα.",
      error: "Παρουσιάστηκε σφάλμα κατά την αποστολή. Δοκίμασε ξανά ή στείλε απευθείας email."
    },
    footer: {
      tagline: "Ανεξάρτητη DIY μουσική σειρά από το Ηράκλειο Κρήτης.",
      aboutTitle: "Ραπ Στα Μπαμ",
      rights: "Όλα τα δικαιώματα διατηρούνται."
    }
  },
  en: {
    nav: {
      home: "Home",
      episodes: "Sessions",
      artists: "The Crew",
      products: "Releases",
      about: "About",
      contact: "Contact"
    },
    common: {
      skipToContent: "Skip to main content",
      available: "Live",
      upcoming: "Coming Soon",
      backToHome: "Back to Home",
      backToEpisode: "Back to Episode",
      viewEpisodes: "Explore Sessions",
      allEpisodes: "All Sessions",
      openSession: "Watch Session",
      preview: "Preview",
      nextRelease: "Upcoming Session",
      listenAudio: "Listen in MP3",
      watchVideo: "Watch Video",
      photos: "Photos",
      credits: "Credits",
      gear: "Studio Gear",
      facts: "Key Facts",
      open: "Open",
      listen: "Listen",
      support: "Support",
      languageName: "English",
      switchLanguage: "Ελληνικά",
      searchPlaceholder: "Search (artist, lyrics, gear)...",
      searchLabel: "Search",
      podcastBadge: "Listen on Spotify Podcast",
      shareEpisode: "Share",
      linkCopied: "Link copied!",
      copyLink: "Copy link"
    },
    cookie: {
      title: "Your Cookie Preferences",
      copy: "We store your choice. With your consent, we use anonymous analytics to measure visits and listen times to continuously improve the site.",
      more: "Learn More",
      necessary: "Essential Only",
      accept: "Accept Analytics"
    },
    audio: {
      lockedTitle: "Audio will be available at the premiere",
      lockedStart: "Available on",
      lockedEnd: "when the episode is released. You can listen to the entire session",
      withCaptions: " with synchronized Greek captions",
      unsupported: "Your browser does not support audio playback.",
      description: "Full episode with simple playback controls.",
      play: "Play",
      pause: "Pause",
      mute: "Mute",
      unmute: "Unmute",
      failed: "Audio failed to load",
      buffering: "Buffering…",
      playing: "Now playing",
      ready: "Ready to listen",
      loading: "Loading audio…",
      playbackTime: "Playback position",
      playShortcut: "Space: Play / Pause",
      muteShortcut: "M: Mute",
      transcriptShortcut: "C: Transcript",
      error: "Audio could not be loaded. Check your connection and try again.",
      retry: "Try again",
      captions: "Greek captions",
      collapse: "Collapse",
      transcript: "Full transcript",
      captionsError: "Captions could not be loaded. Audio is still available.",
      captionsReady: "Greek captions appear during playback.",
      captionsLoading: "Loading captions…"
    },
    contact: {
      heading: "Send Us a Message",
      note: "Fields marked with * are required.",
      name: "Full Name",
      email: "Email Address",
      topic: "Subject",
      topicSelect: "Select Subject",
      message: "Message",
      send: "Send Message",
      sending: "Sending...",
      success: "Your message has been sent successfully! We will get back to you soon.",
      error: "An error occurred while sending. Please try again or email us directly."
    },
    footer: {
      tagline: "Independent DIY hip-hop documentary & studio series from Heraklion, Crete.",
      aboutTitle: "Rap Sta Bam",
      rights: "All rights reserved."
    }
  }
} as const;

export function getDictionary(locale: string = defaultLocale) {
  return dictionaries[locale === "en" ? "en" : "el"];
}
