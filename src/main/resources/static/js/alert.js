


function openAlertModal() {
  closeChatroomModal();

  const alert_btn = document.querySelector(".alert-btn");
  const alert_layer = document.querySelector(".alert-layer");

  fetchAlertContent(1);

  fadeIn(alert_layer);
  alert_btn.onclick = () => closeAlertModal();

}

function closeAlertModal() {
  const alert_btn = document.querySelector(".alert-btn");
  const alert_layer = document.querySelector(".alert-layer");

  alert_btn.onclick = () => openAlertModal();
  fadeOut(alert_layer);
  setTimeout(function () {
    alert_layer.innerHTML = "";
  }, 500);
}

function fetchAlertContent(pageNo) {
  fetch(`/alert/listByUser?pageNo=${pageNo}`)
    .then(response => response.json())
    .then(alerts => {
      if (alerts && alerts.length > 0) {
        const alert_layer = document.querySelector(".alert-layer");

        alerts.forEach(alert => {
          const box = document.createElement("div");
          box.className = alert.read == 1 ? "alert-box read" : "alert-box unread";
          box.id = `alert-${alert.no}`;

          const content = document.createElement("span");
          content.className = "alert-content";
          content.innerHTML = alert.content;

          const time = document.createElement("span");
          time.className = "alert-time";
          time.innerHTML = calcTime(alert.date);

          box.append(content, time);
          box.onclick = () =>
            alert.read == 1
              ? location.href = content.childNodes[0].href
              : (updateRead(alert.no), location.href = content.childNodes[0].href);
          alert_layer.append(box);
        })
      }
    })
    .catch(error => {
      console.error("error fetching alerts", error);
    })
}

function updateRead(alertNo) {
  const box = document.querySelector(`alert-${alertNo}`);
  fetch(`/alert/read?no=${alertNo}`)
    .then((result) => {
      if (result == "success") {
        location.href = box.firstChild.firstChild.href;
      }
    });
}