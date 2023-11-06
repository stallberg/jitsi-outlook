// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: MIT

interface LocalizedStrings {
  connectToMeeting: string;
  linkToMeeting: string;
  connectWithPhone: string;
  conferencePin: string;
  phoneNumber: string;
}

const getLocalizedStrings = (): LocalizedStrings => {
  const myLanguage = typeof Office !== "undefined" ? Office.context.displayLanguage : "en";

  if (/sv/.test(myLanguage)) {
    return {
      connectToMeeting: "Anslut till mötet",
      linkToMeeting: "Länk till mötet",
      connectWithPhone: "Anslut via telefon",
      conferencePin: "Konferens-ID (PIN)",
      phoneNumber: "Telefonnummer",
    };
  } else if (/de/.test(myLanguage)) {
    return {
      connectToMeeting: "Verbinden",
      linkToMeeting: "Link zum Treffen",
      connectWithPhone: "Verbinden per Telefon",
      conferencePin: "Konferenz-ID (PIN)",
      phoneNumber: "Telefonnummer",
    };
  } else if (/nl/.test(myLanguage)) {
    return {
      connectToMeeting: "Verbinden met vergadering",
      linkToMeeting: "Link naar vergadering",
      connectWithPhone: "Maak verbinding via de telefoon",
      conferencePin: "Conferentie-ID",
      phoneNumber: "Telefoonnummer",
    };
  } else {
    // Default to english
    return {
      connectToMeeting: "Connect to meeting",
      linkToMeeting: "Link to meeting",
      connectWithPhone: "Connect via phone",
      conferencePin: "Conference-ID (PIN)",
      phoneNumber: "Phone number",
    };
  }
};

export default getLocalizedStrings;
