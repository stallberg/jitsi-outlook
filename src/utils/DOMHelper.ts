// SPDX-FileCopyrightText: 2023 Havs- och vattenmyndigheten
//
// SPDX-License-Identifier: MIT

import getLocalizedStrings from "../localization";
import Config, { defaultFontFamily, defaultMeetJitsiUrl } from "../models/Config";
import { videoCameraURI } from "./IconHelper";
import { getConferencePin, getNumbersForCalling } from "./SIPHelper";
import { getJitsiUrl } from "./URLHelper";

const DIV_ID_JITSI = "jitsi-link";

export const combineBodyWithJitsiDiv = async (body: string, config: Config): Promise<string> => {
  const jitsiUrl = getJitsiUrl(config);

  const linkDOM = await getJitsiLinkDiv(jitsiUrl, config);
  const parser = new DOMParser();

  const bodyString = `
        ${body}
        ${linkDOM}
    `;

  const combinedDOM = parser.parseFromString(bodyString, "text/html");

  return combinedDOM.body.innerHTML;
};

export const bodyHasJitsiLink = (body: string, config: Config): boolean => {
  const baseUrl = config.baseUrl ?? defaultMeetJitsiUrl;
  const urlRegex = new RegExp(baseUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return urlRegex.test(body);
};

export const overwriteJitsiLinkDiv = async (body: Document, config: Config): Promise<string> => {
  const jitsiUrl = getJitsiUrl(config);

  const jitsiLink = body.querySelector(`[id*="${DIV_ID_JITSI}"]`);
  const newJitsiLink = await getJitsiLinkDiv(jitsiUrl, config);
  jitsiLink.outerHTML = newJitsiLink;

  const updatedHtmlString = body.body.innerHTML;
  return updatedHtmlString;
};

export const getJitsiLinkDiv = async (jitsiUrl: string, config: Config) => {
  const localizedStrings = getLocalizedStrings();

  const tdStyles = "padding-right: 10px; vertical-align: middle; background-color: transparent;";
  const fontFamily = config.fontFamily ?? defaultFontFamily;

  return `
    <div id="${DIV_ID_JITSI}" style="font-family: '${fontFamily}';">
        <span style="font-size: 14px; font-weight: 700;">
            ${localizedStrings.connectToMeeting}
        </span>
        <table style="border-collapse: collapse; margin-top: 6px; background-color: transparent;">
            <tr>
                <td style="${tdStyles}">
                    <img
                        style="vertical-align: middle;"
                        width="18"
                        height="18"
                        src=${videoCameraURI}
                    />
                </td>
                <td style="${tdStyles}">
                    <a
                        aria-label="${localizedStrings.linkToMeeting}" 
                        title="${localizedStrings.linkToMeeting}" 
                        alt=${localizedStrings.linkToMeeting} 
                        style="font-size: 12px;" 
                        href="${jitsiUrl}">
                        ${jitsiUrl}
                    </a>
                </td>
            </tr>
        </table>
        <br />
        ${
          config.enableSipPhoneIntegration && config.sipPhoneNumbersUrl
            ? `
            <span style="font-size: 14px; font-weight: 700;">
              ${localizedStrings.connectWithPhone}
            </span>
            <br />
            <span style="font-size: 12px;">
              ${localizedStrings.phoneNumber}: ${await getNumbersForCalling(config)}
            </span>
            <br />
            <span style="font-size: 12px;">
              ${localizedStrings.conferencePin}: ${await getConferencePin(jitsiUrl, config)}
            </span>
            <br />
            `
            : ""
        }
        ${
          config.additionalText
            ? `
            <br />
            <span style="font-size: 0.8em; font-style: italic;">
                ${config.additionalText}
            </span>
            `
            : ""
        }
    </div>
  `;
};
