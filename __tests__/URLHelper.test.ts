// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: MIT

import Config, { defaultConferenceMapperUrl, defaultMeetJitsiUrl } from "../src/models/Config";
import { getRandomRoomName, getConfigUrl, getJitsiUrl, extractRoomNameFromJitsiUrl, extractHostnameFromJistiUrl, getConferenceMapperUrl } from "../src/utils/URLHelper";

describe("getRandomRoomName", () => {
  it("should return a string of length 16", () => {
    const roomName = getRandomRoomName();
    expect(roomName).toHaveLength(16);
  });
});

describe("getConfigUrl", () => {
  it("should return an empty string if config.meetingUrl is not provided", () => {
    const config: Config = {};
    const configUrl = getConfigUrl(config);
    expect(configUrl).toBe("");
  });

  it("should return the correct config URL if config.meetingUrl is provided", () => {
    const config: Config = {
      meetingUrl: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
      },
    };
    const configUrl = getConfigUrl(config);
    expect(configUrl).toBe("#config.startWithAudioMuted=true&config.startWithVideoMuted=true&");
  });
});

describe("getJitsiUrl", () => {
  it("should use defaultMeetJitsiUrl if config.baseUrl is not provided", () => {
    const config: Config = {};
    const jitsiUrl = getJitsiUrl(config);
    expect(jitsiUrl).toContain(defaultMeetJitsiUrl);
  });

  it("should use config.baseUrl if provided", () => {
    const config: Config = {
      baseUrl: "https://my-custom-base-url.com/",
    };
    const jitsiUrl = getJitsiUrl(config);
    expect(jitsiUrl).toContain(config.baseUrl);
  });

  it("should append the random room name and config URL", () => {
    const config: Config = {
      baseUrl: "https://my-custom-base-url.com/",
      meetingUrl: {
        startWithAudioMuted: true,
        startWithVideoMuted: true,
      },
    };
    const jitsiUrl = getJitsiUrl(config);
    expect(jitsiUrl).toContain(config.baseUrl);
    expect(jitsiUrl).toContain(getConfigUrl(config));
  });
});

describe("extractRoomNameFromJitsiUrl", () => {
  it("should extract jitsi room name from jitsi url", () => {
    const roomName = "customRoom";
    const jitsiUrl = `https://my-custom-base-url.com/${roomName}`;
    expect(extractRoomNameFromJitsiUrl(jitsiUrl)).toBe(roomName);
  });
});

describe("extractHostnameFromJistiUrl", () => {
  it("should extract hostname from jitsi url", () => {
    const hostname = "my-custom-base-url.com";
    const config: Config = {
      baseUrl: `https://${hostname}/`,
    };
    const jitsiUrl = getJitsiUrl(config);

    expect(extractHostnameFromJistiUrl(jitsiUrl)).toBe(hostname);
  });
});

describe("getConferenceMapperUrl", () => {
  it("should return default conference mapper URL", () => {
    const config: Config = {};
    expect(getConferenceMapperUrl(config)).toBe(defaultConferenceMapperUrl);
  });

  it("should return custom conference mapper URL if specified in config", () => {
    const config: Config = {
      sipConferenceMapperUrl: "https://api.test.com/conferenceMapper",
    };
    expect(getConferenceMapperUrl(config)).toBe(config.sipConferenceMapperUrl);
  });
});
