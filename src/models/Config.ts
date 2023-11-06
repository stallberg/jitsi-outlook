// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: MIT

export const defaultMeetJitsiUrl = "https://meet.jit.si/";
export const defaultConferenceMapperUrl = "https://jitsi-api.jitsi.net/conferenceMapper";
export const defaultFontFamily = "Arial";

interface Config {
  baseUrl?: string;
  additionalText?: string;
  meetingUrl?: {
    startWithAudioMuted?: boolean;
    startWithVideoMuted?: boolean;
  };
  meetingLocation?: string;
  enableSipPhoneIntegration?: boolean;
  sipPhoneNumbersUrl?: string;
  sipConferenceMapperUrl?: string;
  fontFamily?: string;
}

export default Config;
