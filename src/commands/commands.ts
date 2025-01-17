// SPDX-FileCopyrightText: Microsoft Corporation
//
// SPDX-License-Identifier: MIT

import configJson from "../../config.json";
import Config from "../models/Config";
import { bodyHasJitsiLink, combineBodyWithJitsiDiv, overwriteJitsiLinkDiv } from "../utils/DOMHelper";

/* global global, Office, self, window */

Office.initialize = function () {};

const setMeetingLocation = (location: string, event: Office.AddinCommands.Event) => {
  Office.context.mailbox.item.location.setAsync(location, {}, () => {
    event.completed();
  });
};

const setData = (str: string, event: Office.AddinCommands.Event) => {
  Office.context.mailbox.item.body.setAsync(
    str,
    {
      coercionType: Office.CoercionType.Html,
    },
    () => {
      event.completed();
    }
  );
};

const addJitsiLink = (event: Office.AddinCommands.Event) => {
  const config = configJson as Config;

  Office.context.mailbox.item.body.getAsync(Office.CoercionType.Html, async (result) => {
    if (result.error) {
      event.completed();
    }

    try {
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(result.value, "text/html");
      const bodyDOM = bodyHasJitsiLink(result.value, config) ? await overwriteJitsiLinkDiv(htmlDoc, config) : await combineBodyWithJitsiDiv(result.value, config);
      setData(bodyDOM, event);
      // Update meeting location if configured
      if (config.meetingLocation) {
        setMeetingLocation(config.meetingLocation, event);
      }
    } catch (error) {
      // If it fails to manipulate the DOM with a new link it will fallback to its original state
      setData(result.value, event);
    }
  });
};

Office.actions.associate("insertJitsiLink", addJitsiLink);
