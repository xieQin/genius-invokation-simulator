// eslint-disable-next-line import/no-unresolved
import { pwaInfo } from "virtual:pwa-info";
// eslint-disable-next-line import/no-unresolved
import { useRegisterSW } from "virtual:pwa-register/react";

import styles from "./index.module.css";

// eslint-disable-next-line no-console
// console.log(pwaInfo);

function ReloadPrompt() {
  // replaced dynamically
  const buildDate = import.meta.env.VITE_APP_BUILD_DATE;
  // replaced dyanmicaly
  const reloadSW = import.meta.env.VITE_RELOAD_SW;

  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      // eslint-disable-next-line no-console
      console.log(`Service Worker at: ${swUrl}`);
      if (reloadSW === "true") {
        r &&
          setInterval(() => {
            // eslint-disable-next-line no-console
            console.log("Checking for sw update");
            r.update();
          }, 10000);
      } else {
        // eslint-disable-next-line prefer-template,no-console
        console.log("SW Registered: " + r);
      }
    },
    onRegisterError(error) {
      // eslint-disable-next-line no-console
      console.log("SW registration error", error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className={styles["ReloadPrompt-container"]}>
      {(offlineReady || needRefresh) && (
        <div className={styles["ReloadPrompt-toast"]}>
          <div className={styles["ReloadPrompt-message"]}>
            {offlineReady ? (
              <span>App ready to work offline</span>
            ) : (
              <span>
                New content available, click on reload button to update.
              </span>
            )}
          </div>
          {needRefresh && (
            <button
              className={styles["ReloadPrompt-toast-button"]}
              onClick={() => updateServiceWorker(true)}
            >
              Reload
            </button>
          )}
          <button
            className={styles["ReloadPrompt-toast-button"]}
            onClick={() => close()}
          >
            Close
          </button>
        </div>
      )}
      <div className={styles["ReloadPrompt-date"]}>{buildDate}</div>
    </div>
  );
}

export default ReloadPrompt;
