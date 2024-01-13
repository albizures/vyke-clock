import { r } from "@vyke/results";

import { timezoneItemBtn } from "./clockIds";
import { selectIn } from "./html";
import { formatTimezone } from "./timezone";

type TimezoneHandlerArgs = {
  currentTimezone: string;
  cancelBtn: HTMLButtonElement;
  templateItem: HTMLTemplateElement;
  list: HTMLUListElement;
  onClose: (value: string) => void;
};

export function timezoneHandler(args: TimezoneHandlerArgs) {
  const { cancelBtn, onClose, list, templateItem, currentTimezone } = args;

  function close(timezone: string) {
    cancelBtn.onclick = null;
    onClose(timezone);
    list.innerHTML = "";
  }

  for (const timezone of Intl.supportedValuesOf("timeZone")) {
    const item = templateItem.content.cloneNode(true) as HTMLLIElement;

    const [btn] = r.unwrap(selectIn(item, timezoneItemBtn));

    btn.textContent = formatTimezone(timezone);

    btn.onclick = () => {
      close(timezone);
    };

    list.append(item);
  }

  cancelBtn.onclick = () => {
    cancelBtn.onclick = null;

    close(currentTimezone);
  };
}
