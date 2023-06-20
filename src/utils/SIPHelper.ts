import Config from "../models/Config";
import { Numbers, Pin } from "../models/SIP";
import { extractHostnameFromJistiUrl, extractRoomNameFromJitsiUrl, getConferenceMapperUrl } from "./URLHelper";

export const getNumbersForCalling = async (config: Config) => {
  const res = await fetch(config.sipPhoneNumbersUrl);
  const data: Numbers = await res.json();
  return data.numbers.Sweden;
};

export const getConferencePin = async (jitsiUrl: string, config: Config) => {
  const room = extractRoomNameFromJitsiUrl(jitsiUrl);
  const hostname = extractHostnameFromJistiUrl(jitsiUrl);
  const conferenceMapperUrl = getConferenceMapperUrl(config);
  const res = await fetch(`${conferenceMapperUrl}?conference=${room}@${hostname}`);
  const data: Pin = await res.json();
  return data.id;
};
