// Edit everything about the invitation here — names, dates, venues, copy.
// Every component reads from this single file, so this is the only place
// you should need to touch to make the site your own.

const weddingData = {
  couple: {
    brideFirst: 'Arna',
    groomFirst: 'Ayan',
    brideFull: 'Arna Madhupurwala',
    brideParents: 'Adib & Rubina Madhupurwala',
    groomFull: 'Ayan Banglawala',
    groomParents: 'Firoz & Rukshana Banglawala',
  },

  nikahDate: '2026-11-05T19:00:00',
  nikahDateLabel: 'November 5, 2026',
  nikahDayLabel: 'Thursday · 07:00 PM',

  blessedBeginning: {
    heading: 'A Blessed Beginning',
    copy: "With hearts full of gratitude, we warmly invite you to join us as we celebrate this beautiful beginning with the love, prayers, and blessings of our families.",
  },

  gallery: [
    { caption: 'The proposal' },
    { caption: 'Family blessings' },
    { caption: 'Together, always' },
  ],

  timeline: [
    { time: '6:30 PM', title: 'Guest Arrival' },
    { time: '07:00 PM', title: 'Nikah Ceremony', note: 'Solemnisation & duas' },
    { time: '07:30 PM', title: 'Blessings', note: 'Family greetings & photographs' },
    { time: '09:00 PM', title: 'Dinner', note: 'A feast shared with love' },
  ],

  venue: {
    name: 'Zaveri Hall',
    address: 'Opp. Diwan ballu high school, Paldi, Ahmedabad',
    mapQuery: 'Zaveri Hall Ahmedabad',
  },

  dressCode: {
    swatches: ['#1c0a08', '#59101c', '#a1202f', '#cf9f52', '#faf6ee'],
    copy: "We'd love to see you in these hues — traditional attire and white or ivory are equally welcome.",
  },

  festivities: [
    { name: 'Mehendi', when: 'November 3 · 4:00 PM', where: "Groom's Residence", mapQuery: "Groom's Residence" },
    { name: 'Rukhsati day', when: 'November 5 · 9:00 PM', where: "Zaveri Hall, Paldi", mapQuery: "https://maps.app.goo.gl/zAxevfwRVpk9EaM78" },
    { name: 'Walima', when: 'Noverember 6 · 9:00 PM', where: 'Zaveri Hall, Paldi', mapQuery: 'https://maps.app.goo.gl/zAxevfwRVpk9EaM78' },
  ],

  ourStory: [
    { year: 'September, 2023', title: 'First meeting', copy: 'A mutual friend\u2019s gathering, a shared Burgers, and a conversation that outlasted the evening.' },
    { year: 'November, 2023', title: 'Families meet', copy: 'Two families sat down over juice and found they already agreed on everything that mattered.' },
    { year: 'November, 2023', title: 'The proposal', copy: 'Under the same string lights from that first evening, Ayan asked, and Arna already knew her answer.' },
    { year: 'February, 2025', title: 'Qubool Hai', copy: 'And now, with your prayers, we begin our forever.' },
    { year: 'November, 2026', title: 'Walima', copy: 'A new chapter begins in the life of Arna & Ayan.' },
  ],

  rsvp: {
    heading: 'Will you join us?',
    copy: 'Kindly let us know by November 1st so we can save your place at the table.',
    deadline: 'RSVP by November 1, 2026',
  },

  footer: {
    label: 'With all our hearts',
    heading: 'Your presence is our present',
    copy: 'Your love and prayers are the greatest gifts we could ever ask for.',
  },
}

export default weddingData
